import express from "express";
import {
  getBudgets,
  createBudget,
  deleteBudget,
  updateBudget,
} from "../controllers/budgetController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/",protect,  getBudgets);

router.post("/",protect,  createBudget);

router.delete("/:id",protect,  deleteBudget);
router.put("/:id",protect,  updateBudget);

export default router;