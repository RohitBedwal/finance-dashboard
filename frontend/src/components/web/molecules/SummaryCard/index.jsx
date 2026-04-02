import React from "react";
import * as S from "./styles";
import Badge from "../../atoms/badge";
// import Icon from "../../atoms/icon";

const SummaryCard = ({ title, amount, change, icon }) => {
  return (
    <S.Container>
      <S.Top>
        <S.Title>{title}</S.Title>
        {/* <Icon name={icon} /> */}
      </S.Top>

      <S.Amount>{amount}</S.Amount>

      <Badge type={change > 0 ? "success" : "danger"}>
        {change}%
      </Badge>
    </S.Container>
  );
};

export default SummaryCard;