import React from "react";
import Select from "react-select";
import styled from "styled-components";
import { useTransactionFilters } from "../../../../context/TransactionFilterContext";

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

const customSelectStyles = {
  control: (base, state) => ({
    ...base,
    borderRadius: 999,
    minHeight: 40,
    padding: "0 6px",
    borderColor: state.hasValue ? "var(--primary-600)" : "var(--gray-200)",
    backgroundColor: state.hasValue
      ? "var(--primary-100)"
      : "var(--white)",
    boxShadow: "none",
    fontSize: "14px",
    "&:hover": {
      borderColor: state.hasValue ? "var(--primary-600)" : "var(--gray-300)",
    },
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "0 8px",
  }),
  singleValue: (base) => ({
    ...base,
    color: "var(--primary-600)",
    fontWeight: "var(--fw-medium)",
  }),
  placeholder: (base) => ({
    ...base,
    color: "var(--gray-500)",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    padding: "0 6px",
    color: "var(--gray-500)",
    display: state.hasValue ? "none" : "flex",
  }),
  clearIndicator: (base) => ({
    ...base,
    padding: "0 6px",
    color: "var(--primary-600)",
    cursor: "pointer",
    ":hover": {
      color: "var(--primary-700)",
    },
  }),
  menu: (base) => ({
    ...base,
    zIndex: "var(--dropdown-z-index)",
  }),
  menuPortal: (base) => ({
    ...base,
    zIndex: "var(--drawer-close-z-index)",
  }),
};

const typeOptions = [
  { value: "Income", label: "Income" },
  { value: "Expense", label: "Expense" },
];

const amountOptions = [
  { value: "1-200", label: "1–200" },
  { value: "200-500", label: "200–500" },
  { value: "500-1000", label: "500–1000" },
  { value: "1000+", label: "1000+" },
];


const methodOptions = [
  { value: "Card", label: "Card" },
  { value: "UPI", label: "UPI" },
  { value: "Cash", label: "Cash" },
];

const categoryOptions = [
  { value: "Food", label: "Food" },
  { value: "Refund", label: "Refund" },
  { value: "Cashback", label: "Cashback" },
  { value: "Movie", label: "Movie" },
];

const statusOptions = [
  { value: "Successful", label: "Successful" },
  { value: "Pending", label: "Pending" },
  { value: "Failed", label: "Failed" },
];

const TransactionFiltersBar = () => {
  const { filters, setFilters } = useTransactionFilters();
  const menuPortalTarget = typeof document !== "undefined" ? document.body : null;

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
      <FilterItem>
        <Select
          placeholder="Type"
          styles={customSelectStyles}
          menuPortalTarget={menuPortalTarget}
          menuPosition="fixed"
          options={typeOptions}
          value={filters.type}
          isClearable
          onChange={(selected) =>
            setFilters((prev) => ({ ...prev, type: selected }))
          }
        />
      </FilterItem>

      <FilterItem>
        <Select
          placeholder="Amount"
          styles={customSelectStyles}
          menuPortalTarget={menuPortalTarget}
          menuPosition="fixed"
          options={amountOptions}
          value={filters.amount}
          isClearable
          onChange={(selected) =>
            setFilters((prev) => ({ ...prev, amount: selected }))
          }
        />
      </FilterItem>

      <FilterItem>
        <Select
          placeholder="Method"
          styles={customSelectStyles}
          menuPortalTarget={menuPortalTarget}
          menuPosition="fixed"
          options={methodOptions}
          value={filters.method}
          isClearable
          onChange={(selected) =>
            setFilters((prev) => ({ ...prev, method: selected }))
          }
        />
      </FilterItem>

      <FilterItem>
        <Select
          placeholder="Category"
          styles={customSelectStyles}
          menuPortalTarget={menuPortalTarget}
          menuPosition="fixed"
          options={categoryOptions}
          value={filters.category}
          isClearable
          onChange={(selected) =>
            setFilters((prev) => ({ ...prev, category: selected }))
          }
        />
      </FilterItem>

      <FilterItem>
        <Select
          placeholder="Status"
          styles={customSelectStyles}
          menuPortalTarget={menuPortalTarget}
          menuPosition="fixed"
          options={statusOptions}
          value={filters.status}
          isClearable
          onChange={(selected) =>
            setFilters((prev) => ({ ...prev, status: selected }))
          }
        />
      </FilterItem>

      <ResetButton onClick={resetAll} type="button">
        ↻
        <span>Reset all</span>
      </ResetButton>
    </Bar>
  );
};

export default TransactionFiltersBar;