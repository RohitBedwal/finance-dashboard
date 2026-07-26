import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { getTransactions } from "../api/transactionApi";
import { getBudgets } from "../api/budgetApi";
import { getDashboardStats } from "../api/dashboardApi";

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [stats, setStats] = useState({ income: 0, expense: 0, balance: 0, transactions: 0 });
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);
  const location = useLocation();

  const fetchTransactions = useCallback(async () => {
    try {
      const res = await getTransactions();
      const data = Array.isArray(res.data) ? res.data : [];
      setTransactions(data);
      return data;
    } catch (error) {
      console.error("Error fetching transactions:", error);
      return [];
    }
  }, []);

  const fetchBudgets = useCallback(async () => {
    try {
      const res = await getBudgets();
      const data = Array.isArray(res.data) ? res.data : [];
      setBudgets(data);
      return data;
    } catch (error) {
      console.error("Error fetching budgets:", error);
      return [];
    }
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      const res = await getDashboardStats();
      setStats(res.data);
      return res.data;
    } catch (error) {
      console.error("Error fetching stats:", error);
      return null;
    }
  }, []);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    await Promise.all([fetchTransactions(), fetchBudgets(), fetchStats()]);
    setLoading(false);
  }, [fetchTransactions, fetchBudgets, fetchStats]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      hasFetched.current = false;
      return;
    }

    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchAll();
    }

    const onFocus = () => fetchAll();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [fetchAll, location.pathname]);

  return (
    <DataContext.Provider
      value={{
        transactions,
        budgets,
        stats,
        loading,
        refetchTransactions: fetchTransactions,
        refetchBudgets: fetchBudgets,
        refetchStats: fetchStats,
        refetchAll: fetchAll,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
};
