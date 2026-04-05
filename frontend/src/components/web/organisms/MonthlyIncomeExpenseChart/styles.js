import styled from "styled-components";

export const ChartArea = styled.div`
  width: 100%;
`;

export const TooltipBubble = styled.div`
  background: var(--color-bg);
  border: 1px solid var(--border-color);
  border-radius: 14px;
  padding: 8px 14px;
  color: var(--text-color);
  box-shadow: 0px 8px 24px rgba(17, 17, 19, 0.08);
  min-width: 220px;
`;

export const TooltipTitle = styled.div`
  font-size: var(--fs-xs);
  color: var(--muted-text);
  margin-bottom: 4px;
`;

export const TooltipRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  font-size: var(--fs-xs);

  & + & {
    margin-top: 2px;
  }

  strong {
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
  }
`;
