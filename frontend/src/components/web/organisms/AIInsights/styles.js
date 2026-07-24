import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.h3`
  font-size: var(--fs-lg);
  font-weight: 500;
  color: var(--text-color);
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const Summary = styled.p`
  font-size: var(--fs-sm);
  color: var(--gray-300);
  line-height: 1.5;
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const InsightCard = styled.div`
  background: var(--color-bg);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: var(--primary-300);
  }
`;

export const InsightHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const InsightIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: ${({ $type }) => {
    switch ($type) {
      case "savings_opportunity": return "var(--badge-success-bg)";
      case "spending_pattern": return "var(--primary-100)";
      case "budget_warning": return "var(--badge-warning-bg)";
      case "positive_trend": return "var(--badge-success-bg)";
      case "balance_tip": return "var(--primary-100)";
      default: return "var(--gray-100)";
    }
  }};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 16px;
    height: 16px;
    fill: ${({ $type }) => {
      switch ($type) {
        case "savings_opportunity": return "var(--badge-success-text)";
        case "spending_pattern": return "var(--primary-600)";
        case "budget_warning": return "var(--badge-warning-text)";
        case "positive_trend": return "var(--badge-success-text)";
        case "balance_tip": return "var(--primary-600)";
        default: return "var(--gray-500)";
      }
    }};
  }
`;

export const PriorityBadge = styled.span`
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 999px;
  text-transform: uppercase;
  font-weight: 500;
  background: ${({ $priority }) => {
    switch ($priority) {
      case "high": return "var(--badge-danger-bg)";
      case "medium": return "var(--badge-warning-bg)";
      default: return "var(--gray-100)";
    }
  }};
  color: ${({ $priority }) => {
    switch ($priority) {
      case "high": return "var(--badge-danger-text)";
      case "medium": return "var(--badge-warning-text)";
      default: return "var(--gray-500)";
    }
  }};
`;

export const InsightTitle = styled.h4`
  font-size: var(--fs-sm);
  font-weight: 500;
  color: var(--text-color);
`;

export const InsightDesc = styled.p`
  font-size: var(--fs-xs);
  color: var(--gray-400);
  line-height: 1.5;
`;

export const InsightAmount = styled.span`
  font-size: var(--fs-sm);
  font-weight: 500;
  color: var(--primary-600);
`;

export const RefreshButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background: var(--color-bg);
  color: var(--text-color);
  font-size: var(--fs-xs);
  font-family: var(--font-primary);
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: var(--surface-hover);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 24px;
  color: var(--gray-300);
  font-size: var(--fs-sm);
`;
