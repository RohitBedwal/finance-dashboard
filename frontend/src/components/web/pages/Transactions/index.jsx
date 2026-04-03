import React, { useMemo, useState, useEffect } from "react";
import TransactionsTable from "../../organisms/TransactionsTable/index";
import Main from "../../../templates/main";
import TransactionsToolbar from "../../molecules/TransactionsToolbar";
import { useTransactionFilters } from "../../../../context/TransactionFilterContext";

import {
  getItem,
  subscribeStorage,
} from "../../../../utils/localStorage";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  const { filters } = useTransactionFilters();

  // Load transactions initially + sync with storage updates
  useEffect(() => {
    const storedTransactions = getItem("transactions") || [];

    setTransactions(storedTransactions);

    const unsubscribe = subscribeStorage(() => {
      const updatedTransactions = getItem("transactions") || [];

      setTransactions(updatedTransactions);
    });

    return unsubscribe;
  }, []);

  const parseAmount = (value) => {
    const numeric = Number(String(value).replace(/[^\d.]/g, ""));
    return Number.isNaN(numeric) ? 0 : numeric;
  };

  const normalizeType = (type) => String(type || "").trim().toLowerCase();

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const txType = normalizeType(tx.type);
      const txAmount = parseAmount(tx.amount);
      const txMethod = normalizeType(tx.method);
      const txCategory = normalizeType(tx.category);
      const txStatus = normalizeType(tx.status);

      const txDateValue = tx.date ? new Date(tx.date).getTime() : NaN;
      const hasValidDate = Number.isFinite(txDateValue);

      if (dateRange.startDate && dateRange.endDate) {
        if (!hasValidDate) return false;

        const start = new Date(dateRange.startDate).setHours(0, 0, 0, 0);
        const end = new Date(dateRange.endDate).setHours(23, 59, 59, 999);

        if (txDateValue < start || txDateValue > end) return false;
      }
      if (filters?.type?.value) {
        const selectedType = normalizeType(filters.type.value);
        const isMatch =
          txType === selectedType
        //   (selectedType === "income" && txType === "credit") ||
        //   (selectedType === "expense" && txType === "debit");

        if (!isMatch) return false;
      }

      if (filters?.amount?.value) {
        const amountRange = filters.amount.value;

        if (amountRange === "1-200" && !(txAmount >= 1 && txAmount <= 200))
          return false;
        if (
          amountRange === "200-500" &&
          !(txAmount > 200 && txAmount <= 500)
        )
          return false;
        if (
          amountRange === "500-1000" &&
          !(txAmount > 500 && txAmount <= 1000)
        )
          return false;
        if (amountRange === "1000+" && !(txAmount > 1000)) return false;
      }
      if(filters?.method?.value){
        const methods = normalizeType(filters.method.value);
        const isMatch = txMethod === methods;
        if (!isMatch) return false;
      }
      if(filters?.category?.value){
        const categories = normalizeType(filters.category.value);
        const isMatch = txCategory === categories;
        if (!isMatch) return false;
      }
      if(filters?.status?.value){
        const statuses = normalizeType(filters.status.value);
        const isMatch = txStatus === statuses;
        if (!isMatch) return false;
      }

      return true;
    });
  }, [transactions, filters, dateRange]);

  const handleDateFilter = (startDate, endDate) => {
    setDateRange({ startDate, endDate });
  };

  return (
    <Main>
      <TransactionsToolbar
        transactions={transactions}
        onDateFilter={handleDateFilter}
      />

      <TransactionsTable transactions={filteredTransactions} />
    </Main>
  );
};

export default Transactions;