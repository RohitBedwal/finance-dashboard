import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as S from "./styles";

const getUserName = () => {
  try {
    const raw = localStorage.getItem("user");
    if (!raw) return "User";
    const user = JSON.parse(raw);
    return user?.name || user?.email?.split("@")[0] || "User";
  } catch {
    return "User";
  }
};

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
  const [profileName, setProfileName] = useState(() => getUserName());

  useEffect(() => {
    const syncProfileName = () => setProfileName(getUserName());
    window.addEventListener("storage", syncProfileName);
    return () => window.removeEventListener("storage", syncProfileName);
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