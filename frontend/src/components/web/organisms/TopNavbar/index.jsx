import React from "react";
import * as S from "./styles";
import SearchBar from "../../molecules/SearchBar";
import IconButton from "../../atoms/iconButton";
import ProfileBlock from "../../molecules/ProfileBlock";

const TopNavbar = () => {
  return (
    <S.Container>
      <SearchBar placeholder="Search transactions..." />

      <S.Actions>
        <IconButton icon="🔔" />
        <ProfileBlock
          name="Adaline"
          email="adaline@mail.com"
          avatar="/avatar.png"
        />
      </S.Actions>
    </S.Container>
  );
};

export default TopNavbar;