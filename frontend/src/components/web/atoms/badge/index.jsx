import React from "react";
import * as S from "./styles";

const Badge = ({ children, type = "success" }) => {
  return <S.Badge type={type}>{children}</S.Badge>;
};

export default Badge;