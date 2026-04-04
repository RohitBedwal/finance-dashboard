import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getItem, setItem } from "../../../../../utils/localStorage";
import { categoryOptionsByType } from "../../Transactions/AddNewTransaction/defaultCategories";

export const useBudgetForm = (initialBudget = null) => {
  const [form, setForm] = useState({
    id: initialBudget?.id || "",
    category: initialBudget?.category || "",
    amount: initialBudget?.amount ? String(initialBudget.amount) : "",
  });

  useEffect(() => {
    setForm({
      id: initialBudget?.id || "",
      category: initialBudget?.category || "",
      amount: initialBudget?.amount ? String(initialBudget.amount) : "",
    });
  }, [initialBudget]);

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveBudget = () => {
    const category = String(form.category || "").trim();
    const amount = Number(String(form.amount || "").replace(/[^\d.-]/g, ""));

    if (!category || Number.isNaN(amount) || amount <= 0) {
      toast.error("Please select a category and enter a valid budget amount");
      return false;
    }

    const allowedCategories = categoryOptionsByType.Expense || [];
    if (!allowedCategories.includes(category)) {
      toast.error("Please choose a valid expense category");
      return false;
    }

    const existingBudgets = getItem("budgets") || [];

    const payload = {
      id: form.id || crypto.randomUUID(),
      category,
      amount,
      type: "Expense",
      createdAt: new Date().toISOString(),
    };

    const existingIndexById = existingBudgets.findIndex((item) => item.id === form.id);
    const existingIndexByCategory = existingBudgets.findIndex(
      (item) => String(item.category || "").toLowerCase() === category.toLowerCase()
    );
    const existingIndex = existingIndexById >= 0 ? existingIndexById : existingIndexByCategory;

    let updatedBudgets = [...existingBudgets];

    if (existingIndex >= 0) {
      updatedBudgets[existingIndex] = {
        ...updatedBudgets[existingIndex],
        ...payload,
        id: updatedBudgets[existingIndex].id || payload.id,
      };
      toast.success("Budget updated successfully");
    } else {
      updatedBudgets = [...existingBudgets, payload];
      toast.success("Budget created successfully");
    }

    setItem("budgets", updatedBudgets);
    return true;
  };

  return {
    form,
    handleChange,
    saveBudget,
  };
};
