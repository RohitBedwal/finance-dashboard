import React from "react";
import Main from "../../../templates/main";
import SummaryCardsGrid from "../../organisms/SummaryCardsGrid";
import MonthlyIncomeExpenseChart from "../../organisms/MonthlyIncomeExpenseChart";
import SavingsOverviewChart from "../../organisms/SavingsOverviewChart";
import StatisticsPieChart from "../../organisms/StatisticsPieChart";
import * as S from "./styles";
import { useAnalyticsData } from "./useAnalyticsData";

const Analytics = () => {
  const {
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
    halfYearMonths,
    summaryData,
    monthlyBarData,
    selectedSavingsSeries,
    compareSavingsSeries,
  } = useAnalyticsData();

  return (
    <Main>
      <SummaryCardsGrid data={summaryData} />

      <S.ChartGrid>
        <S.LeftCharts>
          <MonthlyIncomeExpenseChart
            year={moneyFlowYear}
            years={years}
            onYearChange={setMoneyFlowYear}
            monthlyData={monthlyBarData}
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
    </Main>
  );
};

export default Analytics;
