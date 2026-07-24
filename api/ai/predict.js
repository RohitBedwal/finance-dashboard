import supabase from "../_lib/supabase.js";
import { withAuth } from "../_lib/auth.js";
import { generateJSON } from "../_lib/gemini.js";

const SYSTEM_PROMPT = `You are a financial predictor for an Indian user.
All amounts are in Indian Rupees (INR).
Analyze the user's past spending and predict next month's expenses.

Return a JSON object with:
{
  "predictions": [
    {
      "category": "Category name",
      "predicted_amount": number,
      "confidence": "high" | "medium" | "low",
      "trend": "increasing" | "decreasing" | "stable",
      "note": "Brief explanation of the prediction"
    }
  ],
  "total_predicted_expense": number,
  "compared_to_last_month": {
    "change_percent": number,
    "direction": "up" | "down" | "flat"
  },
  "savings_tip": "One actionable tip to save money next month"
}

Rules:
- Base predictions on actual spending patterns
- High confidence = consistent spending across months
- Medium confidence = some variation but clear pattern
- Low confidence = irregular spending or new category
- Compare month-over-month trends
- Consider Indian spending patterns (festivals, monthly salary cycles, etc.)`;

export default withAuth(async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const userId = req.userId;

    // Fetch last 6 months of transactions for better prediction
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const { data: transactions, error: txError } = await supabase
      .from("transactions")
      .select("amount, type, category, date")
      .eq("user_id", userId)
      .gte("date", sixMonthsAgo.toISOString())
      .order("date", { ascending: true });

    if (txError) throw txError;

    if (!transactions || transactions.length < 5) {
      return res.status(200).json({
        predictions: [],
        total_predicted_expense: 0,
        compared_to_last_month: { change_percent: 0, direction: "flat" },
        savings_tip: "Add more transactions for accurate predictions.",
      });
    }

    // Group by month and category
    const monthlyData = {};
    transactions.forEach((t) => {
      if (t.type !== "Expense") return;
      const date = new Date(t.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      const cat = t.category || "Other";

      if (!monthlyData[monthKey]) monthlyData[monthKey] = {};
      monthlyData[monthKey][cat] = (monthlyData[monthKey][cat] || 0) + Number(t.amount);
    });

    const months = Object.keys(monthlyData).sort();
    const categorySpending = {};

    months.forEach((month) => {
      Object.entries(monthlyData[month]).forEach(([cat, amt]) => {
        if (!categorySpending[cat]) categorySpending[cat] = [];
        categorySpending[cat].push({ month, amount: amt });
      });
    });

    const dataSummary = `Monthly expense data (last ${months.length} months):
${months.map((m) => {
  const cats = monthlyData[m];
  const total = Object.values(cats).reduce((s, v) => s + v, 0);
  return `${m}: Total ₹${Math.round(total).toLocaleString("en-IN")}\n${Object.entries(cats)
    .map(([c, a]) => `  ${c}: ₹${Math.round(a).toLocaleString("en-IN")}`)
    .join("\n")}`;
}).join("\n\n")}

Category-wise spending history:
${Object.entries(categorySpending)
  .map(([cat, entries]) => `${cat}: ${entries.map((e) => `₹${Math.round(e.amount)} (${e.month})`).join(", ")}`)
  .join("\n")}`;

    const result = await generateJSON(
      `Here is the user's spending history:\n\n${dataSummary}`,
      SYSTEM_PROMPT
    );

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Failed to generate predictions", error: error.message });
  }
});
