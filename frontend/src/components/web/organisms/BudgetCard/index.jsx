import React from "react";
import { Cell, Pie, PieChart } from "recharts";
import Card from "../../atoms/card";
import * as S from "./styles";

const formatCurrency = (value) => `₹${Number(value || 0).toLocaleString()}`;

const BudgetCard = ({ title, spent, budget, status = "on track", onEditClick }) => {
  const spentAmount = Number(spent || 0);
  const budgetAmount = Number(budget || 0);
  const leftAmount = Math.max(0, budgetAmount - spentAmount);
  const progress = budgetAmount > 0 ? Math.min(100, Math.round((spentAmount / budgetAmount) * 100)) : 0;
  const spentData = [{ name: "Spent", value: spentAmount, color: "var(--primary-600)" }];
  const backgroundData = [{ name: "Budget", value: budgetAmount || 1, color: "var(--surface-hover)" }];
  const statusText = String(status || "on track").toLowerCase();
  const isDanger = statusText === "over budget";
  const isWarning = statusText !== "on track" && !isDanger;

  return (
    <Card>
      <S.Header>
        <S.Title>{title}</S.Title>
        <S.ActionButton type="button" aria-label="Edit budget" onClick={onEditClick}>
          <svg width="18" height="18">
            <use href="/icons.svg#dots-vertical" />
          </svg>
        </S.ActionButton>
      </S.Header>

      <S.Content>
        <S.ProgressWrap>
          <S.RingWrap>
            <PieChart width={120} height={120}>
              <Pie
                data={backgroundData}
                dataKey="value"
                innerRadius={50}
                outerRadius={60}
                startAngle={90}
                endAngle={-270}
                stroke="none"
              >
                {backgroundData.map((item) => (
                  <Cell key={item.name} fill={item.color} />
                ))}
              </Pie>

              <Pie
                data={spentData}
                dataKey="value"
                innerRadius={50}
                outerRadius={60}
                startAngle={90}
                endAngle={90 - (progress / 100) * 360}
                stroke="none"
                cornerRadius={12}
                paddingAngle={0}
              >
                {spentData.map((item) => (
                  <Cell key={item.name} fill={item.color} />
                ))}
              </Pie>
            </PieChart>

            <S.ProgressInner>
              <span>{progress}% spent</span>
              <strong>{formatCurrency(spentAmount)}</strong>
            </S.ProgressInner>
          </S.RingWrap>
        </S.ProgressWrap>

        <S.BudgetMeta>
          <p>Left</p>
          <h4>
            {formatCurrency(leftAmount)}
            <span style={{fontSize:"30px", color:"var(--gray-200)"}}>.00</span>
            <span>/{formatCurrency(budgetAmount)}</span>
          </h4>
          <S.Status $warning={isWarning} $danger={isDanger}>{status}</S.Status>
        </S.BudgetMeta>
      </S.Content>
    </Card>
  );
};

export default BudgetCard;
