import { useEffect, useMemo, useState } from "react";
import { getItem, subscribeStorage } from "../../../../utils/localStorage";
import { categoryOptionsByType } from "../Transactions/AddNewTransaction/defaultCategories";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const getHalfYearWindow = (monthIndex = new Date().getMonth()) => {
  const start = monthIndex < 6 ? 0 : 6;
  return {
    start,
    months: MONTHS.slice(start, start + 6),
  };
};

const parseAmount = (value) => {
  const amount = Number(String(value ?? "").replace(/[^\d.-]/g, ""));
  return Number.isNaN(amount) ? 0 : amount;
};

const normalizeType = (type) => {
  const normalized = String(type || "").toLowerCase();
  if (normalized === "credit" || normalized === "income") return "Income";
  if (normalized === "debit" || normalized === "expense") return "Expense";
  return "";
};

const parseTransactionDate = (value) => {
  if (!value) return null;

  const direct = new Date(value);
  if (!Number.isNaN(direct.getTime())) return direct;

  const fallback = new Date(`${String(value).trim()} ${new Date().getFullYear()}`);
  return Number.isNaN(fallback.getTime()) ? null : fallback;
};

const calculateChange = (current, previous) => {
  if (previous === 0) return current === 0 ? 0 : 100;
  return Number((((current - previous) / Math.abs(previous)) * 100).toFixed(1));
};

