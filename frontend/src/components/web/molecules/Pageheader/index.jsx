import React from "react";
import * as S from "./styles";

const PageHeader = ({ title, description, rightContent }) => {
  return (
    <S.Container>
      <S.Left>
        <S.Title>{title}</S.Title>
        {description && <S.Description>{description}</S.Description>}
      </S.Left>

      {rightContent && <S.Right>{rightContent}</S.Right>}
    </S.Container>
  );
};

export default PageHeader;