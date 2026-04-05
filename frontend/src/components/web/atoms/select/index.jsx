import React from "react";
import ReactSelect from "react-select";
import * as S from "./styles";

const customStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: 40,
    borderRadius: 999,
    borderColor: state.isFocused ? "var(--primary-600)" : "var(--gray-200)",
    backgroundColor: state.hasValue ? "var(--color-bg)" : "var(--color-bg)",
    boxShadow: "none",
    cursor: "pointer",
    padding: "0 6px",
    fontFamily: "var(--font-primary)",
    ":hover": {
      borderColor: state.isFocused ? "var(--primary-600)" : "var(--gray-300)",
    },
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "0 8px",
  }),
  singleValue: (base) => ({
    ...base,
    color: "var(--text-color)",
    fontSize: "var(--fs-sm)",
    fontWeight: "var(--fw-medium)",
  }),
  placeholder: (base) => ({
    ...base,
    color: "var(--muted-text)",
    fontSize: "var(--fs-sm)",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "var(--muted-text)",
    padding: "0 6px",
  }),
  menu: (base) => ({
    ...base,
    borderRadius: 12,
    overflow: "hidden",
    zIndex: "var(--dropdown-z-index)",
  }),
  menuList: (base) => ({
    ...base,
    padding: 6,
  }),
  option: (base, state) => ({
    ...base,
    borderRadius: 8,
    fontSize: "var(--fs-sm)",
    backgroundColor: state.isSelected
      ? "var(--select-option-selected-bg)"
      : state.isFocused
      ? "var(--select-option-hover-bg)"
      : "var(--color-bg)",
    color: state.isSelected ? "var(--primary-600)" : "var(--text-color)",
    cursor: "pointer",
  }),
  menuPortal: (base) => ({
    ...base,
    zIndex: "var(--drawer-close-z-index)",
  }),
};

const Select = ({ options = [], value, onChange, isSearchable = false, ...props }) => {
  const selectedOption =
    options.find((item) => String(item.value) === String(value ?? "")) || null;
  const menuPortalTarget = typeof document !== "undefined" ? document.body : null;

  const handleChange = (selected) => {
    if (typeof onChange !== "function") return;
    onChange({ target: { value: selected?.value ?? "" } }, selected);
  };

  return (
    <S.Wrapper>
      <ReactSelect
        options={options}
        value={selectedOption}
        onChange={handleChange}
        styles={customStyles}
        isSearchable={isSearchable}
        menuPortalTarget={menuPortalTarget}
        menuPosition="fixed"
        {...props}
      />
    </S.Wrapper>
  );
};

export default Select;