import React, { useMemo, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TransactionsTable from "../../organisms/TransactionsTable/index";
import Main from "../../../templates/main";
import TransactionsToolbar from "../../molecules/TransactionsToolbar";
import { useTransactionFilters } from "../../../../context/TransactionFilterContext";
import { useData } from "../../../../context/DataContext";

const Transactions = () => {
  const { search } = useLocation();
  const { transactions } = useData();
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  const { filters } = useTransactionFilters();

  const searchQuery = useMemo(() => {
    const params = new URLSearchParams(search);
    return String(params.get("q") || "")
      .trim()
      .toLowerCase();
  }, [search]);

  const parseAmount = (value) => {
    const numeric = Number(String(value).replace(/[^\d.]/g, ""));
    return Number.isNaN(numeric) ? 0 : numeric;
  };

  const normalizeType = (type) => String(type || "").trim().toLowerCase();

  const bankOptions = useMemo(() => {
    const seen = new Set();
    const options = [];
    (transactions || []).forEach((tx) => {
      const bank = String(tx.bank || "").trim();
      if (bank && !seen.has(bank)) {
        seen.add(bank);
        options.push({ value: bank, label: bank });
      }
    });
    return options.sort((a, b) => a.label.localeCompare(b.label));
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const txType = normalizeType(tx.type);
      const txAmount = parseAmount(tx.amount);
      const txBank = normalizeType(tx.bank);
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
      if(filters?.bank?.value){
        const banks = normalizeType(filters.bank.value);
        const isMatch = txBank === banks;
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

      if (searchQuery) {
        const searchBase = [
          tx.id,
          tx.name,
          tx.bank,
          tx.category,
          tx.status,
          tx.type,
          tx.amount,
          tx.date,
        ]
          .map((value) => String(value || "").toLowerCase())
          .join(" ");

        if (!searchBase.includes(searchQuery)) return false;
      }

      return true;
    });
  }, [transactions, filters, dateRange, searchQuery]);

  const handleDateFilter = (startDate, endDate) => {
    setDateRange({ startDate, endDate });
  };

  return (
    <Main>
      <TransactionsToolbar
        transactions={transactions}
        onDateFilter={handleDateFilter}
        filterBarProps={{ bankOptions }}
      />

      <TransactionsTable transactions={filteredTransactions} />
    </Main>
  );
};

export default Transactions;