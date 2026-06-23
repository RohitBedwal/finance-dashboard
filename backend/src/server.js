import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import budgetRoutes from "./routes/budgetRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";

import dashboardRoutes from "./routes/dashboardRoutes.js";

dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.json({
        message: "Finance Dashboard API Running",
    });
});
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/auth", authRoutes);
app.use(
  "/api/transactions",
  transactionRoutes
);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});