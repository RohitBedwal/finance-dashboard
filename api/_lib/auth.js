import supabase from "../_lib/supabase.js";

// Verify Bearer token and return user ID
export async function getUserFromRequest(req) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.split(" ")[1];

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    return null;
  }

  return data.user.id;
}

// Middleware-style helper for serverless functions
export function withAuth(handler) {
  return async (req, res) => {
    const userId = await getUserFromRequest(req);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.userId = userId;
    return handler(req, res);
  };
}
