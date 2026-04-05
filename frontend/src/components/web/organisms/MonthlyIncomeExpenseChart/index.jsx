import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Card from "../../atoms/card";
import AnalyticsHeader from "../../molecules/AnalyticsHeader";
import LegendItem from "../../molecules/LegendItem";
import YearSelect from "../../molecules/YearSelect";
import * as S from "./styles";

const formatCurrency = (value) =>
  `₹${Number(value).toLocaleString()}`;
const CustomTooltip = ({ active, payload, label, year }) => {
  if (!active || !payload?.length) return null;

  return (
    <S.TooltipBubble>
      <S.TooltipTitle>{label}</S.TooltipTitle>

      {payload.map((entry, index) => {
        const isIncome = entry.dataKey === "income";

        return (
          <S.TooltipRow key={index}>
            <span>
              {isIncome ? "Income" : "Expense"} ({year})
            </span>

            <strong>
              {formatCurrency(entry.value)}
            </strong>
          </S.TooltipRow>
        );
      })}
    </S.TooltipBubble>
  );
};
const MonthlyIncomeExpenseChart = ({
  year,
  years,
  onYearChange,
  monthlyData,

}) => {
  return (
    <Card>
      <AnalyticsHeader title="Money flow">
        <LegendItem label="Income" color="var(--primary-600)" />
        <LegendItem label="Expense" color="var(--primary-400)" />

        <YearSelect
          value={year}
          years={years}
          onChange={onYearChange}
          ariaLabel="Select money flow year"
        />
      </AnalyticsHeader>

      <S.ChartArea>
        <ResponsiveContainer width="100%" height={170}>
          <BarChart data={monthlyData} >
            <CartesianGrid
              stroke="var(--chart-grid-stroke)"
              vertical={false}
              
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--muted-text)", fontSize: 12 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) =>
                `₹${Math.round(v / 1000)}k`
              }
              tick={{ fill: "var(--muted-text)", fontSize: 12 }}
               width={30}
            />

                <Tooltip
                // shared={false}
                cursor={{ fill: "transparent" }}
                  content={(props) => (
                    <CustomTooltip {...props} year={year} />
                  )}
                />

            <Bar
              dataKey="income"
              fill="var(--primary-600)"
              radius={[30, 30, 0, 0]}
              maxBarSize={22}
            />

            <Bar
              dataKey="expense"
              fill="var(--primary-400)"
              radius={[30, 30, 0, 0]}
              maxBarSize={22}
            />
          </BarChart>
        </ResponsiveContainer>
      </S.ChartArea>
    </Card>
  );
};

export default MonthlyIncomeExpenseChart;