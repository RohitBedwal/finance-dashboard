import React from "react";
import Button from "../../atoms/button";
import * as S from "./styles";

const FilterChipGroup = ({ options, active, onChange }) => {
  return (
    <S.Container>
      {options.map((item) => (
        <Button
          key={item}
          variant={active === item ? "primary" : "filter"}
          onClick={() => onChange(item)}
        >
          {item}
        </Button>
      ))}
    </S.Container>
  );
};

export default FilterChipGroup;