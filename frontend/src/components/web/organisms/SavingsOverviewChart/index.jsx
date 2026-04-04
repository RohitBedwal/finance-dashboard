import React, { useMemo } from "react";
import {
  Area,
  ComposedChart,
  CartesianGrid,
  Line,
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


const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  const data = payload[0].payload;

  const current = data.current ?? 0;
  const compare = data.compare ?? 0;

  return (
    <S.TooltipBubble>
      <S.TooltipTitle>{label}</S.TooltipTitle>

      <S.TooltipRow>
        <span>{data.currentYear}</span>
        <strong>{formatCurrency(current)}</strong>
      </S.TooltipRow>

      <S.TooltipRow>
        <span>{data.compareYear}</span>
        <strong>{formatCurrency(compare)}</strong>
      </S.TooltipRow>
    </S.TooltipBubble>
  );
};

const SavingsOverviewChart = ({
  currentYear,
  compareYear,
  years,
  months,
  currentSeries,
  compareSeries,
  onCompareYearChange,
}) => {
  const chartData = useMemo(() => {
    return months.map((month, index) => ({
      month,
      current: currentSeries[index] ?? 0,
      compare: compareSeries[index] ?? 0,
      currentYear,
      compareYear,
    }));
  }, [months, currentSeries, compareSeries, currentYear, compareYear]);

  const compareYearOptions = useMemo(
    () => years.filter((year) => year !== currentYear),
    [years, currentYear]
  );

  return (
    <Card>
      <AnalyticsHeader title="Savings overview">
        <LegendItem label={String(currentYear)} color="var(--primary-600)" />
        <LegendItem
          label={String(compareYear)}
          color="var(--primary-400)"
          dashed
        />
        <YearSelect
          value={compareYear}
          years={compareYearOptions}
          onChange={onCompareYearChange}
          labels={{ [compareYear]: `Compare (${compareYear})` }}
          ariaLabel="Select comparison savings year"
        />
      </AnalyticsHeader>

      <S.ChartWrap>
        <ResponsiveContainer width="100%" height={170}>
          <ComposedChart data={chartData} margin={{ top: 8, right: 8, left: 4, bottom: 4 }}>
            <defs>
              <linearGradient id="savingsFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary-600)" stopOpacity={0.2} />
                <stop offset="95%" stopColor="var(--primary-600)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="var(--gray-100)" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--gray-300)", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--gray-300)", fontSize: 12 }}
              tickFormatter={(value) => `₹${Math.round(value / 1000)}k`}
              width={30}
            />
            <Tooltip cursor={{ stroke: "var(--gray-300)", strokeDasharray: "4 4" }} content={<CustomTooltip />} />
            <Area type="monotone" dataKey="current" stroke="none" fill="url(#savingsFill)" />
            <Line type="monotone" dataKey="compare" stroke="var(--primary-400)" strokeWidth={2.5} strokeDasharray="6 6" dot={false} />
            <Line type="monotone" dataKey="current" stroke="var(--primary-600)" strokeWidth={2} dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </S.ChartWrap>
    </Card>
  );
};

export default SavingsOverviewChart;
