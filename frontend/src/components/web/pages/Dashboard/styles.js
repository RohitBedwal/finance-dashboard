import styled from "styled-components";

export const Toolbar = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

export const WidgetManager = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 14px;
  display: grid;
  gap: 8px;
  margin-bottom: 18px;
  background: var(--color-bg);
`;

export const WidgetManagerRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
  border: 1px solid var(--border-color);
  border-radius: 14px;
  padding: 10px;
`;

export const WidgetLabel = styled.span`
  font-size: var(--fs-sm);
  color: var(--text-color);
`;

export const Widgets = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-auto-flow: row dense;
  align-items: start;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const WidgetBlock = styled.section`
  position: relative;
  grid-column: span 1;
  min-width: 0;
  transition: box-shadow 0.2s ease;

  & > :not(label) {
    width: 100%;
  }

  &:active {
    cursor: grabbing;
  }

  @media (min-width: 1280px) {
    &[data-widget="money-flow"],
    &[data-widget="recent-transactions"] {
      grid-column: span 2;
    }
  }

  @media (max-width: 1279px) {
    &[data-widget="money-flow"],
    &[data-widget="recent-transactions"] {
      grid-column: span 1;
    }
  }
`;

export const WidgetSelector = styled.label`
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 3;
  background: var(--color-bg);
  border: 1px solid var(--border-color);
  border-radius: 999px;
  padding: 6px 10px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: var(--fs-xs);
  color: var(--gray-600);

  input {
    width: 14px;
    height: 14px;
    accent-color: var(--primary-600);
    cursor: pointer;
  }
`;

export const WidgetTitle = styled.h3`
  font-size: var(--fs-lg);
  color: var(--text-color);
`;

export const EmptyState = styled.div`
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--fs-sm);
  color: var(--gray-300);
`;