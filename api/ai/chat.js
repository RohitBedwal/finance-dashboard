import supabase from "../_lib/supabase.js";
import { withAuth } from "../_lib/auth.js";
import { generateJSON } from "../_lib/gemini.js";

const SYSTEM_PROMPT = `You are a friendly personal finance assistant for an Indian user.
All amounts are in Indian Rupees (INR, ₹).
You have FULL access to the user's complete financial dashboard data including transactions, budgets, monthly trends, category breakdowns, and budget comparisons.

Rules:
- Answer questions about their spending, income, budgets, and financial habits
- Use Indian number formatting (₹1,25,000 format for lakhs)
- Be concise and helpful
- If asked about specific transactions, reference actual data
- Give practical advice relevant to Indian context (UPI, GST, rent, etc.)
- You can suggest budget adjustments, highlight unusual spending, or explain patterns
- Compare current month vs previous month when relevant
- Reference budget limits when discussing spending
- Keep responses under 200 words unless more detail is needed

IMPORTANT: The user has ONE balance (Income minus Expenses). Savings is money they manually set aside — it is already included in the expenses. Never say "available balance" vs "total balance". There is only ONE balance.`;

const INTENT_PROMPT = `You are an intent classifier for a finance assistant. Analyze the user's message and determine their intent.

Return JSON with this exact structure:
{
  "intent": "chat" | "add_income" | "add_expense" | "create_budget" | "update_budget" | "remove_budget" | "add_savings" | "remove_savings",
  "params": {},
  "message": "A friendly conversational response to the user"
}

IMPORTANT: "Savings" in this app means money the user sets aside from their balance. It is NOT a bank account.

Intent rules:

1. "chat" - Default for questions, advice, analysis, or any non-action request.
   params: {}

2. "add_income" - User wants to record money they received/earned.
   params: { "amount": number, "name": string, "category": string, "date"?: string }
   - Categories: Salary, Freelance, Business, Investment, Gift, Refund, Other
   - If no name given, use category as name
   - If no date given, use today
   - Example: "I got paid 50000 salary" -> { "amount": 50000, "name": "Salary", "category": "Salary" }

3. "add_expense" - User wants to record money they spent.
   params: { "amount": number, "name": string, "category": string, "date"?: string }
   - Categories: Food, Transport, Shopping, Bills, Rent, Entertainment, Health, Education, Groceries, Subscriptions, Travel, Other
   - If no name given, use category as name
   - If no date given, use today
   - Example: "spent 500 on dinner" -> { "amount": 500, "name": "Dinner", "category": "Food" }

4. "create_budget" - User wants to SET or CHANGE monthly spending limits for one or more categories.
   params: { "budgets": [{ "category": string, "amount": number }] }
   - If a budget already exists for a category, it will be UPDATED (not duplicated)
   - If no budget exists, a new one is CREATED
   - Supports multiple budgets in one command
   - Categories: Food, Transport, Shopping, Bills, Rent, Entertainment, Health, Education, Groceries, Subscriptions, Travel, Other
   - Example: "set a budget of 5000 for food" -> { "budgets": [{ "category": "Food", "amount": 5000 }] }
   - Example: "set food budget to 5000 and transport to 3000" -> { "budgets": [{ "category": "Food", "amount": 5000 }, { "category": "Transport", "amount": 3000 }] }
   - Example: "change food budget to 8000" -> { "budgets": [{ "category": "Food", "amount": 8000 }] }

5. "update_budget" - User wants to INCREASE, DECREASE, or SET one or more budgets by a specific amount.
   params: { "budgets": [{ "category": string, "amount": number, "operation": "increase" | "decrease" | "set" }] }
   - All budgets in the command share the same operation
   - "increase" means add amount to existing budget
   - "decrease" means subtract amount from existing budget
   - "set" means set the budget to this exact amount
   - Example: "increase food and shopping budgets by 2000" -> { "budgets": [{ "category": "Food", "amount": 2000, "operation": "increase" }, { "category": "Shopping", "amount": 2000, "operation": "increase" }] }
   - Example: "reduce food and transport budgets by 1000" -> { "budgets": [{ "category": "Food", "amount": 1000, "operation": "decrease" }, { "category": "Transport", "amount": 1000, "operation": "decrease" }] }
   - Example: "set food and shopping budgets to 5000" -> { "budgets": [{ "category": "Food", "amount": 5000, "operation": "set" }, { "category": "Shopping", "amount": 5000, "operation": "set" }] }

6. "remove_budget" - User wants to DELETE one or more budgets entirely.
   params: { "categories": string[] }
   - Can remove a single or multiple budgets at once
   - If user says "remove all budgets", set categories to ["all"]
   - Example: "remove my entertainment budget" -> { "categories": ["Entertainment"] }
   - Example: "delete the food and shopping budgets" -> { "categories": ["Food", "Shopping"] }
   - Example: "remove all my budgets" -> { "categories": ["all"] }

7. "add_savings" - User wants to MOVE MONEY FROM their balance INTO savings (set it aside).
   params: { "amount": number }
   - This REDUCES their balance
   - Example: "add 10000 to savings" -> { "amount": 10000 }

8. "remove_savings" - User wants to TAKE MONEY OUT OF savings back into their balance.
   params: { "amount": number }
   - This INCREASES their balance
   - Example: "withdraw 2000 from savings" -> { "amount": 2000 }

The "message" field should be a friendly confirmation acknowledging what the user wants to do.
Always return valid JSON only.`;

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function parseDate(value) {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

export default withAuth(async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const userId = req.userId;
    const { question, history } = req.body;

    if (!question || typeof question !== "string") {
      return res.status(400).json({ message: "Question is required" });
    }

    // Fetch ALL transactions and budgets
    const [txResult, budgetResult] = await Promise.all([
      supabase
        .from("transactions")
        .select("amount, type, category, name, date, method")
        .eq("user_id", userId)
        .order("date", { ascending: false }),
      supabase
        .from("budgets")
        .select("id, category, amount, period")
        .eq("user_id", userId),
    ]);

    const transactions = txResult.data || [];
    const budgets = budgetResult.data || [];
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const previousMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    // Helper: filter transactions by year/month
    const txInMonth = (year, month) =>
      transactions.filter((t) => {
        const d = parseDate(t.date);
        return d && d.getFullYear() === year && d.getMonth() === month;
      });

    // All-time totals
    const totalIncome = transactions
      .filter((t) => t.type === "Income")
      .reduce((sum, t) => sum + Number(t.amount), 0);
    const totalExpense = transactions
      .filter((t) => t.type === "Expense")
      .reduce((sum, t) => sum + Number(t.amount), 0);
    const balance = totalIncome - totalExpense;

    // Current month totals
    const currentMonthTx = txInMonth(currentYear, currentMonth);
    const currentMonthIncome = currentMonthTx
      .filter((t) => t.type === "Income")
      .reduce((sum, t) => sum + Number(t.amount), 0);
    const currentMonthExpense = currentMonthTx
      .filter((t) => t.type === "Expense")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    // Previous month totals
    const previousMonthTx = txInMonth(previousMonthYear, previousMonth);
    const previousMonthIncome = previousMonthTx
      .filter((t) => t.type === "Income")
      .reduce((sum, t) => sum + Number(t.amount), 0);
    const previousMonthExpense = previousMonthTx
      .filter((t) => t.type === "Expense")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    // Current month category breakdown (expenses)
    const currentMonthCategories = {};
    currentMonthTx
      .filter((t) => t.type === "Expense" && t.category !== "Savings")
      .forEach((t) => {
        const cat = t.category || "Other";
        currentMonthCategories[cat] = (currentMonthCategories[cat] || 0) + Number(t.amount);
      });

    // All-time category breakdown (expenses)
    const allTimeCategories = {};
    transactions
      .filter((t) => t.type === "Expense" && t.category !== "Savings")
      .forEach((t) => {
        const cat = t.category || "Other";
        allTimeCategories[cat] = (allTimeCategories[cat] || 0) + Number(t.amount);
      });

    // Monthly trend (last 6 months)
    const monthlyTrend = [];
    for (let i = 5; i >= 0; i--) {
      const targetDate = new Date(currentYear, currentMonth - i, 1);
      const year = targetDate.getFullYear();
      const month = targetDate.getMonth();
      const monthTx = txInMonth(year, month);
      const income = monthTx
        .filter((t) => t.type === "Income")
        .reduce((sum, t) => sum + Number(t.amount), 0);
      const expense = monthTx
        .filter((t) => t.type === "Expense")
        .reduce((sum, t) => sum + Number(t.amount), 0);
      monthlyTrend.push({ month: MONTHS[month], income, expense, savings: income - expense });
    }

    // Savings (manual add/remove via Savings category)
    const savingsTx = transactions.filter((t) => t.category === "Savings");
    const savingsAdded = savingsTx
      .filter((t) => t.type === "Expense")
      .reduce((sum, t) => sum + Number(t.amount), 0);
    const savingsWithdrawn = savingsTx
      .filter((t) => t.type === "Income")
      .reduce((sum, t) => sum + Number(t.amount), 0);
    const totalSavings = savingsAdded - savingsWithdrawn;

    // Budget vs Actual
    const budgetComparison = budgets.map((b) => {
      const spent = transactions
        .filter(
          (t) =>
            t.type === "Expense" &&
            t.category?.toLowerCase() === b.category?.toLowerCase() &&
            t.category !== "Savings"
        )
        .reduce((sum, t) => sum + Number(t.amount), 0);
      return {
        category: b.category,
        budget: Number(b.amount),
        spent,
        remaining: Number(b.amount) - spent,
        percentUsed: Math.round((spent / Number(b.amount)) * 100),
      };
    });

    // Recent transactions (last 10)
    const recentTx = transactions.slice(0, 10);

    // Top spending categories this month
    const topCategories = Object.entries(currentMonthCategories)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const formatINR = (n) => `₹${Number(n).toLocaleString("en-IN")}`;

    const context = `=== FULL DASHBOARD DATA ===

OVERVIEW (All Time):
- Total Income: ${formatINR(totalIncome)}
- Total Expenses: ${formatINR(totalExpense)}
- Balance: ${formatINR(balance)} (Income minus Expenses — this is the ONLY balance)
- Total Transactions: ${transactions.length}

CURRENT MONTH (${MONTHS[currentMonth]} ${currentYear}):
- Income: ${formatINR(currentMonthIncome)}
- Expenses: ${formatINR(currentMonthExpense)}
- Net: ${formatINR(currentMonthIncome - currentMonthExpense)}

PREVIOUS MONTH (${MONTHS[previousMonth]} ${previousMonthYear}):
- Income: ${formatINR(previousMonthIncome)}
- Expenses: ${formatINR(previousMonthExpense)}
- Net: ${formatINR(previousMonthIncome - previousMonthExpense)}

MONTH-ON-MONTH CHANGE:
- Income: ${previousMonthIncome ? (((currentMonthIncome - previousMonthIncome) / previousMonthIncome) * 100).toFixed(1) : "N/A"}%
- Expenses: ${previousMonthExpense ? (((currentMonthExpense - previousMonthExpense) / previousMonthExpense) * 100).toFixed(1) : "N/A"}%

LAST 6 MONTHS TREND:
${monthlyTrend.map((m) => `  ${m.month}: Income ${formatINR(m.income)} | Expense ${formatINR(m.expense)} | Savings ${formatINR(m.savings)}`).join("\n")}

CURRENT MONTH SPENDING BY CATEGORY:
${topCategories.length ? topCategories.map(([cat, amt]) => `  ${cat}: ${formatINR(amt)}`).join("\n") : "  No expenses this month"}

SAVINGS (manually set aside):
- Total Saved: ${formatINR(totalSavings)} (Added: ${formatINR(savingsAdded)}, Withdrawn: ${formatINR(savingsWithdrawn)})

BUDGETS:
${budgetComparison.length ? budgetComparison.map((b) => `  ${b.category}: ${formatINR(b.spent)} / ${formatINR(b.budget)} (${b.percentUsed}% used, ${formatINR(b.remaining)} remaining)`).join("\n") : "  No budgets set"}

RECENT TRANSACTIONS:
${recentTx.map((t) => `  ${t.date?.split("T")[0] || "N/A"} | ${t.type} | ${formatINR(t.amount)} | ${t.name || "N/A"} | ${t.category || "N/A"}`).join("\n")}

CRITICAL RULE: There is only ONE balance. Savings are ALREADY deducted from it. Never say "available balance" or "total balance" as separate things.`;

    // Build conversation history
    const conversationHistory = (history || [])
      .slice(-6)
      .map((msg) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`)
      .join("\n");

    const prompt = `${context}\n\n${conversationHistory ? conversationHistory + "\n" : ""}User: ${question}`;

    // Classify intent
    const intentResult = await generateJSON(prompt, INTENT_PROMPT);
    const { intent, params, message } = intentResult;

    // Check if this is a confirmation of a pending action
    if (question.startsWith("__confirm__:")) {
      let confirmed;
      try {
        confirmed = JSON.parse(question.replace("__confirm__:", ""));
      } catch {
        return res.status(200).json({ answer: "Sorry, I couldn't understand that confirmation.", action: null });
      }

      const { intent: confirmedIntent, params: confirmedParams } = confirmed;
      const actionResult = await executeAction(confirmedIntent, confirmedParams, userId, balance, totalSavings, budgets, formatINR);
      return res.status(200).json({
        answer: actionResult.summary || "Done!",
        action: actionResult,
      });
    }

    // For action intents, return pending action instead of executing
    const ACTION_INTENTS = ["add_income", "add_expense", "create_budget", "update_budget", "remove_budget", "add_savings", "remove_savings"];
    if (ACTION_INTENTS.includes(intent)) {
      return res.status(200).json({
        answer: message || "Here's what I'll do:",
        action: null,
        pendingAction: { intent, params },
      });
    }

    return res.status(200).json({
      answer: message || "How can I help you with your finances?",
      action: null,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to generate response", error: error.message });
  }
});

async function executeAction(intent, params, userId, balance, totalSavings, budgets, formatINR) {
  if (intent === "add_income" && params?.amount) {
    const { data, error } = await supabase
      .from("transactions")
      .insert({
        user_id: userId,
        amount: Number(params.amount),
        currency: "INR",
        type: "Income",
        category: params.category || "Other",
        name: params.name || params.category || "Income",
        method: null,
        status: "Successful",
        date: params.date ? new Date(params.date).toISOString() : new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    const newBalance = balance + Number(params.amount);
    return {
      type: "income_added",
      data,
      summary: `${formatINR(params.amount)} income recorded (${params.category || "Other"}). New balance: ${formatINR(newBalance)}`,
    };
  }

  if (intent === "add_expense" && params?.amount) {
    const { data, error } = await supabase
      .from("transactions")
      .insert({
        user_id: userId,
        amount: Number(params.amount),
        currency: "INR",
        type: "Expense",
        category: params.category || "Other",
        name: params.name || params.category || "Expense",
        method: null,
        status: "Successful",
        date: params.date ? new Date(params.date).toISOString() : new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    const newBalance = balance - Number(params.amount);
    return {
      type: "expense_added",
      data,
      summary: `${formatINR(params.amount)} expense recorded (${params.category || "Other"}). New balance: ${formatINR(newBalance)}`,
    };
  }

  if (intent === "create_budget" && params?.budgets) {
    const results = [];
    for (const b of params.budgets) {
      if (!b.category || !b.amount) continue;
      const existingBudget = budgets.find(
        (eb) => eb.category?.toLowerCase() === b.category.toLowerCase()
      );

      let data, error;
      if (existingBudget) {
        ({ data, error } = await supabase
          .from("budgets")
          .update({ amount: Number(b.amount) })
          .eq("id", existingBudget.id)
          .select()
          .single());
      } else {
        ({ data, error } = await supabase
          .from("budgets")
          .insert({
            user_id: userId,
            category: b.category,
            amount: Number(b.amount),
            period: "Monthly",
          })
          .select()
          .single());
      }

      if (error) throw error;
      results.push({ category: b.category, amount: Number(b.amount), isUpdate: !!existingBudget });
    }

    const updated = results.filter((r) => r.isUpdate);
    const created = results.filter((r) => !r.isUpdate);
    const parts = [];
    if (created.length) parts.push(`Created: ${created.map((r) => `${r.category} ${formatINR(r.amount)}`).join(", ")}`);
    if (updated.length) parts.push(`Updated: ${updated.map((r) => `${r.category} ${formatINR(r.amount)}`).join(", ")}`);

    return {
      type: "budget_created",
      data: results,
      summary: parts.join(". ") + ".",
    };
  }

  if (intent === "update_budget" && params?.budgets) {
    const results = [];
    const notFound = [];

    for (const b of params.budgets) {
      if (!b.category || !b.amount) continue;
      const existingBudget = budgets.find(
        (eb) => eb.category?.toLowerCase() === b.category.toLowerCase()
      );

      if (!existingBudget) {
        notFound.push(b.category);
        continue;
      }

      const oldAmount = Number(existingBudget.amount);
      let newAmount;
      if (b.operation === "increase") {
        newAmount = oldAmount + Number(b.amount);
      } else if (b.operation === "decrease") {
        newAmount = Math.max(0, oldAmount - Number(b.amount));
      } else {
        newAmount = Number(b.amount);
      }

      const { data, error } = await supabase
        .from("budgets")
        .update({ amount: newAmount })
        .eq("id", existingBudget.id)
        .select()
        .single();

      if (error) throw error;
      results.push({ category: b.category, newAmount, operation: b.operation });
    }

    if (results.length === 0) {
      return { type: null, summary: `No budgets found for: ${notFound.join(", ")}. Would you like to create them instead?` };
    }

    const summary = results.map((r) => {
      const op = r.operation === "increase" ? "increased to" : r.operation === "decrease" ? "decreased to" : "set to";
      return `${r.category} ${op} ${formatINR(r.newAmount)}`;
    }).join(", ");

    return {
      type: "budget_updated",
      data: results,
      summary: `${summary}.${notFound.length ? ` Not found: ${notFound.join(", ")}.` : ""}`,
    };
  }

  if (intent === "remove_budget" && params?.categories) {
    const categoriesToRemove = params.categories.includes("all")
      ? budgets.map((b) => b.category)
      : params.categories;

    const removed = [];
    const notFound = [];

    for (const cat of categoriesToRemove) {
      const existingBudget = budgets.find(
        (b) => b.category?.toLowerCase() === cat.toLowerCase()
      );
      if (!existingBudget) {
        notFound.push(cat);
        continue;
      }
      const { error } = await supabase
        .from("budgets")
        .delete()
        .eq("id", existingBudget.id);
      if (error) throw error;
      removed.push({ category: existingBudget.category, amount: Number(existingBudget.amount) });
    }

    if (removed.length === 0) {
      return { type: null, summary: `No budgets found for: ${notFound.join(", ")}.` };
    }

    const removedList = removed.map((r) => `${r.category} (${formatINR(r.amount)})`).join(", ");
    return {
      type: "budget_removed",
      data: removed,
      summary: `Removed ${removed.length} budget(s): ${removedList}.${notFound.length ? ` Not found: ${notFound.join(", ")}.` : ""}`,
    };
  }

  if (intent === "add_savings" && params?.amount) {
    const amount = Number(params.amount);
    if (amount > balance) {
      return { type: null, summary: `You don't have enough balance to add ${formatINR(amount)} to savings. Your balance is ${formatINR(balance)}.` };
    }

    const { data, error } = await supabase
      .from("transactions")
      .insert({
        user_id: userId,
        amount,
        currency: "INR",
        type: "Expense",
        category: "Savings",
        name: "Savings",
        method: "Transfer",
        status: "Successful",
        date: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    const newBalance = balance - amount;
    const newSavings = totalSavings + amount;
    return {
      type: "savings_added",
      data,
      summary: `${formatINR(amount)} moved to savings. Balance: ${formatINR(newBalance)} | Savings: ${formatINR(newSavings)}`,
    };
  }

  if (intent === "remove_savings" && params?.amount) {
    const amount = Number(params.amount);
    if (amount > totalSavings) {
      return { type: null, summary: `You don't have enough savings to withdraw ${formatINR(amount)}. Your savings is ${formatINR(totalSavings)}.` };
    }

    const { data, error } = await supabase
      .from("transactions")
      .insert({
        user_id: userId,
        amount,
        currency: "INR",
        type: "Income",
        category: "Savings",
        name: "Savings Withdrawal",
        method: "Transfer",
        status: "Successful",
        date: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    const newBalance = balance + amount;
    const newSavings = totalSavings - amount;
    return {
      type: "savings_removed",
      data,
      summary: `${formatINR(amount)} moved from savings to balance. Balance: ${formatINR(newBalance)} | Savings: ${formatINR(newSavings)}`,
    };
  }

  return { type: null, summary: "I couldn't understand that action." };
}
