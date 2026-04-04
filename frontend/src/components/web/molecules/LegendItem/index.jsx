import React from "react";
import * as S from "./styles";

const LegendItem = ({ label, color, dashed = false }) => {
  return (
    <S.Container>
      <S.Dot $color={color} $dashed={dashed} />
      <span>{label}</span>
    </S.Container>
  );
};

export default LegendItem;
