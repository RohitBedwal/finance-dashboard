import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import Card from "../../atoms/card";
import Select from "../../atoms/select";
import * as S from "./styles";

const formatCurrency = (value) =>
  `₹${Number(value || 0).toLocaleString()}`;

const CustomTooltip = ({ active, payload, monthLabel, total, type }) => {
  if (!active || !payload?.length) return null;

  const item = payload[0]?.payload || {};
  const value = Number(item.value ?? 0);
  const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : "0.0";

  return (
    <S.TooltipBubble>
        <strong>{percentage}%</strong>
    </S.TooltipBubble>
  );
};

const StatisticsPieChart = ({
  monthLabel,
  type,
  onTypeChange,
  total,
  chartData,
}) => {
  return (
    <Card>
      <S.Header>
        <S.Title>Statistics</S.Title>

        <S.Actions>
          <Select
            value={type}
            onChange={(event) => onTypeChange(event.target.value)}
            options={[
              { label: "Expense", value: "Expense" },
              { label: "Income", value: "Income" },
            ]}
          />
          <S.DetailsButton type="button">Details</S.DetailsButton>
        </S.Actions>
      </S.Header>
 {/* this will be changed according to loss or profit */}
      <S.Subtitle>
        You have an increase of {type.toLowerCase()} in several categories in {monthLabel}
      </S.Subtitle>

      <S.ChartWrap>
        <ResponsiveContainer width="100%" height={369}>
          <PieChart>
            <Tooltip
              wrapperStyle={{ zIndex: 30, pointerEvents: "none" }}
              content={(props) => (
                <CustomTooltip
                  {...props}
                  monthLabel={monthLabel}
                  total={total}
                  type={type}
                />
              )}
            />
            <Pie
              data={chartData}
              dataKey="value"
              innerRadius={100}
              outerRadius={125}
              startAngle={100}
              endAngle={-260}
              paddingAngle={2}
              cornerRadius={15}
              stroke="none"
            >
              {chartData.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <S.CenterLabel>
          <p>This month {type.toLowerCase()}</p>
          <h3>
            {formatCurrency(total)}<span>.00</span>
          </h3>
        </S.CenterLabel>

        {/* <S.Callout>
          <strong>{percent}%</strong>
          <span>{formatCurrency(leadItem.value)}</span>
        </S.Callout> */}
      </S.ChartWrap>

      <S.Legend>
        {chartData.map((item) => (
          <S.LegendItem key={item.name}>
            <S.Dot style={{ background: item.color }} />
            <span>{item.name}</span>
          </S.LegendItem>
        ))}
      </S.Legend>
    </Card>
  );
};

export default StatisticsPieChart;