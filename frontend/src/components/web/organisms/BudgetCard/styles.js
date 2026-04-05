import styled from "styled-components";

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

export const Title = styled.h4`
  font-size: var(--fs-lg);
  color: var(--text-color);
`;

export const ActionButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 999px;
  border: 1px solid var(--gray-300);
  background: var(--color-bg);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const Content = styled.div`
  margin-top: 12px;
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 14px;
  align-items: center;
`;

export const ProgressWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RingWrap = styled.div`
  position: relative;
  width: 128px;
  height: 128px;
  display: grid;
  place-items: center;
`;

export const ProgressInner = styled.div`
  position: absolute;

  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: transparent;
//   border: 1px solid var(--gray-300);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  span {
    font-size: var(--fs-xs);
    color: var(--gray-300);
  }

  strong {
    font-size: var(--fs-xl);
    color: var(--text-color);
  }
`;

export const BudgetMeta = styled.div`
  p {
    font-size: var(--fs-sm);
    color: var(--gray-300);
  }

  h4 {
    margin-top: 2px;
    font-size:30px;
    color: var(--text-color);
    font-weight:500;

    span {
      margin-left: 6px;
      font-size: var(--fs-sm);
      color: var(--primary-600);
    }
  }
`;

export const Status = styled.span`
  margin-top: 8px;
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: var(--fs-xs);
  background: ${({ $danger, $warning }) => {
    if ($danger) return "var(--danger-200)";
    if ($warning) return "var(--warning-200)";
    return "var(--success-200)";
  }};
  color: ${({ $danger, $warning }) => {
    if ($danger) return "var(--danger-500)";
    if ($warning) return "var(--warning-500)";
    return "var(--success-800)";
  }};
`;
