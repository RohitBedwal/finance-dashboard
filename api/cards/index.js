import supabase from "../_lib/supabase.js";
import { withAuth } from "../_lib/auth.js";

async function handler(req, res) {
  const userId = req.userId;

  if (req.method === "GET") {
    try {
      const { data, error } = await supabase
        .from("cards")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  if (req.method === "POST") {
    try {
      const { name, last4, bank_name } = req.body;

      const cleanName = String(name || "").trim();
      const cleanLast4 = String(last4 || "").trim();
      const cleanBank = String(bank_name || "").trim();

      if (!cleanName) {
        return res.status(400).json({ message: "Card name is required" });
      }
      if (!/^[0-9]{4}$/.test(cleanLast4)) {
        return res.status(400).json({ message: "Last 4 digits must be exactly 4 digits" });
      }
      if (!cleanBank) {
        return res.status(400).json({ message: "Bank name is required" });
      }

      const { data, error } = await supabase
        .from("cards")
        .insert({
          user_id: userId,
          name: cleanName,
          last4: cleanLast4,
          bank_name: cleanBank,
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
