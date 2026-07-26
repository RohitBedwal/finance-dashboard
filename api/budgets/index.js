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
      const { category, amount, period, type } = req.body;

      if (!category || !amount) {
        return res.status(400).json({ message: "Category and amount are required" });
      }

      const { data: existingRows, error: findError } = await supabase
        .from("budgets")
        .select("id")
        .eq("user_id", userId)
        .eq("category", category)
        .limit(1);

      if (findError) {
        console.error("Budget find error:", findError);
        throw findError;
      }

      const existing = existingRows?.[0];
      let result;

      if (existing) {
        const { data, error } = await supabase
          .from("budgets")
          .update({ amount: Number(amount), period: period || "Monthly", type: type || "Expense" })
          .eq("id", existing.id)
          .select()
          .single();
        if (error) {
          console.error("Budget update error:", error);
          throw error;
        }
        result = data;
      } else {
        const { data, error } = await supabase
          .from("budgets")
          .insert({
            user_id: userId,
            category,
            amount: Number(amount),
            period: period || "Monthly",
            type: type || "Expense",
          })
          .select()
          .single();
        if (error) {
          console.error("Budget insert error:", error);
          throw error;
        }
        result = data;
      }

      return res.status(201).json(result);
    } catch (error) {
      console.error("Budget POST error:", error);
      return res.status(500).json({ message: error.message });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}

export default withAuth(handler);
