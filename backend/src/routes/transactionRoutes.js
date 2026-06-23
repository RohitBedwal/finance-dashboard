import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  createTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
} from "../controllers/transactionController.js";

const router = express.Router();

router.get("/", protect, getTransactions);
router.post("/", protect, createTransaction);
router.delete("/:id", protect, deleteTransaction);
router.put("/:id", protect, updateTransaction);

export default router;