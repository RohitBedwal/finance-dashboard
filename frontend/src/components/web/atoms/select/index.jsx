import React from "react";
import * as S from "./styles";

const Select = ({ options = [], ...props }) => {
  return (
    <S.Select {...props}>
      {options.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </S.Select>
  );
};

export default Select;