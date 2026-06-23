
import Transaction from "../models/Transaction.js";

export const createTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.create({
      ...req.body,
      userId: req.user.id,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getTransactions = async (
  req,
  res
) => {
  try {
    const transactions =
      await Transaction.find({
        userId: req.user.id,
      }).sort({ date: -1 });
     

    res.json(transactions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteTransaction = async (
  req,
  res
) => {
  await Transaction.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.id,
  });

  res.json({
    message: "Deleted",
  });
};


export const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
      },
      req.body,
      {
        new: true,
      }
    );

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    res.json(transaction);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
