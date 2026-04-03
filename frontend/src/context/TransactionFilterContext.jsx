import React, { createContext, useContext, useEffect, useState } from "react";

const FilterContext = createContext();

export const TransactionFilterProvider = ({ children }) => {
  const [filtersOpen, setFiltersOpen] = useState(
    JSON.parse(localStorage.getItem("filtersOpen")) || false
  );

  const [filters, setFilters] = useState(
    JSON.parse(localStorage.getItem("transactionFilters")) || {
      type: null,
      amount: null,
      currency: null,
      method: null,
      category: null,
      status: null,
    }
  );

  useEffect(() => {
    localStorage.setItem("filtersOpen", JSON.stringify(filtersOpen));
  }, [filtersOpen]);

  useEffect(() => {
    localStorage.setItem("transactionFilters", JSON.stringify(filters));
  }, [filters]);

  return (
    <FilterContext.Provider
      value={{
        filtersOpen,
        setFiltersOpen,
        filters,
        setFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useTransactionFilters = () => useContext(FilterContext);