import React from "react";
import * as S from "./styles";
import Badge from "../../atoms/badge";

const TransactionRow = ({
  date,
  category,
  amount,
  type,
}) => {
  return (
    <S.Row>
      <td>{date}</td>
      <td>{category}</td>
      <td>{amount}</td>
      <td>
        <Badge type={type === "income" ? "success" : "danger"}>
          {type}
        </Badge>
      </td>
    </S.Row>
  );
};

export default TransactionRow;