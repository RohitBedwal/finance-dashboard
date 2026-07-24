import { generateJSON } from "../_lib/gemini.js";
import { withAuth } from "../_lib/auth.js";

const EXPENSE_CATEGORIES = [
  "Food", "Transport", "Shopping", "Bills", "Rent",
  "Entertainment", "Health", "Education", "Groceries",
  "Subscriptions", "Travel", "Other",
];

const INCOME_CATEGORIES = [
  "Salary", "Freelance", "Business", "Investment",
  "Gift", "Refund", "Other",
];

const SYSTEM_PROMPT = `You are a financial transaction parser for an Indian user.
All amounts are in Indian Rupees (INR).
Parse the user's natural language into a JSON transaction object.

Rules:
- Today's date is provided for relative date parsing ("yesterday", "last monday", etc.)
- Default to "Expense" if not clearly income
- "got salary", "earned", "received", "freelance payment" → type: "Income"
- "spent", "bought", "paid", "ordered", "recharge" → type: "Expense"
- Use these expense categories: ${EXPENSE_CATEGORIES.join(", ")}
- Use these income categories: ${INCOME_CATEGORIES.join(", ")}
- Extract merchant/description as "name"
- Common Indian contexts: "chai", "auto", "rapido", "swiggy", "zomato", "irctc", "paytm", "phonepe", "gpay", "recharge", "electricity bill", "rent"
- Return valid JSON only.`;

export default withAuth(async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { text } = req.body;

    if (!text || typeof text !== "string") {
      return res.status(400).json({ message: "Text is required" });
    }

    const today = new Date().toISOString().split("T")[0];

    const result = await generateJSON(
      `Today's date: ${today}\n\nUser input: "${text.trim()}"`,
      SYSTEM_PROMPT
    );

    // Validate and sanitize the result
    const transaction = {
      amount: Math.abs(Number(result.amount) || 0),
      type: ["Income", "Expense"].includes(result.type) ? result.type : "Expense",
      category: result.category || "Other",
      name: result.name || text.trim(),
      method: result.method || null,
      date: result.date || today,
      currency: "INR",
    };

    return res.status(200).json(transaction);
  } catch (error) {
    return res.status(500).json({ message: "Failed to parse transaction", error: error.message });
  }
});
