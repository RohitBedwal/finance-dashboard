import supabase from "../_lib/supabase.js";
import { withAuth } from "../_lib/auth.js";

async function handler(req, res) {
  const userId = req.userId;

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { data: transactions, error } = await supabase
      .from("transactions")
      .select("amount, type")
      .eq("user_id", userId);

    if (error) throw error;

    let income = 0;
    let expense = 0;

    transactions.forEach((t) => {
      const amt = Number(t.amount) || 0;
      if (t.type === "Income") income += amt;
      else if (t.type === "Expense") expense += amt;
    });

    const balance = income - expense;

    return res.status(200).json({
      income,
      expense,
      balance,
      transactions: transactions.length,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export default withAuth(handler);
