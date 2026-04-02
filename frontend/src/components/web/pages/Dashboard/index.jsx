import React from "react";
// import Main from "../components/templates/main";

import Main from "../../../templates/main";
// import PageHeader from "../components/web/molecules/PageHeader";
import SummaryCardsGrid from "../..//organisms/SummaryCardsGrid";
// import InsightsPanel from "../components/web/organisms/InsightsPanel";
// import Card from "../components/web/atoms/card";
// import Button from "../components/web/atoms/buttons";
import PageHeader from "../../molecules/Pageheader";
import Button from "../../atoms/buttons";
import InsightsPanel from "../../organisms/InsightsPanel";
import Card from "../../atoms/card";

import * as S from "./styles";

const summaryData = [
  {
    title: "Total Balance",
    amount: "$24,500",
    change: 12.4,
    icon: "wallet",
  },
  {
    title: "Income",
    amount: "$8,200",
    change: 6.2,
    icon: "income",
  },
  {
    title: "Expenses",
    amount: "$3,420",
    change: -4.1,
    icon: "expense",
  },
  {
    title: "Savings",
    amount: "$12,880",
    change: 8.7,
    icon: "saving",
  },
];

const insights = [
  {
    title: "Highest Spending Category",
    value: "Food",
    description: "You spent 32% more on food this month",
  },
  {
    title: "Monthly Comparison",
    value: "+12%",
    description: "Higher savings compared to last month",
  },
  {
    title: "Observation",
    value: "Stable Cash Flow",
    description: "Income exceeded expenses consistently",
  },
];

const Dashboard = () => {
  return (
    <Main>

      <SummaryCardsGrid data={summaryData} />

      <S.ChartSection>
        <Card>
          <S.ChartTitle>Balance Trend</S.ChartTitle>
          <S.ChartPlaceholder>
            Time-based chart goes here
          </S.ChartPlaceholder>
        </Card>

        <Card>
          <S.ChartTitle>Spending Breakdown</S.ChartTitle>
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