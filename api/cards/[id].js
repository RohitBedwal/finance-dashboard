import supabase from "../_lib/supabase.js";
import { withAuth } from "../_lib/auth.js";

async function handler(req, res) {
  const userId = req.userId;
  const cardId = req.params.id;

  if (req.method === "DELETE") {
    try {
      const { data, error } = await supabase
        .from("cards")
        .delete()
        .eq("id", cardId)
        .eq("user_id", userId)
        .select()
        .single();

      if (error) throw error;

      if (!data) {
        return res.status(404).json({ message: "Card not found" });
      }

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}

export default withAuth(handler);
