import styled, { css } from "styled-components";

const types = {
  Successful: css`
    background: var(--badge-success-bg);
    color: var(--badge-success-text);
  `,
  Failed: css`
    background: var(--badge-danger-bg);
    color: var(--badge-danger-text);
  `,
  Pending: css`
    background: var(--badge-warning-bg);
    color: var(--badge-warning-text);
  `,
  success: css`
    background: var(--badge-success-bg);
    color: var(--badge-success-text);
  `,
  danger: css`
    background: var(--badge-danger-bg);
    color: var(--badge-danger-text);
  `,
  warning: css`
    background: var(--badge-warning-bg);
    color: var(--badge-warning-text);
  `,
};

export const Badge = styled.span`
  font-family: var(--font-primary);
  font-size: var(--fs-sm);
  padding: 4px 10px;
  border-radius: 999px;
  ${({ type }) => types[type]}
`;