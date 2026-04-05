import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as S from "./styles";
import { getActiveProfile, subscribeStorage } from "../../../../utils/localStorage";

const HEADER_CONFIG = {
  "/transactions": {
    title: "Transactions",
    description: "Track and manage all your financial activity",
  },
  "/budget": {
    title: "Budget",
    description: "Create and track your budgets",
  },
  "/analytics": {
    title: "Analytics",
    description: "Understand your spending behavior",
  },
};

const PageHeader = ({ rightContent }) => {
  const { pathname } = useLocation();
  const [profileName, setProfileName] = useState(() => getActiveProfile()?.name || "User");

  useEffect(() => {
    const syncProfileName = () => {
      setProfileName(getActiveProfile()?.name || "User");
    };

    const unsubscribe = subscribeStorage(syncProfileName);
    return unsubscribe;
  }, []);

  const header =
    pathname === "/dashboard"
      ? {
          title: `Welcome back, ${profileName}!`,
          description: "It is the best time to manage your finances",
        }
      : HEADER_CONFIG[pathname] || {
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