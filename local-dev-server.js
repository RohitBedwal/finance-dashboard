import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { existsSync, readFileSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, ".env") });

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Dynamically import and route to serverless functions
async function handleRoute(req, res, modulePath) {
  try {
    const fullPath = join(__dirname, modulePath);
    const stat = await import("fs").then((fs) => fs.statSync(fullPath));
    const mod = await import(`${fullPath}?t=${stat.mtimeMs}`);
    const handler = mod.default;
    await handler(req, res);
  } catch (error) {
    console.error(`Error in ${modulePath}:`, error.message);
    res.status(500).json({ message: error.message });
  }
}

// Auth routes
app.all("/api/auth/register", (req, res) => handleRoute(req, res, "./api/auth/register.js"));
app.all("/api/auth/login", (req, res) => handleRoute(req, res, "./api/auth/login.js"));

// Transaction routes
app.all("/api/transactions", (req, res) => handleRoute(req, res, "./api/transactions/index.js"));
app.all("/api/transactions/:id", (req, res) => handleRoute(req, res, "./api/transactions/[id].js"));

// Budget routes
app.all("/api/budgets", (req, res) => handleRoute(req, res, "./api/budgets/index.js"));
app.all("/api/budgets/:id", (req, res) => handleRoute(req, res, "./api/budgets/[id].js"));

// Card routes
app.all("/api/cards", (req, res) => handleRoute(req, res, "./api/cards/index.js"));
app.all("/api/cards/:id", (req, res) => handleRoute(req, res, "./api/cards/[id].js"));

// Dashboard routes
app.all("/api/dashboard/stats", (req, res) => handleRoute(req, res, "./api/dashboard/stats.js"));

// Profile routes
app.get("/api/profile", (req, res) => handleRoute(req, res, "./api/profile/index.js"));
app.put("/api/profile", (req, res) => handleRoute(req, res, "./api/profile/index.js"));

// AI routes
app.all("/api/ai/parse-transaction", (req, res) => handleRoute(req, res, "./api/ai/parse-transaction.js"));
app.all("/api/ai/insights", (req, res) => handleRoute(req, res, "./api/ai/insights.js"));
app.all("/api/ai/predict", (req, res) => handleRoute(req, res, "./api/ai/predict.js"));
app.all("/api/ai/chat", (req, res) => handleRoute(req, res, "./api/ai/chat.js"));
app.all("/api/ai/transcribe", (req, res) => handleRoute(req, res, "./api/ai/transcribe.js"));

// Serve frontend build
const distPath = join(__dirname, "frontend", "dist");
if (existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get("/{*path}", (req, res) => {
    res.sendFile(join(distPath, "index.html"));
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
