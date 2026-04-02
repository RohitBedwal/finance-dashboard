import React from "react";
import * as S from "./styles";
import Icon from "../../atoms/icon";

const menu = [
  { label: "Dashboard", icon: "dashboard" },
  { label: "Transactions", icon: "transaction" },
  { label: "Wallet", icon: "wallet" },
  { label: "Analytics", icon: "analytics" },
  { label: "Settings", icon: "settings" },
];

const Sidebar = () => {
  return (
    <S.Container>
      <S.Logo>FinSet</S.Logo>

      <S.Menu>
        {menu.map((item) => (
          <S.MenuItem key={item.label}>
            <Icon name={item.icon} />
            {item.label}
          </S.MenuItem>
        ))}
      </S.Menu>
    </S.Container>
  );
};

export default Sidebar;