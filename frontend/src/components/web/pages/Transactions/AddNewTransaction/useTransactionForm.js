import { useState } from "react";
import toast from "react-hot-toast";
import { createTransaction } from "../../../../../api/transactionApi";

export const useTransactionForm = () => {
  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    id: crypto.randomUUID(),
    type: "Income",
    currency: "INR",
    amount: "",
    name: "",
    method: "",
    category: "",
    date: today,
    status: "",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatAmount = (amount) => {
    const cleanAmount = String(amount).trim();

    if (!cleanAmount) return cleanAmount;

    return cleanAmount.includes(".") ? cleanAmount : `${cleanAmount}.00`;
  };

  const saveTransaction = async () => {
    const payload = {
      ...form,
      amount: formatAmount(form.amount),
    };

    const emptyField = Object.entries(form).find(
      ([_, value]) => value === ""
    );

    if (emptyField) {
      toast.error("Please fill all fields before saving");
      return false;
    }

    try {
      await createTransaction(payload);

      toast.success("Transaction saved successfully");

      window.location.reload();

      return true;
    } catch (error) {
      console.error(error);

      toast.error("Failed to save transaction");

      return false;
    }
  };

  return {
    form,
    handleChange,
    saveTransaction,
  };
};