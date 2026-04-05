import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Icon from "../../atoms/icons";
import { protectedRoutes } from "../../../routes";
import * as S from "./styles";

const THEME_STORAGE_KEY = "theme";

const Sidebar = ({ isMobileDrawer = false, onNavigate }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = location.pathname.split("/")[1];
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(THEME_STORAGE_KEY) === "dark";
  });

  useEffect(() => {
    if (typeof document === "undefined") return;
    const theme = isDarkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [isDarkMode]);
  
  return (
    <S.Container $mobileDrawer={isMobileDrawer}>
      <S.Logo $mobileDrawer={isMobileDrawer}>
        <S.LogoMark>
          <S.LogoStem />
          <S.LogoTop />
          <S.LogoMid />
        </S.LogoMark>
        <S.LogoFull $mobileDrawer={isMobileDrawer}>finance</S.LogoFull>
      </S.Logo>

      <S.Menu $mobileDrawer={isMobileDrawer}>
        {menu.map((item) => (
          <S.MenuItem
          key={item.label}
          $mobileDrawer={isMobileDrawer}
          $active={activeTab === item.activePath}
          onClick={() => {
            navigate(item.path);
            onNavigate?.();
          }}
          >
            <S.MenuItemIcon $active={activeTab === item.activePath}>
              <Icon name={item.icon} width={25} height={25} />
            </S.MenuItemIcon>
            <S.MenuItemLabel $mobileDrawer={isMobileDrawer} $active={activeTab === item.activePath}>
              {item.label}
            </S.MenuItemLabel>
          </S.MenuItem>
        ))}
      </S.Menu>

      <S.ThemeToggleWrap $mobileDrawer={isMobileDrawer}>
        <S.ThemeToggleButton
          type="button"
          $active={isDarkMode}
          $mobileDrawer={isMobileDrawer}
          onClick={() => setIsDarkMode((value) => !value)}
          aria-label="Toggle dark mode"
          title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          <S.ThemeIcon $active={!isDarkMode} $position="left" $mobileDrawer={isMobileDrawer}>☼</S.ThemeIcon>
          <S.ThemeIcon $active={isDarkMode} $position="right" $mobileDrawer={isMobileDrawer}>☾</S.ThemeIcon>
          <S.ThemeToggleThumb $active={isDarkMode} $mobileDrawer={isMobileDrawer} />
        </S.ThemeToggleButton>
      </S.ThemeToggleWrap>
    </S.Container>
  );
};

export default Sidebar;

const menu = [
  {
    label: "Dashboard",
    icon: "dashboard",
    path: protectedRoutes.dashboard,
    activePath: protectedRoutes.dashboard.split("/")[1],
  },
  {
    label: "Transactions",
    icon: "orders",
    path: protectedRoutes.transactions,
    activePath: protectedRoutes.transactions.split("/")[1],
  },
  {
    label: "Budget",
    icon: "budget",
    path: protectedRoutes.budget,
    activePath: protectedRoutes.budget.split("/")[1],
  },
  {
    label: "Analytics",
    icon: "analytics",
    path: protectedRoutes.analytics,
    activePath: protectedRoutes.analytics.split("/")[1],
  },
];