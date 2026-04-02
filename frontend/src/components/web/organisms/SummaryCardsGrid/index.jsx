import React from "react";
import * as S from "./styles";
import SummaryCard from "../../molecules/SummaryCard";

const SummaryCardsGrid = ({ data }) => {
  return (
    <S.Container>
      {data.map((card) => (
        <SummaryCard key={card.title} {...card} />
      ))}
    </S.Container>
  );
};

export default SummaryCardsGrid;