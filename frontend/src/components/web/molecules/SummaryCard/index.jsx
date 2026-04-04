import React from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./styles";
import Badge from "../../atoms/badge";

const SummaryCard = ({ title, amount, change }) => {
  const navigate = useNavigate();

  const isPositive = change >= 0;

  return (
    <S.Container>
      <S.Top>
        <S.Title>{title}</S.Title>

        <S.RedirectButton
          onClick={() => navigate("/analytics")}
        >
          <svg width="25" height="25px">
            <use href="/icons.svg#arrow-up-right" />
          </svg>
        </S.RedirectButton>
      </S.Top>

      <S.Amount>
        {amount}
        <span>.00</span>
      </S.Amount>

      <S.ChangeRow>
        <Badge type={isPositive ? "success" : "danger"}>
          <svg width="12" height="12">
            <use
              href={`/icons.svg#${
                isPositive
                  ? "arrow-up"
                  : "arrow-down"
              }`}
            />
          </svg>

          {Math.abs(change)}%
        </Badge>

        <S.ChangeText>vs last month</S.ChangeText>
      </S.ChangeRow>
    </S.Container>
  );
};

export default SummaryCard;