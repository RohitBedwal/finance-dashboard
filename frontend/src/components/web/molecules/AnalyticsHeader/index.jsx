import React from "react";
import * as S from "./styles";

const AnalyticsHeader = ({ title, children }) => {
  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      <S.Actions>{children}</S.Actions>
    </S.Container>
  );
};

export default AnalyticsHeader;
