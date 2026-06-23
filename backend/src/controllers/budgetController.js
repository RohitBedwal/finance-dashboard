import Budget from "../models/Budget.js";

export const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({
      userId: req.user.id,
    });

    res.json(budgets);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createBudget = async (req, res) => {
  try {
    const budget = await Budget.create({
      ...req.body,
      userId: req.user.id,
    });

    res.status(201).json(budget);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteBudget = async (req, res) => {
  try {
    const budget = await Budget.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!budget) {
      return res.status(404).json({
        message: "Budget not found",
      });
    }

    res.json({
      message: "Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateBudget = async (req, res) => {
  try {
    const budget = await Budget.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
      },
      req.body,
      {
        new: true,
      }
    );

    if (!budget) {
      return res.status(404).json({
        message: "Budget not found",
      });
    }

    res.json(budget);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};