import React from "react";
import * as S from "./styles";

const StatusDot = ({ color = "var(--primary-600)" }) => {
  return <S.Dot color={color} />;
};

export default StatusDot;