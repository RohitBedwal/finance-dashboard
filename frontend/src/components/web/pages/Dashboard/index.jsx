import React, { useEffect, useState } from "react";
import Main from "../../../templates/main";
import SummaryCardsGrid from "../../organisms/SummaryCardsGrid";
import InsightsPanel from "../../organisms/InsightsPanel";
import Card from "../../atoms/card";
import * as S from "./styles";
import { getItem } from "../../../../utils/localStorage";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);

  /**
   * Load transactions from localStorage
   */
  useEffect(() => {
    const loadTransactions = () => {
      const storedTransactions =
        getItem("transactions") || [];

      setTransactions(storedTransactions);
    };

    loadTransactions();

    /**
     * Listen when new transaction added
     */
    window.addEventListener(
      "transactionsUpdated",
      loadTransactions
    );

    return () =>
      window.removeEventListener(
        "transactionsUpdated",
        loadTransactions
      );
  }, []);

  /**
   * Filter current month transactions
   */
  const currentMonthTransactions =
    transactions.filter((t) => {
      if (!t.date) return false;

      const txnDate = new Date(t.date);
      const now = new Date();

      return (
        txnDate.getMonth() === now.getMonth() &&
        txnDate.getFullYear() === now.getFullYear()
      );
    });

  /**
   * Filter previous month transactions
   */
  const previousMonthTransactions =
    transactions.filter((t) => {
      if (!t.date) return false;

      const txnDate = new Date(t.date);
      const now = new Date();

      const prevMonth =
        now.getMonth() === 0
          ? 11
          : now.getMonth() - 1;

      const prevYear =
        now.getMonth() === 0
          ? now.getFullYear() - 1
          : now.getFullYear();

      return (
        txnDate.getMonth() === prevMonth &&
        txnDate.getFullYear() === prevYear
      );
    });

  /**
   * Helper function
   */
  
  const calculateTotals = (list) => {
    let income = 0;
    let expenses = 0;

    list.forEach((t) => {
      if (t.type === "Income")
        income += Number(t.amount);

      if (t.type === "Expense")
        expenses += Number(t.amount);
    });

    return {
      income,
      expenses,
      balance: income - expenses,
    };
  };

  const currentTotals =
    calculateTotals(currentMonthTransactions);

  const previousTotals =
    calculateTotals(previousMonthTransactions);
  // Add this below previousTotals
    const allTimeTotals = calculateTotals(transactions);
  /**
   * Change percentage calculator
   */
  const calculateChange = (current, previous) => {
  if (previous === 0) {
    if (current === 0) return 0;
    return 100;
  }

  return Number(
    (((current - previous) / Math.abs(previous)) * 100).toFixed(1)
  );
};

  const incomeChange = calculateChange(
    currentTotals.income,
    previousTotals.income
  );

  const expenseChange = calculateChange(
    currentTotals.expenses,
    previousTotals.expenses
  );

  const balanceChange = calculateChange(
    currentTotals.balance,
    previousTotals.balance
  );

  /**
   * Summary cards data
   */
  const summaryData = [
    {
      title: "Total Balance",
      amount: `₹${allTimeTotals.balance}`,
      change: balanceChange,
      icon: "wallet",
    },
    {
      title: "Income",
      amount: `₹${allTimeTotals.income}`,
      change: incomeChange,
      icon: "income",
    },
    {
      title: "Expenses",
      amount: `₹${allTimeTotals.expenses}`,
      change: expenseChange,
      icon: "expense",
    },
  ];

  /**
   * Insights section
   */
  const insights = [
    {
      title: "Highest Spending Category",
      value: "Food",
      description:
        "You spent the most on food this month",
    },
    {
      title: "Monthly Comparison",
      value: `${balanceChange}%`,
      description:
        "Change compared to last month",
    },
    {
      title: "Observation",
      value:
        currentTotals.balance > 0
          ? "Positive Cash Flow"
          : "Negative Cash Flow",
      description:
        "Income vs expenses trend",
    },
  ];

  return (
    <Main>
      <SummaryCardsGrid
        data={summaryData}
      />

      <S.ChartSection>
        <Card>
          <S.ChartTitle>
            Balance Trend
          </S.ChartTitle>

          <S.ChartPlaceholder>
            Time-based chart goes here
          </S.ChartPlaceholder>
        </Card>

        <Card>
          <S.ChartTitle>
            Spending Breakdown
          </S.ChartTitle>

          <S.ChartPlaceholder>
            Category chart goes here
          </S.ChartPlaceholder>
        </Card>
      </S.ChartSection>

      <InsightsPanel insights={insights} />
    </Main>
  );
};

export default Dashboard;