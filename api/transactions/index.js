import supabase from "../_lib/supabase.js";
import { withAuth } from "../_lib/auth.js";
import { generateJSON } from "../_lib/gemini.js";

const EXPENSE_CATEGORIES = [
  "Food", "Transport", "Shopping", "Bills", "Rent",
  "Entertainment", "Health", "Education", "Groceries",
  "Subscriptions", "Travel", "Other",
];

const INCOME_CATEGORIES = [
  "Salary", "Freelance", "Business", "Investment",
  "Gift", "Refund", "Other",
];

async function autoCategorize(name, type) {
  if (!name) return null;

  const categories = type === "Income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  try {
    const result = await generateJSON(
      `Transaction description: "${name}"\nType: ${type}\nPick the best category from this list: ${categories.join(", ")}`,
      `You are a transaction categorizer. Return JSON with a single "category" field matching one of the allowed categories.`
    );
    return result.category || null;
  } catch {
    return null;
  }
}

async function handler(req, res) {
  const userId = req.userId;

  if (req.method === "GET") {
    try {
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", userId)
        .order("date", { ascending: false });

      if (error) throw error;
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  if (req.method === "POST") {
    try {
      const { amount, type, category, name, method, status, date, currency } = req.body;

      if (!amount || !type) {
        return res.status(400).json({ message: "Amount and type are required" });
      }

      // Auto-categorize if no category provided
      let finalCategory = category;
      if (!finalCategory && name) {
        finalCategory = await autoCategorize(name, type);
      }

      const { data, error } = await supabase
        .from("transactions")
        .insert({
          user_id: userId,
          amount: Number(amount),
          currency: currency || "INR",
          type,
          category: finalCategory || "Other",
          name: name || null,
          method: method || null,
          status: status || "Successful",
          date: date || new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return res.status(201).json(data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}

export default withAuth(handler);
