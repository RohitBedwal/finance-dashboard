import React from "react";
import * as S from "./styles";
import ProfileBlock from "../../molecules/ProfileBlock/index";
import PageHeader from "../../molecules/Pageheader";

const TopNavbar = () => {
  return (
    <S.Container>
      <PageHeader title="Dahsboard]" description="gg" ></PageHeader>
      <S.Actions>
        <S.IconButton type="button" aria-label="Search">
          <svg width="18" height="18">
            <use href="/icons.svg#search" />
          </svg>
        </S.IconButton>

        <S.IconButton type="button" aria-label="Notifications">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 16V11C6 7.69 8.69 5 12 5C15.31 5 18 7.69 18 11V16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M4 16H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </S.IconButton>

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