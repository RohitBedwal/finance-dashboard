import Transaction from "../models/Transaction.js";

export const getDashboardStats = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      userId: req.user.id,
    });

    const income = transactions
      .filter((t) => t.type === "Income")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const expense = transactions
      .filter((t) => t.type === "Expense")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const balance = income - expense;

    res.json({
      income,
      expense,
      balance,
      transactions: transactions.length,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};