import React from "react";
import * as S from "./styles";
import SummaryCard from "../../molecules/SummaryCard";

const SummaryCardsGrid = ({ data, columns = 4 }) => {
  return (
    <S.Container $columns={columns}>
      {data.map((card) => (
        <SummaryCard key={card.title} {...card} />
      ))}
    </S.Container>
  );
};

export default SummaryCardsGrid;