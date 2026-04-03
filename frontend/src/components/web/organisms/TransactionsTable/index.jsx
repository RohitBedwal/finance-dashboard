import React, { useEffect, useMemo, useState } from "react";
import * as S from "./styles";
import TransactionRow from "../../molecules/TransactionRow/index";
import Button from "../../atoms/buttons";

const TransactionsTable = ({ transactions }) => {
  const ROWS_PER_PAGE = 15;
  const [page, setPage] = useState(1);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil((transactions?.length ?? 0) / ROWS_PER_PAGE)),
    [transactions]
  );

  const pageRows = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    return (transactions ?? []).slice(start, start + ROWS_PER_PAGE);
  }, [page, transactions]);

  const canPrev = page > 1;
  const canNext = page < totalPages;

  useEffect(() => {
    setPage(1);
  }, [transactions]);

  return (
    <S.Container>
      <S.TableScroll>
        <S.Table>
          <thead>
            <tr className="table-head">
              <th>Date & Time</th>
              <th>Amount</th>
              <th>Payment Name</th>
              <th>Method</th>
              <th>Category</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {pageRows.map((txn, index) => (
              <TransactionRow
                key={`${txn.id}-${txn.date}-${txn.name}-${index}`}
                {...txn}
              />
            ))}
          </tbody>
        </S.Table>
      </S.TableScroll>

      <S.Pagination>
        <Button
          variant="secondary"
          size="sm"
          disabled={!canPrev}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Prev
        </Button>

        <S.PageInfo>
          Page {page} of {totalPages}
        </S.PageInfo>

        <Button
          variant="secondary"
          size="sm"
          disabled={!canNext}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        >
          Next
        </Button>
      </S.Pagination>
    </S.Container>
  );
};

export default TransactionsTable;