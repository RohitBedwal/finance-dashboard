import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Main from "../../../templates/main";
import SummaryCardsGrid from "../../organisms/SummaryCardsGrid";
import MonthlyIncomeExpenseChart from "../../organisms/MonthlyIncomeExpenseChart";
import BudgetOverviewCard from "../../organisms/BudgetOverviewCard";
import * as S from "./simpleStyles";
import { getItem, subscribeStorage } from "../../../../utils/localStorage";
import { useAnalyticsData } from "../Analytics/useAnalyticsData";

const parseAmount = (value) => {
  const amount = Number(String(value ?? "").replace(/[^\d.-]/g, ""));
  return Number.isNaN(amount) ? 0 : amount;
};

const formatDateTime = (value) => {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";

  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-IN", { month: "short" });
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day} ${month} ${hours}:${minutes}`;
};

const BUDGET_COLORS = [
  "var(--primary-600)",
  "var(--primary-500)",
  "var(--primary-400)",
  "var(--primary-300)",
  "var(--secondary-600)",
  "var(--secondary-400)",
  "var(--gray-700)",
  "var(--gray-500)",
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [goals, setGoals] = useState([]);

  const {
    years,
    moneyFlowYear,
    setMoneyFlowYear,
    monthlyBarData,
    summaryData: analyticsSummaryData,
  } = useAnalyticsData();

  useEffect(() => {
    const loadTransactions = () => {
      setTransactions(getItem("transactions") || []);
      setBudgets(getItem("budgets") || []);
      setGoals(getItem("goals") || []);
    };

    loadTransactions();
    return subscribeStorage(loadTransactions);
  }, []);

  const budgetChartData = useMemo(() => {
    const totalsByCategory = budgets.reduce((acc, item) => {
      const category = String(item?.category || "Others").trim() || "Others";
      acc[category] = (acc[category] || 0) + parseAmount(item?.amount);
      return acc;
    }, {});

    return Object.entries(totalsByCategory)
      .map(([name, value], index) => {
        const normalizedName = String(name).trim().toLowerCase();

        return {
          name,
          value,
          color:
            normalizedName === "others" || normalizedName === "other"
              ? "var(--primary-200)"
              : BUDGET_COLORS[index % BUDGET_COLORS.length],
        };
      })
      .filter((item) => item.value > 0);
  }, [budgets]);

  const totalBudget = useMemo(() => {
    return budgetChartData.reduce((sum, item) => sum + item.value, 0);
  }, [budgetChartData]);

  const recentTransactions = useMemo(() => {
    return [...transactions]
      .filter((item) => item?.date)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);
  }, [transactions]);

  const savingsGoals = useMemo(() => {
    const parsedGoals = (goals || [])
      .map((goal) => {
        const title = String(goal?.title || goal?.name || "").trim();
        const target = parseAmount(goal?.target || goal?.goalAmount || goal?.amount);
        const saved = parseAmount(goal?.saved || goal?.current || goal?.savedAmount);

        if (!title || target <= 0) return null;

        const percent = Math.max(0, Math.min(100, Math.round((saved / target) * 100)));

        return {
          title,
          target,
          percent,
        };
      })
      .filter(Boolean)
      .slice(0, 3);

    if (parsedGoals.length) return parsedGoals;

    return [
      { title: "Hot wheels", target: 1650, percent: 25 },
      { title: "Computer", target: 60000, percent: 42 },
      { title: "New house", target: 150000, percent: 3 },
    ];
  }, [goals]);

  return (
    <Main>
      <SummaryCardsGrid data={analyticsSummaryData} />

      <S.ChartSection>
        <MonthlyIncomeExpenseChart
          year={moneyFlowYear}
          years={years}
          onYearChange={setMoneyFlowYear}
          monthlyData={monthlyBarData}
        />

         <BudgetOverviewCard
          monthLabel="this month"
          type="Budget"
          total={totalBudget}
          chartData={budgetChartData}
        />
      </S.ChartSection>

      <S.BottomSection>
        <S.RecentSection>
          <S.RecentHeader>
            <S.RecentTitle>Recent transactions</S.RecentTitle>

            <S.RecentActions>
              <S.RecentActionButton type="button" onClick={() => navigate("/transactions")}>See all</S.RecentActionButton>
            </S.RecentActions>
          </S.RecentHeader>

          <S.RecentTableWrap>
            <S.RecentTable>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Payment Name</th>
                  <th>Method</th>
                  <th>Category</th>
                </tr>
              </thead>

              <tbody>
                {recentTransactions.length > 0 ? (
                  recentTransactions.map((transaction, index) => (
                    <tr key={`${transaction.id || "txn"}-${index}`}>
                      <td>{formatDateTime(transaction.date)}</td>
                      <td className={transaction.type === "Income" ? "income" : "expense"}>
                        {transaction.type === "Income" ? "+" : "-"} ₹{parseAmount(transaction.amount)}
                      </td>
                      <td>{transaction.name || "-"}</td>
                      <td>{transaction.method || "-"}</td>
                      <td>{transaction.category || "-"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5}>No transactions found</td>
                  </tr>
                )}
              </tbody>
            </S.RecentTable>
          </S.RecentTableWrap>
        </S.RecentSection>

        <S.BudgetSection>
          <S.SavingsCard>
            <S.SavingsHeader>
              <S.SavingsTitle>Saving goals</S.SavingsTitle>
              <S.RedirectButton
                        onClick={() => navigate("/analytics")}
                      >
                        <svg width="25" height="25px">
                          <use href="/icons.svg#arrow-up-right" />
                        </svg>
                      </S.RedirectButton>
            </S.SavingsHeader>

            <S.SavingsList>
              {savingsGoals.map((goalItem) => (
                <S.SavingsItem key={goalItem.title}>
                  <S.SavingsRow>
                    <S.SavingsName>{goalItem.title}</S.SavingsName>
                    <S.SavingsAmount>₹{goalItem.target.toLocaleString()}</S.SavingsAmount>
                  </S.SavingsRow>

                  <S.SavingsTrack>
                    <S.SavingsFill style={{ width: `${goalItem.percent}%` }}>
                      <span>{goalItem.percent}%</span>
                    </S.SavingsFill>
                  </S.SavingsTrack>
                </S.SavingsItem>
              ))}
            </S.SavingsList>
          </S.SavingsCard>
        </S.BudgetSection>
      </S.BottomSection>
    </Main>
  );
};

export default Dashboard;
