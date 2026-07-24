import supabase from "../_lib/supabase.js";
import { withAuth } from "../_lib/auth.js";
import { generateText } from "../_lib/gemini.js";

const SYSTEM_PROMPT = `You are a friendly personal finance assistant for an Indian user.
All amounts are in Indian Rupees (INR, ₹).
You have access to the user's transaction and budget data.

Guidelines:
- Answer questions about their spending, income, budgets, and financial habits
- Use Indian number formatting (₹1,25,000 format for lakhs)
- Be concise and helpful
- If asked about specific transactions, reference actual data
- Give practical advice relevant to Indian context (UPI, GST, rent, etc.)
- You can suggest budget adjustments, highlight unusual spending, or explain patterns
- Keep responses under 200 words unless more detail is needed`;

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

    // Fetch user's financial context
    const [txResult, budgetResult] = await Promise.all([
      supabase
        .from("transactions")
        .select("amount, type, category, name, date, method")
        .eq("user_id", userId)
        .order("date", { ascending: false })
        .limit(100),
      supabase
        .from("budgets")
        .select("category, amount, period")
        .eq("user_id", userId),
    ]);

    const transactions = txResult.data || [];
    const budgets = budgetResult.data || [];

    // Build financial context
    const totalIncome = transactions
      .filter((t) => t.type === "Income")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const totalExpense = transactions
      .filter((t) => t.type === "Expense")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const categoryTotals = {};
    transactions
      .filter((t) => t.type === "Expense")
      .forEach((t) => {
        const cat = t.category || "Other";
        categoryTotals[cat] = (categoryTotals[cat] || 0) + Number(t.amount);
      });

    const recentTx = transactions.slice(0, 10);

    const context = `User's Financial Summary:
- Total Income: ₹${totalIncome.toLocaleString("en-IN")}
- Total Expenses: ₹${totalExpense.toLocaleString("en-IN")}
- Balance: ₹${(totalIncome - totalExpense).toLocaleString("en-IN")}

Recent Transactions:
${recentTx.map((t) => `  ${t.date?.split("T")[0] || "N/A"} | ${t.type} | ₹${Number(t.amount).toLocaleString("en-IN")} | ${t.name || "N/A"} | ${t.category || "N/A"}`).join("\n")}

Spending by Category:
${Object.entries(categoryTotals)
  .sort((a, b) => b[1] - a[1])
  .map(([cat, amt]) => `  ${cat}: ₹${amt.toLocaleString("en-IN")}`)
  .join("\n")}

Budgets:
${budgets.map((b) => `  ${b.category}: ₹${Number(b.amount).toLocaleString("en-IN")}/month`).join("\n") || "  No budgets set"}`;

    // Build conversation history for context
    const conversationHistory = (history || [])
      .slice(-6) // Last 3 exchanges
      .map((msg) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`)
      .join("\n");

    const prompt = `${context}\n\n${conversationHistory ? conversationHistory + "\n" : ""}User: ${question}`;

    const answer = await generateText(prompt, SYSTEM_PROMPT);

    return res.status(200).json({ answer });
  } catch (error) {
    return res.status(500).json({ message: "Failed to generate response", error: error.message });
  }
});
