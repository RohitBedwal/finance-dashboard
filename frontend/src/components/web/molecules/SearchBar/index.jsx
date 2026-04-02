import React from "react";
import * as S from "./styles";
// import Icon from "../../atoms/icon";

const SearchBar = ({ placeholder }) => {
  return (
    <S.Container>
      {/* <Icon name="search" /> */}
      <S.Input placeholder={placeholder} />
    </S.Container>
  );
};

export default SearchBar;