import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { categoryOptionsByType } from "../../Transactions/AddNewTransaction/defaultCategories";
import { createBudget, updateBudget } from "../../../../../api/budgetApi";
import { useData } from "../../../../../context/DataContext";

export const useBudgetForm = (initialBudget = null) => {
  const { refetchAll } = useData();
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

  const saveBudget = async () => {
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


   const payload = {
  category,
  amount,
  type: "Expense",
  createdAt: new Date().toISOString(),
};
try {
  if (form.id) {
  await updateBudget(form.id, payload);

  toast.success("Budget updated successfully");
} else {
  await createBudget(payload);

  toast.success("Budget created successfully");
}

  await refetchAll();

  return true;
} catch (error) {
  console.error(error);

  toast.error("Failed to save budget");

  return false;
}
  };

  return {
    form,
    handleChange,
    saveBudget,
  };
};
