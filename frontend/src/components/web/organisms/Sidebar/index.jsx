import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Icon from "../../atoms/icons";
import { protectedRoutes } from "../../../routes";
import * as S from "./styles";


const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = location.pathname.split("/")[1];
  
  return (
    <S.Container>
      <S.Logo>
        <S.LogoShort>F</S.LogoShort>
        <S.LogoFull>Finance</S.LogoFull>
      </S.Logo>

      <S.Menu>
        {menu.map((item) => (
          <S.MenuItem
          key={item.label}
          $active={activeTab === item.activePath}
          onClick={() => navigate(item.path)}
          >
            <S.MenuItemIcon $active={activeTab === item.activePath}>
              <Icon name={item.icon} width={25} height={25} />
            </S.MenuItemIcon>
            <S.MenuItemLabel $active={activeTab === item.activePath}>
              {item.label}
            </S.MenuItemLabel>
          </S.MenuItem>
        ))}
      </S.Menu>
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
    label: "Goal",
    icon: "products",
    path: protectedRoutes.goal,
    activePath: protectedRoutes.goal.split("/")[1],
  },
  {
    label: "Budget",
    icon: "banner",
    path: protectedRoutes.budget,
    activePath: protectedRoutes.budget.split("/")[1],
  },
  {
    label: "Analytics",
    icon: "performance",
    path: protectedRoutes.analytics,
    activePath: protectedRoutes.analytics.split("/")[1],
  },
  {
    label: "Settings",
    icon: "settings",
    path: protectedRoutes.settings,
    activePath: protectedRoutes.settings.split("/")[1],
  },
];