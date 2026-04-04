import React from "react";
import styled from "styled-components";
import { useTransactionFilters } from "../../../../context/TransactionFilterContext";
import Select from "../../atoms/select";

const Bar = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 12px;

  animation: slideDown 0.25s ease forwards;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const FilterItem = styled.div`
  min-width: 140px;
`;

const ResetButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 0;
  background: transparent;
  color: var(--primary-600);
  font-size: var(--fs-sm);
  font-weight: var(--fw-medium);
  cursor: pointer;
`;

const defaultTypeOptions = [
  { value: "Income", label: "Income" },
  { value: "Expense", label: "Expense" },
];

const defaultAmountOptions = [
  { value: "1-200", label: "1–200" },
  { value: "200-500", label: "200–500" },
  { value: "500-1000", label: "500–1000" },
  { value: "1000+", label: "1000+" },
];


const defaultMethodOptions = [
  { value: "Card", label: "Card" },
  { value: "UPI", label: "UPI" },
  { value: "Cash", label: "Cash" },
];

const defaultCategoryOptions = [
  { value: "Food", label: "Food" },
  { value: "Refund", label: "Refund" },
  { value: "Cashback", label: "Cashback" },
  { value: "Movie", label: "Movie" },
];

const defaultStatusOptions = [
  { value: "Successful", label: "Successful" },
  { value: "Pending", label: "Pending" },
  { value: "Failed", label: "Failed" },
];

const TransactionFiltersBar = ({
  filters: controlledFilters,
  setFilters: controlledSetFilters,
  typeOptions = defaultTypeOptions,
  amountOptions = defaultAmountOptions,
  methodOptions = defaultMethodOptions,
  categoryOptions = defaultCategoryOptions,
  statusOptions = defaultStatusOptions,
  typePlaceholder = "Type",
  amountPlaceholder = "Amount",
  methodPlaceholder = "Method",
  categoryPlaceholder = "Category",
  statusPlaceholder = "Status",
  showType = true,
  showAmount = true,
  showMethod = true,
  showCategory = true,
  showStatus = true,
}) => {
  const context = useTransactionFilters();
  const filters = controlledFilters || context.filters;
  const setFilters = controlledSetFilters || context.setFilters;
  const resetAll = () => {
    setFilters({
      type: null,
      amount: null,
      currency: null,
      method: null,
      category: null,
      status: null,
    });
  };

  return (
    <Bar>
      {showType && (
        <FilterItem>
          <Select
            placeholder={typePlaceholder}
            options={typeOptions}
            value={filters.type?.value || ""}
            isClearable
            onChange={(_, selected) =>
              setFilters((prev) => ({ ...prev, type: selected || null }))
            }
          />
        </FilterItem>
      )}

      {showAmount && (
        <FilterItem>
          <Select
            placeholder={amountPlaceholder}
            options={amountOptions}
            value={filters.amount?.value || ""}
            isClearable
            onChange={(_, selected) =>
              setFilters((prev) => ({ ...prev, amount: selected || null }))
            }
          />
        </FilterItem>
      )}

      {showMethod && (
        <FilterItem>
          <Select
            placeholder={methodPlaceholder}
            options={methodOptions}
            value={filters.method?.value || ""}
            isClearable
            onChange={(_, selected) =>
              setFilters((prev) => ({ ...prev, method: selected || null }))
            }
          />
        </FilterItem>
      )}

      {showCategory && (
        <FilterItem>
          <Select
            placeholder={categoryPlaceholder}
            options={categoryOptions}
            value={filters.category?.value || ""}
            isClearable
            onChange={(_, selected) =>
              setFilters((prev) => ({ ...prev, category: selected || null }))
            }
          />
        </FilterItem>
      )}

      {showStatus && (
        <FilterItem>
          <Select
            placeholder={statusPlaceholder}
            options={statusOptions}
            value={filters.status?.value || ""}
            isClearable
            onChange={(_, selected) =>
              setFilters((prev) => ({ ...prev, status: selected || null }))
            }
          />
        </FilterItem>
      )}

      <ResetButton onClick={resetAll} type="button">
        ↻
        <span>Reset all</span>
      </ResetButton>
    </Bar>
  );
};

export default TransactionFiltersBar;