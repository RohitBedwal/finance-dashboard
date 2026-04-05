import React from "react";
import { useNavigate } from "react-router-dom";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import Card from "../../atoms/card";
import * as S from "./styles";

const formatCurrency = (value) =>
  `₹${Number(value || 0).toLocaleString()}`;

const CustomTooltip = ({ active, payload, total }) => {
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

const BudgetOverviewCard = ({
  monthLabel = "this month",
  type = "Budget",
  total = 0,
  chartData = [],
}) => {
  const navigate = useNavigate();

  return (
    <Card>
      <S.Header>
        <S.Title>Budget</S.Title>

        <S.Actions>
          <S.DetailsButton type="button" onClick={() => navigate("/budget")}>Details</S.DetailsButton>
        </S.Actions>
      </S.Header>
 {/* this will be changed according to loss or profit */}
        <S.Container>

      <S.Legend>
        {chartData.map((item) => (
            <S.LegendItem key={item.name}>
            <S.Dot style={{ background: item.color }} />
            <span>{item.name}</span>
          </S.LegendItem>
        ))}
      </S.Legend>
      <S.ChartWrap>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Tooltip
              wrapperStyle={{ zIndex: 30, pointerEvents: "none" }}
              content={(props) => (
                  <CustomTooltip
                  {...props}
                  total={total}
                  />
                )}
                />
            <Pie
              data={chartData}
              dataKey="value"
              innerRadius={73}
              outerRadius={90}
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
          <p>Total budget</p>
          <h3>
            {formatCurrency(total)}<span>.00</span>
          </h3>
        </S.CenterLabel>

        {/* <S.Callout>
          <strong>{percent}%</strong>
          <span>{formatCurrency(leadItem.value)}</span>
          </S.Callout> */}
      </S.ChartWrap>

        </S.Container>
    </Card>
  );
};

export default BudgetOverviewCard;