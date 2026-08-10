import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Main from "../../../templates/main";
import SummaryCardsGrid from "../../organisms/SummaryCardsGrid";
import MonthlyIncomeExpenseChart from "../../organisms/MonthlyIncomeExpenseChart";
import BudgetOverviewCard from "../../organisms/BudgetOverviewCard";
import CardsSection from "../../organisms/CardsSection";
import CardSetupModal from "../../organisms/CardSetupModal";
import * as S from "./simpleStyles";
import { useAnalyticsData } from "../Analytics/useAnalyticsData";
import { useData } from "../../../../context/DataContext";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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

const parseTxDate = (value) => {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
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
  const { transactions, budgets, cards, refetchAll, refetchCards, loading } = useData();
  const [currentDateTime, setCurrentDateTime] = useState(() => new Date());
  const [selectedMonth, setSelectedMonth] = useState(() => new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(() => new Date().getFullYear());
  const [cardModalOpen, setCardModalOpen] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(() => {
    try {
      return localStorage.getItem("selected_card_id");
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (loading) return;

    if (!cards.length) {
      setSelectedCardId(null);
      localStorage.removeItem("selected_card_id");
      return;
    }

    const current =
      selectedCardId && cards.some((c) => c.id === selectedCardId)
        ? selectedCardId
        : cards[0].id;

    if (current !== selectedCardId) {
      setSelectedCardId(current);
      localStorage.setItem("selected_card_id", current);
    }
  }, [cards, selectedCardId, loading]);

  const handleSelectCard = (id) => {
    setSelectedCardId(id);
    localStorage.setItem("selected_card_id", id);
  };

  const selectedCard = cards.find((c) => c.id === selectedCardId) || cards[0] || null;

  const bankFilter = useMemo(() => {
    if (!selectedCard) return null;
    return `${selectedCard.bank_name} ****${selectedCard.last4}`;
  }, [selectedCard]);

  const bankTransactions = useMemo(() => {
    if (!bankFilter) return transactions;
    return transactions.filter((tx) => tx.bank === bankFilter);
  }, [transactions, bankFilter]);

  const {
    years,
    moneyFlowYear,
    setMoneyFlowYear,
    monthlyBarData,
    summaryData: analyticsSummaryData,
  } = useAnalyticsData(bankTransactions);

  const isCurrentMonth = selectedMonth === new Date().getMonth() && selectedYear === new Date().getFullYear();

  useEffect(() => {
    const intervalId = setInterval(() => setCurrentDateTime(new Date()), 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  const dashboardDateTime = useMemo(() => {
    const datePart = currentDateTime.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
    const timePart = currentDateTime.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
    return `${datePart} • ${timePart}`;
  }, [currentDateTime]);

  const navigateMonth = (dir) => {
    setSelectedMonth((prev) => {
      const next = prev + dir;
      if (next > 11) {
        setSelectedYear((y) => y + 1);
        return 0;
      }
      if (next < 0) {
        setSelectedYear((y) => y - 1);
        return 11;
      }
      return next;
    });
  };

  const monthTotals = useMemo(() => {
    const txInSelected = bankTransactions.filter((tx) => {
      const d = parseTxDate(tx.date);
      return d && d.getFullYear() === selectedYear && d.getMonth() === selectedMonth;
    });

    let income = 0;
    let expense = 0;
    let savingsAdded = 0;
    let savingsWithdrawn = 0;

    txInSelected.forEach((tx) => {
      const amount = parseAmount(tx.amount);
      const type = normalizeType(tx.type);
      if (type === "Income") income += amount;
      if (type === "Expense") expense += amount;
      if (tx.category === "Savings") {
        if (type === "Expense") savingsAdded += amount;
        if (type === "Income") savingsWithdrawn += amount;
      }
    });

    return { income, expense, balance: income - expense, savings: savingsAdded - savingsWithdrawn, txCount: txInSelected.length };
  }, [bankTransactions, selectedMonth, selectedYear]);

  const allTimeTotals = useMemo(() => {
    let income = 0;
    let expense = 0;
    bankTransactions.forEach((tx) => {
      const amount = parseAmount(tx.amount);
      const type = normalizeType(tx.type);
      if (type === "Income") income += amount;
      if (type === "Expense") expense += amount;
    });
    return { income, expense, balance: income - expense };
  }, [bankTransactions]);

  const dashboardSummaryData = useMemo(() => {
    const prevMonth = selectedMonth === 0 ? 11 : selectedMonth - 1;
    const prevMonthYear = selectedMonth === 0 ? selectedYear - 1 : selectedYear;

    const prevTx = bankTransactions.filter((tx) => {
      const d = parseTxDate(tx.date);
      return d && d.getFullYear() === prevMonthYear && d.getMonth() === prevMonth;
    });

    let prevIncome = 0;
    let prevExpense = 0;
    let prevSavings = 0;
    prevTx.forEach((tx) => {
      const amount = parseAmount(tx.amount);
      const type = normalizeType(tx.type);
      if (type === "Income") prevIncome += amount;
      if (type === "Expense") prevExpense += amount;
      if (tx.category === "Savings") {
        if (type === "Expense") prevSavings += amount;
        if (type === "Income") prevSavings -= amount;
      }
    });

    const calcChange = (curr, prev) => {
      if (prev === 0) return curr === 0 ? 0 : 100;
      return Number((((curr - prev) / Math.abs(prev)) * 100).toFixed(1));
    };

    const uniqueCategories = (list) => new Set(list.map((tx) => String(tx.category || "").trim().toLowerCase()).filter(Boolean)).size;

    const monthTx = bankTransactions.filter((tx) => {
      const d = parseTxDate(tx.date);
      return d && d.getFullYear() === selectedYear && d.getMonth() === selectedMonth;
    });

    const allIncomeTx = monthTx.filter((tx) => normalizeType(tx.type) === "Income");
    const allExpenseTx = monthTx.filter((tx) => normalizeType(tx.type) === "Expense");

    const selectedMonthCumulative = bankTransactions
      .filter((tx) => {
        const d = parseTxDate(tx.date);
        if (!d) return false;
        return d.getFullYear() < selectedYear || (d.getFullYear() === selectedYear && d.getMonth() <= selectedMonth);
      })
      .reduce((sum, tx) => {
        const amount = parseAmount(tx.amount);
        const type = normalizeType(tx.type);
        if (type === "Income") return sum + amount;
        if (type === "Expense") return sum - amount;
        return sum;
      }, 0);

    return [
      {
        title: "Total Balance",
        amount: `₹${selectedMonthCumulative.toLocaleString("en-IN")}`,
        change: calcChange(monthTotals.balance, prevIncome - prevExpense),
        icon: "goal",
        currency: "INR",
        stats: [
          { label: "transactions", value: monthTotals.txCount },
          { label: "categories", value: uniqueCategories(monthTx) },
        ],
        detail: isCurrentMonth
          ? `Your all-time balance is ₹${allTimeTotals.balance.toLocaleString("en-IN")}.`
          : `Cumulative balance at end of ${MONTHS[selectedMonth]}: ₹${selectedMonthCumulative.toLocaleString("en-IN")}.`,
      },
      {
        title: "Expenses",
        amount: `₹${monthTotals.expense.toLocaleString("en-IN")}`,
        change: calcChange(monthTotals.expense, prevExpense),
        icon: "expense",
        currency: "INR",
        stats: [
          { label: "transactions", value: allExpenseTx.length },
          { label: "categories", value: uniqueCategories(allExpenseTx) },
        ],
        detail: `${MONTHS[selectedMonth]} ${selectedYear} spending.`,
      },
      {
        title: "Income",
        amount: `₹${monthTotals.income.toLocaleString("en-IN")}`,
        change: calcChange(monthTotals.income, prevIncome),
        icon: "income",
        currency: "INR",
        stats: [
          { label: "transactions", value: allIncomeTx.length },
          { label: "categories", value: uniqueCategories(allIncomeTx) },
        ],
        detail: `${MONTHS[selectedMonth]} ${selectedYear} earnings.`,
      },
      {
        title: "Saving",
        amount: `₹${monthTotals.savings.toLocaleString("en-IN")}`,
        change: calcChange(monthTotals.savings, prevSavings),
        icon: "saving",
        currency: "INR",
        stats: [
          { label: "transactions", value: allIncomeTx.length },
          { label: "categories", value: uniqueCategories(allIncomeTx) },
        ],
        detail: `${MONTHS[selectedMonth]} ${selectedYear} savings activity.`,
      },
    ];
  }, [bankTransactions, selectedMonth, selectedYear, allTimeTotals, monthTotals, isCurrentMonth]);

  const monthlyHistory = useMemo(() => {
    const history = [];
    for (let i = 0; i < 6; i++) {
      const targetDate = new Date(selectedYear, selectedMonth - i, 1);
      const year = targetDate.getFullYear();
      const month = targetDate.getMonth();

      const txInMonth = bankTransactions.filter((tx) => {
        const d = parseTxDate(tx.date);
        return d && d.getFullYear() === year && d.getMonth() === month;
      });

      let income = 0;
      let expense = 0;
      let savings = 0;
      txInMonth.forEach((tx) => {
        const amount = parseAmount(tx.amount);
        const type = normalizeType(tx.type);
        if (type === "Income") income += amount;
        if (type === "Expense") expense += amount;
        if (tx.category === "Savings") {
          if (type === "Expense") savings += amount;
          if (type === "Income") savings -= amount;
        }
      });

      const totalBalance = bankTransactions
        .filter((tx) => {
          const d = parseTxDate(tx.date);
          if (!d) return false;
          const txYear = d.getFullYear();
          const txMonth = d.getMonth();
          return txYear < year || (txYear === year && txMonth <= month);
        })
        .reduce((sum, tx) => {
          const amount = parseAmount(tx.amount);
          const type = normalizeType(tx.type);
          if (type === "Income") return sum + amount;
          if (type === "Expense") return sum - amount;
          return sum;
        }, 0);

      history.push({
        label: `${MONTHS[month]} ${year}`,
        income,
        expense,
        monthlyBalance: income - expense,
        totalBalance,
        savings,
        txCount: txInMonth.length,
      });
    }
    return history;
  }, [bankTransactions, selectedMonth, selectedYear]);

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

  const totalBudget = useMemo(() => budgetChartData.reduce((sum, item) => sum + item.value, 0), [budgetChartData]);

  const recentTransactions = useMemo(() => {
    return [...bankTransactions]
      .filter((item) => item?.date)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);
  }, [bankTransactions]);

  const savingsGoals = useMemo(() => {
    return [
      { title: "Hot wheels", target: 1650, percent: 25 },
      { title: "Computer", target: 60000, percent: 42 },
      { title: "New house", target: 150000, percent: 3 },
    ];
  }, []);

  const formatINR = (n) => `₹${Number(n).toLocaleString("en-IN")}`;

  return (
    <Main>
      {loading && !transactions.length ? (
        <S.LoaderWrap>
          <S.Spinner />
          <S.LoaderText>Loading your data...</S.LoaderText>
        </S.LoaderWrap>
      ) : (
      <>
      <S.TopBar>
        <S.MonthSelector>
          <S.MonthArrow onClick={() => navigateMonth(-1)} aria-label="Previous month">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
          </S.MonthArrow>
          <S.MonthLabel>{MONTHS[selectedMonth]} {selectedYear}</S.MonthLabel>
          <S.MonthArrow onClick={() => navigateMonth(1)} aria-label="Next month" disabled={isCurrentMonth}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
          </S.MonthArrow>
        </S.MonthSelector>
        <S.TopControls>
          <S.AddCardButton onClick={() => setCardModalOpen(true)}>+ Add card</S.AddCardButton>
          <S.TopRightInfo>{dashboardDateTime}</S.TopRightInfo>
        </S.TopControls>
      </S.TopBar>

      <CardsSection
        selectedCardId={selectedCard?.id || null}
        onSelectCard={handleSelectCard}
        onAddCard={() => setCardModalOpen(true)}
      />

      <SummaryCardsGrid data={isCurrentMonth ? analyticsSummaryData : dashboardSummaryData} mobileColumns={2} compactMobile />

      {/* Monthly overview table commented out
      <S.MonthHistorySection>
        <S.MonthHistoryTitle>Monthly overview</S.MonthHistoryTitle>
        <S.MonthHistoryTable>
          <thead>
            <tr>
              <th>Month</th>
              <th>Income</th>
              <th>Expense</th>
              <th>Monthly net</th>
              <th>Total balance</th>
              <th>Savings</th>
            </tr>
          </thead>
          <tbody>
            {monthlyHistory.map((row) => (
              <tr key={row.label}>
                <td>{row.label}</td>
                <td className="income">+{formatINR(row.income)}</td>
                <td className="expense">-{formatINR(row.expense)}</td>
                <td>{formatINR(row.monthlyBalance)}</td>
                <td>{formatINR(row.totalBalance)}</td>
                <td>{formatINR(row.savings)}</td>
              </tr>
            ))}
          </tbody>
        </S.MonthHistoryTable>
      </S.MonthHistorySection>
      */}

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
                  <th>Bank</th>
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
                      <td>{transaction.bank || "-"}</td>
                      <td>{transaction.category || "-"}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={5}>No transactions found</td></tr>
                )}
              </tbody>
            </S.RecentTable>
          </S.RecentTableWrap>
        </S.RecentSection>

        <S.BudgetSection>
          <S.SavingsCard>
            <S.SavingsHeader>
              <S.SavingsTitle>Saving goals</S.SavingsTitle>
              <S.RedirectButton onClick={() => navigate("/analytics")}>
                <svg width="25" height="25px"><use href="/icons.svg#arrow-up-right" /></svg>
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

      <CardSetupModal
        open={cardModalOpen}
        onClose={() => setCardModalOpen(false)}
        onSaved={() => refetchCards()}
        showSkip={false}
      />
      </>
      )}
    </Main>
  );
};

export default Dashboard;
