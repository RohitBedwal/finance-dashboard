import supabase from "../_lib/supabase.js";
import { withAuth } from "../_lib/auth.js";

async function handler(req, res) {
  const userId = req.userId;
  const { id } = req.query;

  if (req.method === "PUT") {
    try {
      const { category, amount, period } = req.body;

      const updates = {};
      if (category !== undefined) updates.category = category;
      if (amount !== undefined) updates.amount = Number(amount);
      if (period !== undefined) updates.period = period;

      const { data, error } = await supabase
        .from("budgets")
        .update(updates)
        .eq("id", id)
        .eq("user_id", userId)
        .select()
        .single();

      if (error) throw error;
      if (!data) {
        return res.status(404).json({ message: "Budget not found" });
      }

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  if (req.method === "DELETE") {
    try {
      const { error } = await supabase
        .from("budgets")
        .delete()
        .eq("id", id)
        .eq("user_id", userId);

      if (error) throw error;
      return res.status(200).json({ message: "Deleted" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}

export default withAuth(handler);
