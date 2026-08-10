import supabase from "../_lib/supabase.js";
import { withAuth } from "../_lib/auth.js";

const FIELDS = [
  "company_name",
  "account_holder_name",
  "account_number",
  "account_type",
  "bank_name",
  "ifsc_code",
  "branch_address",
];

async function handler(req, res) {
  const userId = req.userId;

  if (req.method === "GET") {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("name, email, company_name, account_holder_name, account_number, account_type, bank_name, ifsc_code, branch_address")
        .eq("id", userId)
        .single();

      if (error) throw error;

      return res.status(200).json(data || {});
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  if (req.method === "PUT") {
    try {
      const updates = {};
      for (const field of FIELDS) {
        if (req.body[field] !== undefined) {
          updates[field] = String(req.body[field] ?? "").trim();
        }
      }

      if (Object.keys(updates).length === 0) {
        return res.status(400).json({ message: "No fields to update" });
      }

      const { data, error } = await supabase
        .from("users")
        .update(updates)
        .eq("id", userId)
        .select("name, email, company_name, account_holder_name, account_number, account_type, bank_name, ifsc_code, branch_address")
        .single();

      if (error) throw error;
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}

export default withAuth(handler);
