import React from "react";
import Card from "../../atoms/card";
import Select from "../../atoms/select";
import * as S from "./styles";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const formatCurrency = (value) => {
  const amount = Number(value || 0);
  if (amount === 0) return "";

  return `₹${amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const formatTotalCurrency = (value) => {
  const amount = Number(value || 0);
  return `₹${amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const YearlyCalendarTable = ({
  year,
  years,
  onYearChange,
  incomeRows,
  expenseRows,
  incomeTotals,
  expenseTotals,
  yearlyIncomeTotal,
  yearlyExpenseTotal,
  yearlyBalanceTotal,
}) => {
  const renderSectionTable = (heading, rows, totals) => (
    <S.Section>
      <S.SectionTitle>{heading}</S.SectionTitle>
      <S.TableWrap>
        <S.Table>
          <thead>
            <tr>
              <th>Category</th>
              {MONTHS.map((month) => (
                <th key={month}>{month}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name}>
                <td>{row.name}</td>
                {row.monthly.map((value, monthIndex) => (
                  <td key={`${row.name}-${monthIndex}`}>{formatCurrency(value)}</td>
                ))}
              </tr>
            ))}
            <tr>
              <td>Total</td>
              {totals.map((value, monthIndex) => (
                <td key={`total-${heading}-${monthIndex}`}>{formatCurrency(value)}</td>
              ))}
            </tr>
          </tbody>
        </S.Table>
      </S.TableWrap>
    </S.Section>
  );

  return (
    <Card>
      <S.Header>
        <S.Title>Yearly Calendar</S.Title>
        <S.Actions>
          <Select
            value={String(year)}
            onChange={(event) => onYearChange(Number(event.target.value))}
            options={years.map((item) => ({
              label: String(item),
              value: String(item),
            }))}
          />
        </S.Actions>
      </S.Header>

      {renderSectionTable("INCOME", incomeRows, incomeTotals)}
      {renderSectionTable("EXPENSE", expenseRows, expenseTotals)}

      <S.SummaryGrid>
        <S.SummaryItem>
          <span>Income Total</span>
          <strong>{formatTotalCurrency(yearlyIncomeTotal)}</strong>
        </S.SummaryItem>
        <S.SummaryItem>
          <span>Expense Total</span>
          <strong>{formatTotalCurrency(yearlyExpenseTotal)}</strong>
        </S.SummaryItem>
        <S.SummaryItem>
          <span>Total Balance</span>
          <strong>{formatTotalCurrency(yearlyBalanceTotal)}</strong>
        </S.SummaryItem>
      </S.SummaryGrid>
    </Card>
  );
};

export default YearlyCalendarTable;