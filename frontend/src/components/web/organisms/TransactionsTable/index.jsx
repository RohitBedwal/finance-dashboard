import React from "react";
import * as S from "./styles";
import TransactionRow from "../../molecules/TransactionRow";

const TransactionsTable = ({ transactions }) => {
  return (
    <S.Container>
      <S.Table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Type</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((txn) => (
            <TransactionRow key={txn.id} {...txn} />
          ))}
        </tbody>
      </S.Table>
    </S.Container>
  );
};

export default TransactionsTable;