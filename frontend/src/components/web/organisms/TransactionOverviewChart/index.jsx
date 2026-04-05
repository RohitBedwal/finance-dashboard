import React, { useMemo } from "react";
import {
  LineChart,
  Line,
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

const formatCurrency = (value) => `₹${Number(value).toLocaleString()}`;

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

const CustomTooltip = ({ active, payload, label, monthLabel }) => {
  if (!active || !payload?.length) return null;

  const data = payload[0]?.payload || {};
  const income = data.income ?? 0;
  const expense = Math.abs(data.expense ?? 0);

  return (
    <S.TooltipBubble>
      <S.TooltipTitle>{`${label} ${monthLabel}`}</S.TooltipTitle>

      <S.TooltipRow>
        <span>Income</span>
        <strong>{`+${formatCurrency(income)}`}</strong>
      </S.TooltipRow>

      <S.TooltipRow>
        <span>Expense</span>
        <strong>{`-${formatCurrency(expense)}`}</strong>
      </S.TooltipRow>
    </S.TooltipBubble>
  );
};

const TransactionOverviewChart = ({
  currentYear,
  currentMonth,
  transactions,
  onCurrentMonthChange,
}) => {
  const monthIndex = Number.isInteger(currentMonth) ? currentMonth : new Date().getMonth();
  const monthLabel = new Date(currentYear, monthIndex, 1).toLocaleString("en-IN", {
    month: "short",
  });

  const monthOptions = useMemo(() => Array.from({ length: 12 }, (_, index) => index), []);

  const monthLabels = useMemo(() => {
    return monthOptions.reduce((acc, index) => {
      acc[index] = new Date(currentYear, index, 1).toLocaleString("en-IN", { month: "short" });
      return acc;
    }, {});
  }, [monthOptions, currentYear]);

  const chartData = useMemo(() => {
    const daysInMonth = new Date(currentYear, monthIndex + 1, 0).getDate();
    const groupedByTwoDays = Array.from({ length: Math.ceil(daysInMonth / 2) }, (_, index) => ({
      day: `${(index * 2) + 1}`,
      income: 0,
      expense: 0,
    }));

    transactions.forEach((txn) => {
      if (!txn.date) return;

      const txnDate = new Date(txn.date);
      if (Number.isNaN(txnDate.getTime())) return;
      if (txnDate.getFullYear() !== currentYear) return;
      if (txnDate.getMonth() !== monthIndex) return;

      const dayIndex = txnDate.getDate() - 1;
      const groupIndex = Math.floor(dayIndex / 2);
      if (groupIndex < 0 || groupIndex >= groupedByTwoDays.length) return;

      const amount = parseAmount(txn.amount);
      const type = normalizeType(txn.type);

      if (type === "Income") {
        groupedByTwoDays[groupIndex].income += amount;
      }

      if (type === "Expense") {
        groupedByTwoDays[groupIndex].expense += amount;
      }
    });

    return groupedByTwoDays;
  }, [transactions, currentYear, monthIndex]);

  return (
    <Card>
      <AnalyticsHeader title="Transaction overview">
        <LegendItem label="Income" color="var(--success-800)" />
        <LegendItem label="Expense" color="var(--danger-500)" />
        <YearSelect
          value={monthIndex}
          years={monthOptions}
          onChange={onCurrentMonthChange}
          labels={monthLabels}
          ariaLabel="Select transaction month"
        />
      </AnalyticsHeader>

      <S.ChartWrap>
        <ResponsiveContainer width="100%" height={170}>
          <LineChart data={chartData} margin={{ top: 8, right: 8, left: 4, bottom: 4 }}>
            <CartesianGrid stroke="var(--gray-100)" vertical={false} />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--gray-300)", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--gray-300)", fontSize: 12 }}
              tickFormatter={(value) => `₹${Math.round(Math.abs(value) / 1000)}k`}
              width={30}
            />
            <Tooltip
              cursor={{ stroke: "var(--gray-300)", strokeDasharray: "4 4" }}
              content={<CustomTooltip monthLabel={monthLabel} />}
            />
            <Line
              type="monotone"
              dataKey="income"
              stroke="var(--success-800)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="expense"
              stroke="var(--danger-500)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </S.ChartWrap>
    </Card>
  );
};

export default TransactionOverviewChart;
