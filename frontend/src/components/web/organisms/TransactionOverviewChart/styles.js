import styled from "styled-components";

export const ChartWrap = styled.div`
  width: 100%;
`;

export const TooltipBubble = styled.div`
  background: var(--color-bg);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 8px 12px;
  color: var(--text-color);
  box-shadow: 0px 8px 24px rgba(17, 17, 19, 0.08);

  strong {
    font-size: var(--fs-md);
    font-weight: var(--fw-medium);
  }
`;

export const TooltipTitle = styled.div`
  font-size: var(--fs-xs);
  color: var(--muted-text);
  margin-bottom: 4px;
`;

export const TooltipRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  font-size: var(--fs-xs);

  span {
    color: var(--muted-text);
  }

  strong {
    color: var(--text-color);
  }
`;
