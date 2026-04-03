import React from "react";
import * as S from "./styles";
import Badge from "../../atoms/badge";

const TransactionRow = ({
  date,
  amount,
  type,
  name,
  method,
  category,
  status,
}) => {
  return (
    <S.Row>
      <td>{date}</td>

      <td className={type}>
        {type === "Income" ? "+" : "-"} ₹{amount}
      </td>

      <td>{name}</td>

      <td>{method}</td>

      <td>{category}</td>

      <td>
        <Badge type={status}>{status}</Badge>
      </td>
    </S.Row>
  );
};

export default TransactionRow;