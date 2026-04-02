import React from "react";
import * as S from "./styles";
import Card from "../../atoms/card";

const InsightsPanel = ({ insights }) => {
  return (
    <S.Container>
      {insights.map((item) => (
        <Card key={item.title}>
          <S.Title>{item.title}</S.Title>
          <S.Value>{item.value}</S.Value>
          <S.Description>{item.description}</S.Description>
        </Card>
      ))}
    </S.Container>
  );
};

export default InsightsPanel;