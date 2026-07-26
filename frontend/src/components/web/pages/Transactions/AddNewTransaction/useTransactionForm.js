import { useState } from "react";
import toast from "react-hot-toast";
import { createTransaction } from "../../../../../api/transactionApi";
import { useData } from "../../../../../context/DataContext";

export const useTransactionForm = () => {
  const { refetchAll } = useData();
  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    type: "Income",
    currency: "INR",
    amount: "",
    name: "",
    method: "UPI",
    category: "",
    date: today,
    status: "Successful",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatAmount = (amount) => {
    const cleanAmount = String(amount)
      .trim()
      .replace(/[₹$,]/g, "")
      .replace(/\s/g, "");

    if (!cleanAmount) return cleanAmount;

    const num = Number(cleanAmount);
    if (isNaN(num) || num < 0) return "";

    return cleanAmount.includes(".") ? cleanAmount : `${cleanAmount}.00`;
  };

  const saveTransaction = async () => {
    if (!form.amount || !form.name) {
      toast.error("Please fill amount and name before saving");
      return false;
    }

    const amount = formatAmount(form.amount);
    if (!amount) {
      toast.error("Please enter a valid amount");
      return false;
    }

    const payload = {
      type: form.type,
      currency: form.currency,
      amount,
      name: form.name,
      method: form.method || "Other",
      category: form.category || "Other",
      date: form.date,
      status: form.status || "Successful",
    };

    try {
      await createTransaction(payload);

      toast.success("Transaction saved successfully");

      await refetchAll();

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
