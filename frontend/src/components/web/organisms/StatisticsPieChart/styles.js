import styled from "styled-components";

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const Title = styled.h3`
  font-size: var(--fs-lg);
  color: var(--text-color);
`;

export const Actions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  select {
    border-radius: 999px;
    border: 1px solid var(--border-color);
    padding: 8px 14px;
    font-size: var(--fs-sm);
    color: var(--text-color);
  }
`;

export const DetailsButton = styled.button`
  border: 1px solid var(--border-color);
  background: var(--color-bg);
  border-radius: 999px;
  padding: 8px 14px;
  font-size: var(--fs-sm);
  color: var(--text-color);
  cursor: pointer;

  &:hover {
    background: var(--surface-hover);
  }
`;

export const Subtitle = styled.p`
  margin-top: 10px;
  color: var(--muted-text);
  font-size: var(--fs-sm);
  line-height: 1.35;
  max-width: 360px;
`;

export const ChartWrap = styled.div`
  position: relative;
  margin-top: 6px;
  z-index: 0;
`;

export const TooltipBubble = styled.div`
  background-color: var(--color-bg);
  border: 0.1px solid var(--border-color);
  border-radius: 14px;
  padding: 8px 14px;
  color: var(--text-color);
  box-shadow: 0px 8px 24px rgba(17, 17, 19, 0.08);
//   min-width: 170px;
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

export const CenterLabel = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  pointer-events: none;

  p {
    color: var(--muted-text);
    font-size: var(--fs-sm);
    margin-bottom: 4px;
  }

  h3 {
    font-size: 29px;
    font-weight: 500;
    color: var(--text-color);
    line-height: 1;

    span {
      color: var(--gray-200);
      font-weight: var(--fw-regular);
      margin-left: 2px;
    }
  }
`;

export const Callout = styled.div`
  position: absolute;
  right: 16px;
  top: 72px;
  border: 0.1px solid var(--primary-300);
  border-radius: 16px;
  padding: 10px 16px;
  background: var(--color-bg);
  box-shadow: 0px 4px 10px rgba(17, 17, 19, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;

  strong {
    color: var(--muted-text);
    font-size: var(--fs-lg);
    line-height: 1.2;
  }

  span {
    color: var(--text-color);
    font-size: var(--fs-xl);
    font-weight: var(--fw-medium);
    line-height: 1.3;
  }
`;

export const Legend = styled.div`
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px 18px;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-color);
  font-size: var(--fs-sm);
`;

export const Dot = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
`;
