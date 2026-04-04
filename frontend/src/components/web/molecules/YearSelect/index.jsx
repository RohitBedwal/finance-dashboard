import React from "react";
import Select from "../../atoms/select";

const YearSelect = ({ value, years = [], labels = {}, onChange, ariaLabel }) => {
  const options = years.map((year) => ({
    label: labels[year] || String(year),
    value: String(year),
  }));

  return (
    <Select
      aria-label={ariaLabel}
      value={String(value)}
      options={options}
      onChange={(event) => {
        const nextValue = event.target.value;
        if (/^\d+$/.test(nextValue)) {
          onChange(Number(nextValue));
          return;
        }
        onChange(nextValue);
      }}
    />
  );
};

export default YearSelect;
