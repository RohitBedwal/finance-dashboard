import supabase from "../_lib/supabase.js";
import { withAuth } from "../_lib/auth.js";

async function handler(req, res) {
  const userId = req.userId;

  if (req.method === "GET") {
    try {
      const { data, error } = await supabase
        .from("budgets")
        .select("*")
        .eq("user_id", userId);

      if (error) throw error;
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  if (req.method === "POST") {
    try {
      const { category, amount, period } = req.body;

      if (!category || !amount) {
        return res.status(400).json({ message: "Category and amount are required" });
      }

      const { data, error } = await supabase
        .from("budgets")
        .insert({
          user_id: userId,
          category,
          amount: Number(amount),
          period: period || "Monthly",
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
