import React, { useEffect, useState } from "react";
import Main from "../../../templates/main";
import SummaryCardsGrid from "../../organisms/SummaryCardsGrid";
import TransactionOverviewChart from "../../organisms/TransactionOverviewChart";
import SavingsOverviewChart from "../../organisms/SavingsOverviewChart";
import StatisticsPieChart from "../../organisms/StatisticsPieChart";
import YearlyCalendarTable from "../../organisms/YearlyCalendarTable";
import * as S from "./styles";
import { useAnalyticsData } from "./useAnalyticsData";
import { getItem, subscribeStorage } from "../../../../utils/localStorage";

const Analytics = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionYear, setTransactionYear] = useState(new Date().getFullYear());
  const [transactionMonth, setTransactionMonth] = useState(new Date().getMonth());

  useEffect(() => {
    const loadTransactions = () => {
      setTransactions(getItem("transactions") || []);
    };

    loadTransactions();
    return subscribeStorage(loadTransactions);
  }, []);

  const {
    years,
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
    selectedSavingsSeries,
    compareSavingsSeries,
  } = useAnalyticsData();

  const analyticsSummaryData = summaryData.filter((card) => card.title !== "Saving");

  return (
    <Main>
      <SummaryCardsGrid data={analyticsSummaryData} columns={3} />

      <S.ChartGrid>
        <S.LeftCharts>
          <TransactionOverviewChart
            currentYear={transactionYear}
            currentMonth={transactionMonth}
            transactions={transactions}
            onCurrentMonthChange={setTransactionMonth}
          />

          <SavingsOverviewChart
            currentYear={savingsYear}
            compareYear={compareYear}
            years={years}
            months={halfYearMonths}
            currentSeries={selectedSavingsSeries}
            compareSeries={compareSavingsSeries}
            onCompareYearChange={setCompareYear}
          />
        </S.LeftCharts>

        <StatisticsPieChart
          monthLabel={statisticsMonthLabel}
          type={statisticsType}
          onTypeChange={setStatisticsType}
          total={statisticsTotal}
          chartData={statisticsData}
        />
      </S.ChartGrid>

      <S.BottomSection>
        <YearlyCalendarTable
          year={transactionYear}
          years={years}
          onYearChange={setTransactionYear}
          incomeRows={yearlyIncomeRows}
          expenseRows={yearlyExpenseRows}
          incomeTotals={yearlyIncomeTotals}
          expenseTotals={yearlyExpenseTotals}
          yearlyIncomeTotal={yearlyIncomeTotal}
          yearlyExpenseTotal={yearlyExpenseTotal}
          yearlyBalanceTotal={yearlyBalanceTotal}
        />
      </S.BottomSection>
    </Main>
  );
};

export default Analytics;
