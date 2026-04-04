import styled, { css } from "styled-components";

const types = {
  Successful: css`
    background: var(--success-200);
    color: var(--success-800);
  `,
  Failed: css`
    background: var(--danger-200);
    color: var(--danger-500);
  `,
  Pending: css`
    background: var(--warning-200);
    color: var(--warning-500);
  `,
  success: css`
    background: var(--success-200);
    color: var(--success-800);
  `,
  danger: css`
    background: var(--danger-200);
    color: var(--danger-500);
  `,
  warning: css`
    background: var(--warning-200);
    color: var(--warning-500);
  `,
};

export const Badge = styled.span`
  font-family: var(--font-primary);
  font-size: var(--fs-sm);
  padding: 4px 10px;
  border-radius: 999px;
  ${({ type }) => types[type]}
`;