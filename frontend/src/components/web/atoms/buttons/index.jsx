import React from "react";
import * as S from "./styles"

const Button = ({
  children,
  variant = "primary",
  size,
  icon,
  disabled = false,
  onClick,
  ...rest
}) => {
  return (
    <S.StyledButton
      variant={variant}
      size={size}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {icon && <S.IconWrapper>{icon}</S.IconWrapper>}
      {children}
    </S.StyledButton>
  );
};

export default Button;