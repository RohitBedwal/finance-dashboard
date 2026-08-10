import supabase from "../_lib/supabase.js";
import { withAuth } from "../_lib/auth.js";

async function handler(req, res) {
  const userId = req.userId;
  const { id } = req.params;

  if (req.method === "PUT") {
    try {
      const { amount, type, category, name, bank, status, date } = req.body;

      const { data: existing, error: existingError } = await supabase
        .from("transactions")
        .select("amount, type, bank")
        .eq("id", id)
        .eq("user_id", userId)
        .single();

      if (existingError || !existing) {
        return res.status(404).json({ message: "Transaction not found" });
      }

      const updates = {};
      if (amount !== undefined) updates.amount = Number(amount);
      if (type !== undefined) updates.type = type;
      if (category !== undefined) updates.category = category;
      if (name !== undefined) updates.name = name;
      if (bank !== undefined) updates.bank = bank;
      if (status !== undefined) updates.status = status;
      if (date !== undefined) updates.date = date;

      const finalType = updates.type ?? existing.type;
      const finalAmount = Number(updates.amount ?? existing.amount);
      const finalBank = updates.bank !== undefined ? updates.bank : existing.bank;

      if (finalType === "Expense") {
        const { data: allTx } = await supabase
          .from("transactions")
          .select("id, amount, type, bank")
          .eq("user_id", userId);

        const scope = (allTx || []).filter(
          (t) => t.id !== id && (!finalBank || t.bank === finalBank)
        );
        const available = scope.reduce((sum, t) => {
          const amt = Number(t.amount) || 0;
          return String(t.type || "").toLowerCase() === "income" ? sum + amt : sum - amt;
        }, 0);

        if (finalAmount > available) {
          return res.status(400).json({
            message: `Insufficient balance${finalBank ? ` for ${finalBank}` : ""}. Available: ₹${available.toLocaleString("en-IN")}.`,
          });
        }
      }

      const { data, error } = await supabase
        .from("transactions")
        .update(updates)
        .eq("id", id)
        .eq("user_id", userId)
        .select()
        .single();

      if (error) throw error;
      if (!data) {
        return res.status(404).json({ message: "Transaction not found" });
      }

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  if (req.method === "DELETE") {
    try {
      const { error } = await supabase
        .from("transactions")
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
