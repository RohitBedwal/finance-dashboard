import React, { useEffect, useMemo, useState } from "react";
import * as S from "./styles";
import TransactionRow from "../../molecules/TransactionRow/index";
import Button from "../../atoms/buttons";
import Badge from "../../atoms/badge";

const TransactionsTable = ({ transactions }) => {
  const ROWS_PER_PAGE = 15;
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "desc",
  });
  const [deletedIds, setDeletedIds] = useState(new Set());

  const sortableColumns = {
    "date & time": "date",
    amount: "amount",
    "payment name": "name",
    method: "method",
    category: "category",
    status: "status",
  };

  const filteredTransactions = useMemo(() => {
    return (transactions ?? []).filter((tx) => !deletedIds.has(tx.id));
  }, [transactions, deletedIds]);

  const sortedTransactions = useMemo(() => {
    let result = [...filteredTransactions];

    if (sortConfig.key) {
      result.sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];

        if (sortConfig.key === "amount") {
          aVal = parseFloat(String(aVal).replace(/[^\d.]/g, "")) || 0;
          bVal = parseFloat(String(bVal).replace(/[^\d.]/g, "")) || 0;
        } else if (sortConfig.key === "date") {
          aVal = new Date(aVal).getTime();
          bVal = new Date(bVal).getTime();
        } else {
          aVal = String(aVal).toLowerCase();
          bVal = String(bVal).toLowerCase();
        }

        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [filteredTransactions, sortConfig]);

  const totalPages = useMemo(
    () =>
      Math.max(
        1,
        Math.ceil((sortedTransactions?.length ?? 0) / ROWS_PER_PAGE)
      ),
    [sortedTransactions]
  );

  const pageRows = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    return (sortedTransactions ?? []).slice(start, start + ROWS_PER_PAGE);
  }, [page, sortedTransactions]);

  const canPrev = page > 1;
  const canNext = page < totalPages;

  useEffect(() => {
    setPage(1);
  }, [sortedTransactions]);

  const handleSort = (columnKey) => {
    setSortConfig((prev) => {
      if (prev.key === columnKey) {
        return {
          key: columnKey,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key: columnKey, direction: "asc" };
    });
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      const newSelected = new Set(pageRows.map((txn) => txn.id));
      setSelectedIds(newSelected);
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleSelectOne = (id, checked) => {
    const newSelected = new Set(selectedIds);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedIds(newSelected);
  };

  const handleDelete = () => {
    const newDeleted = new Set([...deletedIds, ...selectedIds]);
    setDeletedIds(newDeleted);
    setSelectedIds(new Set());
  };

  const isAllSelected =
    pageRows.length > 0 && pageRows.every((txn) => selectedIds.has(txn.id));

  return (
    <S.Container>
      {/* Delete Action Bar */}
      <S.ActionBar show={selectedIds.size > 0}>
        <S.SelectionInfo>
          {selectedIds.size} transaction{selectedIds.size !== 1 ? "s" : ""}{" "}
          selected
        </S.SelectionInfo>
        <Button variant="danger" size="sm" onClick={handleDelete}>
          Delete
        </Button>
      </S.ActionBar>

      {/* Desktop Table View */}
      <S.TableScroll>
        <S.Table>
          <thead>
            <tr className="table-head">
              <th style={{ textAlign: "center", cursor: "default" }}>
                <S.StyledCheckbox
                  checked={isAllSelected}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
              <th onClick={() => handleSort("date")}>
                Date & Time
                <S.SortIcon>
                  {sortConfig.key === "date" &&
                    (sortConfig.direction === "asc" ? "↑" : "↓")}
                </S.SortIcon>
              </th>
              <th onClick={() => handleSort("amount")}>
                Amount
                <S.SortIcon>
                  {sortConfig.key === "amount" &&
                    (sortConfig.direction === "asc" ? "↑" : "↓")}
                </S.SortIcon>
              </th>
              <th onClick={() => handleSort("name")}>
                Payment Name
                <S.SortIcon>
                  {sortConfig.key === "name" &&
                    (sortConfig.direction === "asc" ? "↑" : "↓")}
                </S.SortIcon>
              </th>
              <th onClick={() => handleSort("method")}>
                Method
                <S.SortIcon>
                  {sortConfig.key === "method" &&
                    (sortConfig.direction === "asc" ? "↑" : "↓")}
                </S.SortIcon>
              </th>
              <th onClick={() => handleSort("category")}>
                Category
                <S.SortIcon>
                  {sortConfig.key === "category" &&
                    (sortConfig.direction === "asc" ? "↑" : "↓")}
                </S.SortIcon>
              </th>
              <th onClick={() => handleSort("status")}>
                Status
                <S.SortIcon>
                  {sortConfig.key === "status" &&
                    (sortConfig.direction === "asc" ? "↑" : "↓")}
                </S.SortIcon>
              </th>
            </tr>
          </thead>

          <tbody>
            {pageRows.map((txn, index) => (
              <TransactionRow
                key={`${txn.id}-${txn.date}-${txn.name}-${index}`}
                {...txn}
                checkbox={
                  <S.StyledCheckbox
                    checked={selectedIds.has(txn.id)}
                    onChange={(e) => handleSelectOne(txn.id, e.target.checked)}
                  />
                }
              />
            ))}
          </tbody>
        </S.Table>
      </S.TableScroll>

      {/* Mobile Card View */}
      <S.MobileCardWrap>
        {pageRows.map((txn, index) => (
          <S.MobileCard key={`mobile-${txn.id}-${txn.date}-${txn.name}-${index}`}>
            <S.MobileCardRow>
              <S.MobileCardField>
                <S.MobileCardLabel>Date</S.MobileCardLabel>
                <S.MobileCardValue>
                  {new Date(txn.date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                  })}
                </S.MobileCardValue>
              </S.MobileCardField>
              <S.MobileCardField>
                <S.MobileCardLabel>Amount</S.MobileCardLabel>
                <S.MobileCardValue className={txn.type}>
                  {txn.type === "Income" ? "+" : "-"} ₹{txn.amount}
                </S.MobileCardValue>
              </S.MobileCardField>
            </S.MobileCardRow>

            <S.MobileCardRow>
              <S.MobileCardField>
                <S.MobileCardLabel>Payment</S.MobileCardLabel>
                <S.MobileCardValue>{txn.name}</S.MobileCardValue>
              </S.MobileCardField>
              <S.MobileCardField>
                <S.MobileCardLabel>Method</S.MobileCardLabel>
                <S.MobileCardValue>{txn.method}</S.MobileCardValue>
              </S.MobileCardField>
            </S.MobileCardRow>

            <S.MobileCardRow>
              <S.MobileCardField>
                <S.MobileCardLabel>Category</S.MobileCardLabel>
                <S.MobileCardValue>{txn.category}</S.MobileCardValue>
              </S.MobileCardField>
              <S.MobileCardField>
                <S.MobileCardLabel>Status</S.MobileCardLabel>
                <S.MobileCardBadge>
                  <Badge type={txn.status}>{txn.status}</Badge>
                </S.MobileCardBadge>
              </S.MobileCardField>
            </S.MobileCardRow>
          </S.MobileCard>
        ))}
      </S.MobileCardWrap>

      <S.Pagination>
        <Button
          variant="primary"
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
          variant="primary"
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

