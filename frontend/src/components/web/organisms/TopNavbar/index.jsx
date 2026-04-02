import React from "react";
import * as S from "./styles";
import SearchBar from "../../molecules/SearchBar/index";
// import IconButton from "../../ atoms/";
import ProfileBlock from "../../molecules/ProfileBlock/index";
import PageHeader from "../../molecules/Pageheader";

const TopNavbar = () => {
  return (
    <S.Container>
      <PageHeader title="Dahsboard gg!!" description="gshgjkjkbkjsbkbvjsbk" ></PageHeader>
      <S.Actions>
      <SearchBar placeholder="Search transactions..." />
        {/* <IconButton icon="🔔" /> */}
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