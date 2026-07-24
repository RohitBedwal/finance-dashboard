import supabase from "../_lib/supabase.js";
import { withAuth } from "../_lib/auth.js";
import { generateJSON } from "../_lib/gemini.js";

const SYSTEM_PROMPT = `You are a personal finance advisor for an Indian user.
All amounts are in Indian Rupees (INR).
Analyze the user's transaction data and provide actionable financial insights.

Return a JSON object with:
{
  "summary": "1-2 sentence overall financial health summary",
  "insights": [
    {
      "type": "savings_opportunity" | "spending_pattern" | "budget_warning" | "positive_trend" | "balance_tip",
      "title": "Short title",
      "description": "Detailed actionable insight",
      "amount": "Estimated monthly impact in INR (number or null)",
      "priority": "high" | "medium" | "low"
    }
  ]
}

Rules:
- Provide 3-5 specific, actionable insights
- Always reference actual spending patterns from the data
- Suggest realistic savings amounts in INR
- Be encouraging but honest about overspending
- Consider Indian spending context (rent, groceries, transport, etc.)
- Focus on helping maximize their total balance`;

export default withAuth(async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const userId = req.userId;

    // Fetch last 3 months of transactions
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    const { data: transactions, error: txError } = await supabase
      .from("transactions")
      .select("amount, type, category, name, date")
      .eq("user_id", userId)
      .gte("date", threeMonthsAgo.toISOString())
      .order("date", { ascending: false });

    if (txError) throw txError;

    const { data: budgets, error: budgetError } = await supabase
      .from("budgets")
      .select("category, amount")
      .eq("user_id", userId);

    if (budgetError) throw budgetError;

    if (!transactions || transactions.length === 0) {
      return res.status(200).json({
        summary: "Not enough data yet. Add some transactions and I'll provide insights.",
        insights: [],
      });
    }

    // Summarize data for the AI
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

    const budgetMap = {};
    (budgets || []).forEach((b) => {
      budgetMap[b.category] = Number(b.amount);
    });

    const dataSummary = `
Total Income (last 3 months): ₹${totalIncome.toLocaleString("en-IN")}
Total Expense (last 3 months): ₹${totalExpense.toLocaleString("en-IN")}
Balance: ₹${(totalIncome - totalExpense).toLocaleString("en-IN")}

Monthly Average Income: ₹${Math.round(totalIncome / 3).toLocaleString("en-IN")}
Monthly Average Expense: ₹${Math.round(totalExpense / 3).toLocaleString("en-IN")}

Expense breakdown by category:
${Object.entries(categoryTotals)
  .sort((a, b) => b[1] - a[1])
  .map(([cat, amt]) => `  ${cat}: ₹${amt.toLocaleString("en-IN")}`)
  .join("\n")}

Budgets:
${Object.entries(budgetMap)
  .map(([cat, amt]) => `  ${cat}: ₹${amt.toLocaleString("en-IN")}/month`)
  .join("\n") || "  No budgets set"}
`;

    const result = await generateJSON(
      `Here is the user's financial data:\n\n${dataSummary}`,
      SYSTEM_PROMPT
    );

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Failed to generate insights", error: error.message });
  }
});
