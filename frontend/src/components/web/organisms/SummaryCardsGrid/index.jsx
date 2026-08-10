import React from "react";
import * as S from "./styles";
import SummaryCard from "../../molecules/SummaryCard";

const SummaryCardsGrid = ({ data, columns = 4, mobileColumns = 1, compactMobile = false }) => {
  return (
    <S.Container $columns={columns} $mobileColumns={mobileColumns}>
      {data.map((card) => (
        <SummaryCard key={card.title} $compactMobile={compactMobile} {...card} />
      ))}
    </S.Container>
  );
};

export default SummaryCardsGrid;
