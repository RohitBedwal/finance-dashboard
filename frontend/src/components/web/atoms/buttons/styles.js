import styled, { css } from "styled-components";

export const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`;

const sizeStyles = {
  sm: css`
    padding: var(--btn-padding-y-sm) var(--btn-padding-x-sm);
    font-size: var(--btn-font-size-sm);
  `,
  md: css`
    padding: var(--btn-padding-y-md) var(--btn-padding-x-md);
    font-size: var(--btn-font-size-md);
  `,
  lg: css`
    padding: var(--btn-padding-y-lg) var(--btn-padding-x-lg);
    font-size: var(--btn-font-size-lg);
  `,
};

const withButtonSize = ({ size }) =>
  sizeStyles[size] ||
  css`
    padding: var(--btn-padding-y) var(--btn-padding-x);
    font-size: var(--btn-font-size);
  `;

const variants = {
  primary: css`
    background: var(--primary-600);
    color: var(--white);
    border-radius: 12px;
    ${withButtonSize}

    &:hover {
      background: var(--primary-700);
    }
  `,

  secondary: css`
    background: var(--white);
    color: var(--gray-900);
    border: 1px solid var(--gray-200);
    border-radius: 12px;
    ${withButtonSize}

    &:hover {
      background: var(--gray-100);
    }
  `,

  icon: css`
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: var(--white);
    border: 1px solid var(--gray-200);
    padding: 0;

    &:hover {
      background: var(--gray-100);
    }
  `,

  rounded: css`
    background: var(--primary-100);
    color: var(--primary-700);
    border-radius: 999px;
    ${withButtonSize}

    &:hover {
      background: var(--primary-200);
    }
  `,

  widget: css`
    background: var(--primary-600);
    color: var(--white);
    border-radius: 999px;
    ${withButtonSize}
    display: flex;
    gap: 6px;

    &:hover {
      background: var(--primary-700);
    }
  `,

  filter: css`
    background: var(--white);
    color: var(--gray-700);
    border: 1px solid var(--gray-200);
    border-radius: 999px;
    ${withButtonSize}

    &:hover {
      border-color: var(--primary-600);
      color: var(--primary-600);
    }
  `,
};

export const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: var(--font-primary);
  font-weight: var(--fw-medium);
  cursor: pointer;
  transition: all 0.25s ease;
  border: none;

  ${({ variant }) => variants[variant]}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;