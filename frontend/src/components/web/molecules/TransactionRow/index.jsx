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
  checkbox,
}) => {
  return (
    <S.Row>
      <S.CheckboxCell>
        {checkbox}
      </S.CheckboxCell>

      <td>
        {new Date(date).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </td>

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