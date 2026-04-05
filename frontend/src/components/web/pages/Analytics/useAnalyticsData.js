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

const countUniqueCategories = (list) => {
  const categories = list
    .map((tx) => String(tx?.category || "").trim().toLowerCase())
    .filter(Boolean);
  return new Set(categories).size;
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

  const savingPercent = 0.15;
  const totalsFromTransactions = (list) => {
    const totals = list.reduce(
      (acc, tx) => {
        const amount = parseAmount(tx.amount);
        const type = normalizeType(tx.type);

        if (type === "Income") acc.income += amount;
        if (type === "Expense") acc.expense += amount;

        return acc;
      },
      { income: 0, expense: 0 }
    );

    const saving = Math.round(totals.income * savingPercent);
    const balance = totals.income - saving - totals.expense;

    return {
      ...totals,
      saving,
      balance,
    };
  };

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYearValue = now.getFullYear();
  const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const previousMonthYear = currentMonth === 0 ? currentYearValue - 1 : currentYearValue;

  const currentMonthTransactions = transactions.filter((tx) => {
    const date = parseTransactionDate(tx.date);
    if (!date) return false;
    return date.getFullYear() === currentYearValue && date.getMonth() === currentMonth;
  });

  const previousMonthTransactions = transactions.filter((tx) => {
    const date = parseTransactionDate(tx.date);
    if (!date) return false;
    return date.getFullYear() === previousMonthYear && date.getMonth() === previousMonth;
  });

  const currentMonthIncomeTransactions = currentMonthTransactions.filter(
    (tx) => normalizeType(tx.type) === "Income"
  );

  const currentMonthExpenseTransactions = currentMonthTransactions.filter(
    (tx) => normalizeType(tx.type) === "Expense"
  );

  const allIncomeTransactions = transactions.filter(
    (tx) => normalizeType(tx.type) === "Income"
  );

  const allExpenseTransactions = transactions.filter(
    (tx) => normalizeType(tx.type) === "Expense"
  );

  const allTimeTotals = totalsFromTransactions(transactions);
  const currentMonthTotals = totalsFromTransactions(currentMonthTransactions);
  const previousMonthTotals = totalsFromTransactions(previousMonthTransactions);

  const balanceDelta = currentMonthTotals.balance - previousMonthTotals.balance;
  const incomeDelta = currentMonthTotals.income - previousMonthTotals.income;
  const expenseDelta = currentMonthTotals.expense - previousMonthTotals.expense;
  const savingDelta = currentMonthTotals.saving - previousMonthTotals.saving;

  const lastThreeMonthsSavedText = Array.from({ length: 3 }, (_, offset) => {
    const targetDate = new Date(currentYearValue, currentMonth - offset, 1);
    const month = targetDate.getMonth();
    const year = targetDate.getFullYear();

    const monthTransactions = transactions.filter((tx) => {
      const date = parseTransactionDate(tx.date);
      return date && date.getFullYear() === year && date.getMonth() === month;
    });

    const monthTotals = totalsFromTransactions(monthTransactions);
    return `${MONTHS[month]} ₹${monthTotals.saving.toLocaleString()}`;
  }).reverse().join(" | ");

  const cardLast4 = useMemo(() => {
    const cardSource = transactions.find((tx) => {
      const candidates = [tx?.cardNumber, tx?.accountNumber, tx?.reference, tx?.note, tx?.notes];
      return candidates.some((value) => /\d{4,}/.test(String(value || "")));
    });

    if (!cardSource) return "0000";

    const candidates = [
      cardSource?.cardNumber,
      cardSource?.accountNumber,
      cardSource?.reference,
      cardSource?.note,
      cardSource?.notes,
    ];

    const digits = candidates
      .map((value) => String(value || "").replace(/\D/g, ""))
      .find((value) => value.length >= 4);

    return digits ? digits.slice(-4) : "0000";
  }, [transactions]);

  const summaryData = [
    {
      title: "Total Balance",
      amount: `₹${allTimeTotals.balance}`,
      change: calculateChange(currentMonthTotals.balance, previousMonthTotals.balance),
      icon: "goal",
      cardLast4,
      currency: "INR",
      stats: [
        { label: "transactions", value: transactions.length },
        { label: "categories", value: countUniqueCategories(transactions) },
      ],
      detail: `You have ${balanceDelta >= 0 ? "extra" : "lower"} ₹${Math.abs(balanceDelta).toLocaleString()} compared to last month.`,
    },
    {
      title: "Expenses",
      amount: `₹${currentMonthTotals.expense}`,
      change: calculateChange(currentMonthTotals.expense, previousMonthTotals.expense),
      icon: "expense",
      currency: "INR",
      stats: [
        { label: "transactions", value: allExpenseTransactions.length },
        { label: "categories", value: countUniqueCategories(allExpenseTransactions) },
      ],
      detail: `You spent ${expenseDelta >= 0 ? "extra" : "less"} ₹${Math.abs(expenseDelta).toLocaleString()} compared to last month.`,
    },
    {
      title: "Income",
      amount: `₹${currentMonthTotals.income}`,
      change: calculateChange(currentMonthTotals.income, previousMonthTotals.income),
      icon: "income",
      currency: "INR",
      stats: [
        { label: "transactions", value: allIncomeTransactions.length },
        { label: "categories", value: countUniqueCategories(allIncomeTransactions) },
      ],
      detail: `You earned ${incomeDelta >= 0 ? "extra" : "less"} ₹${Math.abs(incomeDelta).toLocaleString()} compared to last month.`,
    },
    {
      title: "Saving",
      amount: `₹${allTimeTotals.saving}`,
      change: calculateChange(currentMonthTotals.saving, previousMonthTotals.saving),
      icon: "saving",
      currency: "INR",
      stats: [
        { label: "transactions", value: allIncomeTransactions.length },
        { label: "categories", value: countUniqueCategories(allIncomeTransactions) },
      ],
      detail: `You saved ${savingDelta >= 0 ? "extra" : "less"} ₹${Math.abs(savingDelta).toLocaleString()} this month. Last 3 months: ${lastThreeMonthsSavedText}.`,
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
    return Math.round((savingsYearData.monthlyIncome[index] || 0) * savingPercent);
  });

  const compareSavingsSeries = halfYearMonths.map((_, offset) => {
    const index = offset + halfYearStart;
    return Math.round((compareSavingsYearData.monthlyIncome[index] || 0) * savingPercent);
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
  const yearlySavingAmount = Math.round(yearlyIncomeTotal * savingPercent);
  const yearlyBalanceTotal = yearlyIncomeTotal - yearlySavingAmount - yearlyExpenseTotal;

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