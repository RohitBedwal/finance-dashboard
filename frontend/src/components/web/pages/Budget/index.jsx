import React, { useEffect, useMemo, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import Main from "../../../templates/main";
import Card from "../../atoms/card";
import BudgetCard from "../../organisms/BudgetCard";
import TransactionsToolbar from "../../molecules/TransactionsToolbar";
import AddNewBudget from "./AddNewBudget";
import { categoryOptionsByType } from "../Transactions/AddNewTransaction/defaultCategories";
import { getItem, subscribeStorage } from "../../../../utils/localStorage";
import * as S from "./styles";

const formatCurrency = (value) => `₹${Number(value || 0).toLocaleString()}`;

const parseAmount = (value) => {
  const amount = Number(String(value ?? "").replace(/[^\d.-]/g, ""));
  return Number.isNaN(amount) ? 0 : amount;
};

const normalizeType = (type) => {
  const normalized = String(type || "").toLowerCase();
  if (normalized === "expense" || normalized === "debit") return "Expense";
  if (normalized === "income" || normalized === "credit") return "Income";
  return "";
};

const parseDate = (value) => {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const computeStatus = (spent, budget) => {
  if (budget <= 0) return "on track";
  if (spent > budget) return "over budget";
  if (spent >= budget * 0.8) return "need attention";
  return "on track";
};

const toDayRange = (date) => {
  const from = new Date(date);
  from.setHours(0, 0, 0, 0);

  const to = new Date(date);
  to.setHours(23, 59, 59, 999);

  return { from, to };
};

const getCurrentMonthRange = () => {
  const now = new Date();
  const from = new Date(now.getFullYear(), now.getMonth(), 1);
  from.setHours(0, 0, 0, 0);

  const to = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  to.setHours(23, 59, 59, 999);

  return { from, to };
};

const aggregateByCategory = (transactions, from, to) => {
  const totals = {};

  transactions.forEach((tx) => {
    const txDate = parseDate(tx.date);
    if (!txDate || txDate < from || txDate > to) return;
    if (normalizeType(tx.type) !== "Expense") return;

    const category = String(tx.category || "Others").trim() || "Others";
    totals[category] = (totals[category] || 0) + parseAmount(tx.amount);
  });

  return totals;
};

const matchesAmountFilter = (value, filterValue) => {
  if (!filterValue) return true;

  if (filterValue === "1-200") return value >= 1 && value <= 200;
  if (filterValue === "200-500") return value > 200 && value <= 500;
  if (filterValue === "500-1000") return value > 500 && value <= 1000;
  if (filterValue === "1000+") return value > 1000;

  return true;
};

const calculateChange = (current, previous) => {
  if (previous === 0) return current === 0 ? 0 : 100;
  return Number((((current - previous) / Math.abs(previous)) * 100).toFixed(1));
};

const budgetSortOptions = [
  { label: "Default", value: "default" },
  { label: "Highest spent", value: "highest-spent" },
  { label: "Lowest spent", value: "lowest-spent" },
];

const budgetStatusOptions = [
  { label: "On track", value: "on-track" },
  { label: "Need attention", value: "need-attention" },
  { label: "Over budget", value: "over-budget" },
];

const Budget = () => {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [openAddBudget, setOpenAddBudget] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  const [budgetFilters, setBudgetFilters] = useState({
    type: null,
    amount: null,
    currency: null,
    method: null,
    category: null,
    status: null,
  });

  useEffect(() => {
    const load = () => {
      setTransactions(getItem("transactions") || []);
      setBudgets(getItem("budgets") || []);
    };

    load();
    return subscribeStorage(load);
  }, []);

  const activeRange = useMemo(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const start = toDayRange(dateRange.startDate).from;
      const end = toDayRange(dateRange.endDate).to;
      return { from: start, to: end };
    }

    return getCurrentMonthRange();
  }, [dateRange.startDate, dateRange.endDate]);

  const previousRange = useMemo(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const start = toDayRange(dateRange.startDate).from;
      const end = toDayRange(dateRange.endDate).to;
      const duration = end.getTime() - start.getTime();

      const prevEnd = new Date(start.getTime() - 1);
      const prevStart = new Date(prevEnd.getTime() - duration);

      return { from: prevStart, to: prevEnd };
    }

    const now = new Date();
    const prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    prevMonthStart.setHours(0, 0, 0, 0);
    const prevMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
    prevMonthEnd.setHours(23, 59, 59, 999);
    return { from: prevMonthStart, to: prevMonthEnd };
  }, [dateRange.startDate, dateRange.endDate]);

  const expenseTotals = useMemo(
    () => aggregateByCategory(transactions, activeRange.from, activeRange.to),
    [transactions, activeRange]
  );

  const previousExpenseTotals = useMemo(
    () => aggregateByCategory(transactions, previousRange.from, previousRange.to),
    [transactions, previousRange]
  );

  const budgetCards = useMemo(() => {
    const expenseCategories = categoryOptionsByType.Expense || [];

    const normalizedBudgets = budgets
      .filter((item) => normalizeType(item.type) === "Expense" || !item.type)
      .filter((item) => expenseCategories.includes(String(item.category || "")))
      .map((item) => {
        const category = String(item.category || "");
        const budgetAmount = parseAmount(item.amount);
        const spent = expenseTotals[category] || 0;
        const status = computeStatus(spent, budgetAmount);

        return {
          id: item.id || category,
          title: category,
          category,
          spent,
          budget: budgetAmount,
          status,
        };
      });

    const sortFilter = budgetFilters.type?.value;
    const amountFilter = budgetFilters.amount?.value;
    const statusFilter = budgetFilters.status?.value;

    let list = normalizedBudgets.filter((item) => {
      const statusValue = item.status.replace(/\s+/g, "-");
      if (statusFilter && statusValue !== statusFilter) return false;
      if (!matchesAmountFilter(item.budget, amountFilter)) return false;
      return true;
    });

    if (sortFilter === "highest-spent") {
      list = [...list].sort((a, b) => b.spent - a.spent);
    } else if (sortFilter === "lowest-spent") {
      list = [...list].sort((a, b) => a.spent - b.spent);
    }

    return list;
  }, [budgets, expenseTotals, budgetFilters]);

  const mostExpenses = useMemo(() => {
    return Object.entries(expenseTotals)
      .map(([name, amount]) => ({
        name,
        amount,
        change: calculateChange(amount, previousExpenseTotals[name] || 0),
      }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 6);
  }, [expenseTotals, previousExpenseTotals]);

  const monthlyBudget = budgetCards.reduce((sum, item) => sum + item.budget, 0);
  const monthlySpent = budgetCards.reduce((sum, item) => sum + item.spent, 0);
  const monthlyLeft = monthlyBudget - monthlySpent;
  const monthlyPercent = monthlyBudget > 0
    ? Math.min(100, Math.round((monthlySpent / monthlyBudget) * 100))
    : 0;
  const monthlyProgressData = [{ name: "spent", value: monthlyPercent }];
  const monthlyBackgroundData = [{ name: "total", value: 100 }];

  return (
    <Main>
      

      <S.Layout>
       
        <S.Left>
          <TransactionsToolbar
            transactions={[]}
            onDateFilter={(startDate, endDate) =>
              setDateRange({ startDate, endDate })
            }
            showExportCsv={false}
            addButtonLabel="+ Add new budget"
            onAddClick={() => {
              setEditingBudget(null);
              setOpenAddBudget(true);
            }}
            filterBarProps={{
              filters: budgetFilters,
              setFilters: setBudgetFilters,
              typePlaceholder: "Sort by",
              amountPlaceholder: "Amount",
              statusPlaceholder: "Status",
              typeOptions: budgetSortOptions,
              statusOptions: budgetStatusOptions,
              showMethod: false,
              showCategory: false,
            }}
          />
          <S.CardGrid>
            {budgetCards.map((item) => (
              <BudgetCard
                key={item.id}
                {...item}
                onEditClick={() => {
                  setEditingBudget({
                    id: item.id,
                    category: item.category,
                    amount: item.budget,
                  });
                  setOpenAddBudget(true);
                }}
              />
            ))}
          </S.CardGrid>
        </S.Left>

        <S.Right>
          <Card>
            <S.MonthlyTitle>Monthly budget</S.MonthlyTitle>
            <S.MonthlyBudgetValue>
              {formatCurrency(monthlyBudget)}<span>.00</span>
            </S.MonthlyBudgetValue>
            <S.MonthlyStatus>on track</S.MonthlyStatus>

            <S.MonthlyProgress>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={monthlyBackgroundData}
                    dataKey="value"
                    startAngle={180}
                    endAngle={0}
                    innerRadius={110}
                    outerRadius={130}
                    stroke="none"
                    cornerRadius={12}

                  >
                    <Cell fill="var(--primary-100)" />
                  </Pie>

                  <Pie
                    data={monthlyProgressData}
                    dataKey="value"
                    startAngle={180}
                    endAngle={180 - (monthlyPercent / 100) * 180}
                    innerRadius={110}
                    outerRadius={130}
                    stroke="none"
                    cornerRadius={12}
                  >
                    <Cell fill="var(--primary-600)" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </S.MonthlyProgress>

            <S.MonthlySpent>
              <span>{monthlyPercent}% spent</span>
              <strong>{formatCurrency(monthlySpent)}<small>.00</small></strong>
            </S.MonthlySpent>
          </Card>

          <Card>
            <S.MostHeader>
              <h4>Most expenses</h4>
              {/* <Select
                defaultValue="this-month"
                options={[{ label: "This month", value: "this-month" }]}
              /> */}
            </S.MostHeader>

            <S.MostList>
              {mostExpenses.map((item) => (
                <li key={item.name}>
                  <div>
                    <strong>{formatCurrency(item.amount)}</strong>
                    <span>{item.name}</span>
                  </div>
                  <S.ChangePill $negative={item.change < 0}>
                    {`${item.change >= 0 ? "↑" : "↓"} ${Math.abs(item.change)}%`}
                  </S.ChangePill>
                </li>
              ))}
            </S.MostList>
          </Card>
        </S.Right>
      </S.Layout>

      {openAddBudget && (
        <AddNewBudget
          initialBudget={editingBudget}
          onClose={() => {
            setOpenAddBudget(false);
            setEditingBudget(null);
          }}
        />
      )}
    </Main>
  );
};

export default Budget;
