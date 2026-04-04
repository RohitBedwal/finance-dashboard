import React from "react";
import { useLocation } from "react-router-dom";
import * as S from "./styles";

const HEADER_CONFIG = {
  "/dashboard": {
    title: "Welcome back, Rohit!",
    description: "It is the best time to manage your finances",
  },
  "/transactions": {
    title: "Transactions",
    description: "Track and manage all your financial activity",
  },
  "/goal": {
    title: "goal",
    description: "Monitor your balances and accounts",
  },
  "/analytics": {
    title: "Analytics",
    description: "Understand your spending behavior",
  },
  "/settings": {
    title: "Settings",
    description: "Manage your profile and preferences",
  },
};

const PageHeader = ({ rightContent }) => {
  const { pathname } = useLocation();

  const header = HEADER_CONFIG[pathname] || {
    title: "Dashboard",
    description: "Overview of your finances",
  };

  return (
    <S.Container>
      <S.Left>
        <S.Title>{header.title}</S.Title>
        {header.description && (
          <S.Description>{header.description}</S.Description>
        )}
      </S.Left>

      {rightContent && <S.Right>{rightContent}</S.Right>}
    </S.Container>
  );
};

export default PageHeader;