export const useAnalyticsData = () => {
  const [transactions, setTransactions] = useState([]);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const loadTransactions = () => {
      setTransactions(getItem("transactions") || []);
    };

    loadTransactions();
    const unsubscribe = subscribeStorage(loadTransactions);
    return unsubscribe;
  }, []);

  const years = useMemo(() => {
    const fromTransactions = transactions
      .map((tx) => parseTransactionDate(tx.date)?.getFullYear())
      .filter(Boolean);

    const merged = Array.from(new Set([...fromTransactions, currentYear, currentYear - 1]));
    return merged.sort((a, b) => b - a);
  }, [transactions, currentYear]);

  const [moneyFlowYear, setMoneyFlowYear] = useState(currentYear);
  const [savingsYear, setSavingsYear] = useState(currentYear);
  const [compareYear, setCompareYear] = useState(currentYear - 1);
  const [statisticsType, setStatisticsType] = useState("Expense");

  const { start: halfYearStart, months: halfYearMonths } = useMemo(
    () => getHalfYearWindow(),
    []
  );

  useEffect(() => {
    if (!years.length) return;

    if (!years.includes(moneyFlowYear)) {
      setMoneyFlowYear(years[0]);
    }

    if (!years.includes(savingsYear)) {
      setSavingsYear(years[0]);
    }

    if (!years.includes(compareYear) || compareYear === savingsYear) {
      const preferred = savingsYear - 1;
      const fallback = years.find((year) => year === preferred)
        || years.find((year) => year !== savingsYear)
        || years[0];
      setCompareYear(fallback);
    }
  }, [years, moneyFlowYear, savingsYear, compareYear]);

  useEffect(() => {
    if (!years.length) return;

    const preferred = savingsYear - 1;
    if (years.includes(preferred) && preferred !== compareYear) {
      setCompareYear(preferred);
      return;
    }

    if (compareYear === savingsYear) {
      const fallback = years.find((year) => year !== savingsYear) || years[0];
      setCompareYear(fallback);
    }
  }, [savingsYear, years, compareYear]);

  const aggregateByYear = (year) => {
    const monthlyIncome = new Array(12).fill(0);
    const monthlyExpense = new Array(12).fill(0);

    transactions.forEach((tx) => {
      const txDate = parseTransactionDate(tx.date);
      if (!txDate || txDate.getFullYear() !== year) return;

      const amount = parseAmount(tx.amount);
      const type = normalizeType(tx.type);
      const monthIndex = txDate.getMonth();

      if (type === "Income") monthlyIncome[monthIndex] += amount;
      if (type === "Expense") monthlyExpense[monthIndex] += amount;
    });

    return {
      monthlyIncome,
      monthlyExpense,
      income: monthlyIncome.reduce((sum, amount) => sum + amount, 0),
      expense: monthlyExpense.reduce((sum, amount) => sum + amount, 0),
    };
  };

  const moneyFlowYearData = useMemo(
    () => aggregateByYear(moneyFlowYear),
    [transactions, moneyFlowYear]
  );

  const savingsYearData = useMemo(
    () => aggregateByYear(savingsYear),
    [transactions, savingsYear]
  );

  const moneyFlowCompareYear = useMemo(() => {
    const preferred = moneyFlowYear - 1;
    if (years.includes(preferred)) return preferred;
    return years.find((year) => year !== moneyFlowYear) || moneyFlowYear;
  }, [years, moneyFlowYear]);

  const compareYearData = useMemo(
    () => aggregateByYear(moneyFlowCompareYear),
    [transactions, moneyFlowCompareYear]
  );

  const compareSavingsYearData = useMemo(
    () => aggregateByYear(compareYear),
    [transactions, compareYear]
  );

  const selectedSavings = moneyFlowYearData.income - moneyFlowYearData.expense;
  const compareSavings = compareYearData.income - compareYearData.expense;

  const summaryData = [
    {
      title: "Total Balance",
      amount: `₹${selectedSavings}`,
      change: calculateChange(selectedSavings, compareSavings),
      icon: "goal",
    },
    {
      title: "Expenses",
      amount: `₹${moneyFlowYearData.expense}`,
      change: calculateChange(moneyFlowYearData.expense, compareYearData.expense),
      icon: "expense",
    },
    {
      title: "Income",
      amount: `₹${moneyFlowYearData.income}`,
      change: calculateChange(moneyFlowYearData.income, compareYearData.income),
      icon: "income",
    },
    {
      title: "Saving",
      amount: `₹${selectedSavings}`,
      change: calculateChange(selectedSavings, compareSavings),
      icon: "saving",
    },
  ];

  const monthlyBarData = halfYearMonths.map((month, offset) => {
    const index = offset + halfYearStart;
    return {
      month,
      income: moneyFlowYearData.monthlyIncome[index],
      expense: moneyFlowYearData.monthlyExpense[index],
    };
  });

  const selectedSavingsSeries = halfYearMonths.map((_, offset) => {
    const index = offset + halfYearStart;
    return savingsYearData.monthlyIncome[index] - savingsYearData.monthlyExpense[index];
  });

  const compareSavingsSeries = halfYearMonths.map((_, offset) => {
    const index = offset + halfYearStart;
    return compareSavingsYearData.monthlyIncome[index] - compareSavingsYearData.monthlyExpense[index];
  });

  const statisticsPalette = [
    "var(--primary-600)",
    "var(--primary-400)",
    "var(--primary-300)",
    "var(--gray-100)",
    "var(--gray-700)",
    "var(--gray-500)",
  ];

  const statisticsMonthIndex = useMemo(() => {
    const thisMonth = new Date().getMonth();
    if (moneyFlowYear === currentYear) return thisMonth;

    let latestMonthWithData = -1;

    transactions.forEach((tx) => {
      const txDate = parseTransactionDate(tx.date);
      if (!txDate) return;

      if (txDate.getFullYear() !== moneyFlowYear) return;
      if (normalizeType(tx.type) !== statisticsType) return;

      latestMonthWithData = Math.max(latestMonthWithData, txDate.getMonth());
    });

    return latestMonthWithData >= 0 ? latestMonthWithData : thisMonth;
  }, [transactions, moneyFlowYear, currentYear, statisticsType]);

  const statisticsMonthLabel = MONTHS[statisticsMonthIndex];

  const statisticsRaw = useMemo(() => {
    const selectedCategories = categoryOptionsByType[statisticsType] || [];
    const fallbackCategory = selectedCategories[selectedCategories.length - 1] || "Others";

    const categoryTotals = selectedCategories.reduce((acc, category) => {
      acc[category] = 0;
      return acc;
    }, {});

    transactions.forEach((tx) => {
      const txDate = parseTransactionDate(tx.date);
      if (!txDate) return;

      if (
        txDate.getFullYear() !== moneyFlowYear
        || txDate.getMonth() !== statisticsMonthIndex
      ) {
        return;
      }

      if (normalizeType(tx.type) !== statisticsType) return;

      const amount = parseAmount(tx.amount);
      const rawCategory = String(tx.category || "").trim();
      const matchedCategory = selectedCategories.find(
        (category) => category.toLowerCase() === rawCategory.toLowerCase()
      );

      const category = matchedCategory || fallbackCategory;
      categoryTotals[category] = (categoryTotals[category] || 0) + amount;
    });

    return selectedCategories.map((category) => ({
      name: category,
      value: categoryTotals[category] || 0,
    }));
  }, [transactions, moneyFlowYear, statisticsMonthIndex, statisticsType]);

  const statisticsData = statisticsRaw.map((item, index) => ({
    ...item,
    color: statisticsPalette[index % statisticsPalette.length],
  }));

  const statisticsTotal = statisticsData.reduce((sum, item) => sum + item.value, 0);

  const buildYearlyRows = (targetType) => {
    const selectedCategories = categoryOptionsByType[targetType] || [];
    const fallbackCategory = selectedCategories[selectedCategories.length - 1] || "Others";

    const rowMap = selectedCategories.reduce((acc, category) => {
      acc[category] = new Array(12).fill(0);
      return acc;
    }, {});

    transactions.forEach((tx) => {
      const txDate = parseTransactionDate(tx.date);
      if (!txDate || txDate.getFullYear() !== moneyFlowYear) return;
      if (normalizeType(tx.type) !== targetType) return;

      const amount = parseAmount(tx.amount);
      const monthIndex = txDate.getMonth();
      const rawCategory = String(tx.category || "").trim();
      const matchedCategory = selectedCategories.find(
        (category) => category.toLowerCase() === rawCategory.toLowerCase()
      );

      const category = matchedCategory || fallbackCategory;

      if (!rowMap[category]) {
        rowMap[category] = new Array(12).fill(0);
      }

      rowMap[category][monthIndex] += amount;
    });

    return selectedCategories.map((category) => ({
      name: category,
      monthly: rowMap[category] || new Array(12).fill(0),
    }));
  };

  const yearlyIncomeRows = useMemo(
    () => buildYearlyRows("Income"),
    [transactions, moneyFlowYear]
  );

  const yearlyExpenseRows = useMemo(
    () => buildYearlyRows("Expense"),
    [transactions, moneyFlowYear]
  );

  const sumMonthlyTotals = (rows) => {
    const totals = new Array(12).fill(0);

    rows.forEach((row) => {
      row.monthly.forEach((value, monthIndex) => {
        totals[monthIndex] += value;
      });
    });

    return totals;
  };

  const yearlyIncomeTotals = useMemo(
    () => sumMonthlyTotals(yearlyIncomeRows),
    [yearlyIncomeRows]
  );

  const yearlyExpenseTotals = useMemo(
    () => sumMonthlyTotals(yearlyExpenseRows),
    [yearlyExpenseRows]
  );

  const yearlyIncomeTotal = yearlyIncomeTotals.reduce((sum, value) => sum + value, 0);
  const yearlyExpenseTotal = yearlyExpenseTotals.reduce((sum, value) => sum + value, 0);
  const yearlyBalanceTotal = yearlyIncomeTotal - yearlyExpenseTotal;

  return {
    years,
    moneyFlowYear,
    setMoneyFlowYear,
    savingsYear,
    compareYear,
    setCompareYear,
    statisticsType,
    setStatisticsType,
    statisticsMonthLabel,
    statisticsData,
    statisticsTotal,
    yearlyIncomeRows,
    yearlyExpenseRows,
    yearlyIncomeTotals,
    yearlyExpenseTotals,
    yearlyIncomeTotal,
    yearlyExpenseTotal,
    yearlyBalanceTotal,
    halfYearMonths,
    summaryData,
    monthlyBarData,
    selectedSavingsSeries,
    compareSavingsSeries,
  };
};