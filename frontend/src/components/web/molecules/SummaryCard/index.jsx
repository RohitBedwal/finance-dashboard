import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as S from "./styles";
import Badge from "../../atoms/badge";

const SummaryCard = ({
  title,
  amount,
  change,
  detail,
  cardLast4,
  currency = "INR",
  stats,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isPositive = change >= 0;
  const isAnalyticsPage = location.pathname === "/analytics";

  return (
    <S.Container $isDetailed={isAnalyticsPage}>
      <S.Top>
        <S.Title $isDetailed={isAnalyticsPage}>{title}</S.Title>

        {isAnalyticsPage ? (
          <S.CurrencyChip>{`${currency} `}</S.CurrencyChip>
        ) : (
          <S.RedirectButton
            onClick={() => navigate("/analytics")}
          >
            <svg width="25" height="25px">
              <use href="/icons.svg#arrow-up-right" />
            </svg>
          </S.RedirectButton>
        )}
      </S.Top>

      <S.Amount $isDetailed={isAnalyticsPage}>
        {amount}
        <span>.00</span>
      </S.Amount>

      {isAnalyticsPage ? (
        <>
          <S.AnalyticsRow>
            <S.ChangeRow $isDetailed={isAnalyticsPage}>
              <Badge type={isPositive ? "success" : "danger"}>
                {isPositive ? "↑" : "↓"} {Math.abs(change)}%
              </Badge>
              {detail ? <S.Detail $isDetailed={isAnalyticsPage}>{detail}</S.Detail> : null}
            </S.ChangeRow>

            <S.StatPills>
              {(stats || []).slice(0, 2).map((item, index) => (
                <S.StatPill key={`${item.label}-${index}`}>
                  <S.PillIcon>{index === 0 ? "↔" : "◫"}</S.PillIcon>
                  <span>{`${item.value} ${item.label}`}</span>
                </S.StatPill>
              ))}
            </S.StatPills>
          </S.AnalyticsRow>

          {/* {title === "Total Balance" && cardLast4 ? (
            <S.CardMeta $isDetailed={isAnalyticsPage}>{`Card •••• ${String(cardLast4).slice(-4)}`}</S.CardMeta>
          ) : null} */}

          
        </>
      ) : (
        <S.ChangeRow $isDetailed={isAnalyticsPage}>
          <Badge type={isPositive ? "success" : "danger"}>
            {isPositive ? "↑" : "↓"} {Math.abs(change)}%
          </Badge>

          <S.ChangeText $isDetailed={isAnalyticsPage}>vs last month</S.ChangeText>
        </S.ChangeRow>
      )}
    </S.Container>
  );
};

export default SummaryCard;