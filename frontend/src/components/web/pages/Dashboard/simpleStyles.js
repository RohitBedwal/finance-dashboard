import styled from "styled-components";

export const ChartSection = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(320px, 1fr);
  gap: 20px;
  margin-top: 24px;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

export const BudgetSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const SavingsCard = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 30px;
  padding: 3px 2px 0px 20px;
  background: var(--color-bg);
  min-width: 0;

  @media (max-width: 767px) {
    padding: 12px;
    border-radius: 20px;
  }
`;

export const SavingsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const SavingsTitle = styled.h3`
  font-size: var(--fs-lg);
  color: var(--text-color);
`;

export const SavingsArrowButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--border-color);
  background: var(--color-bg);
  color: var(--text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const SavingsList = styled.div`
  display: grid;
  padding-right:20px;
  gap: 14px;

  @media (max-width: 767px) {
    padding-right: 0;
  }
`;

export const SavingsItem = styled.div`
  display: grid;
  gap: 8px;
`;

export const SavingsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const SavingsName = styled.p`
  color: var(--text-color);
  font-size: var(--fs-sm);
`;

export const SavingsAmount = styled.p`
  color: var(--primary-500);
  font-size: var(--fs-sm);
  font-weight: var(--fw-medium);
`;

export const SavingsTrack = styled.div`
  width: 100%;
  height: 20px;
  border-radius: 999px;
  background: var(--surface-hover);
  overflow: hidden;
`;

export const SavingsFill = styled.div`
  height: 100%;
  min-width: 24px;
  border-radius: 999px;
  background: var(--primary-600);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  font-size: var(--fs-xs);
  font-weight: var(--fw-medium);
`;

export const BottomSection = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(320px, 1fr);
  gap: 20px;
  margin-top: 24px;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 767px) {
    gap: 14px;
  }
`;

export const RecentSection = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 30px;
  padding: 18px;
  background: var(--color-bg);

  @media (max-width: 767px) {
    padding: 12px;
    border-radius: 20px;
  }
`;

export const RecentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

export const RecentTitle = styled.h3`
  font-size: var(--fs-xl);
  color: var(--text-color);
`;

export const RecentActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const RecentActionButton = styled.button`
  border: 1px solid var(--border-color);
  background: var(--color-bg);
  border-radius: 999px;
  padding: 8px 14px;
  font-size: var(--fs-sm);
  color: var(--text-color);
  cursor: pointer;
`;

export const RecentTableWrap = styled.div`
  overflow-x: auto;
`;

export const RecentTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;

  th {
    text-transform: uppercase;
    text-align: left;
    font-size: var(--fs-sm);
    font-weight: 200;
    padding: 14px 18px;
    color: var(--primary-600);
    background: var(--surface-hover);
  }

  thead tr th:first-child {
    border-radius: 30px 0 0 30px;
  }

  thead tr th:last-child {
    border-radius: 0 30px 30px 0;
  }

  tbody tr {
    box-shadow: inset 0 -1px 0 var(--primary-200);
  }

  tbody tr td {
    padding: 16px 18px;
    font-size: var(--fs-sm);
    color: var(--text-color);
    white-space: nowrap;
  }

  tbody tr td:first-child {
    border-radius: 30px 0 0 30px;
  }

  tbody tr td:last-child {
    border-radius: 0 30px 30px 0;
  }

  td.income {
    color: var(--success-800);
    font-weight: var(--fw-medium);
  }

  td.expense {
    color: var(--danger-500);
    font-weight: var(--fw-medium);
  }

  @media (max-width: 767px) {
    th,
    td {
      padding: 12px 10px;
      font-size: var(--fs-xs);
    }

    th:nth-child(3),
    td:nth-child(3),
    th:nth-child(5),
    td:nth-child(5) {
      display: none;
    }

    thead tr th:last-child,
    tbody tr td:last-child {
      border-radius: 0;
    }

    thead tr th:nth-child(4) {
      border-radius: 0 30px 30px 0;
    }

    tbody tr td:nth-child(4) {
      border-radius: 0 30px 30px 0;
    }
  }
`;

export const RedirectButton = styled.button`
  width: 50px;
  height: 50px;
  color: var(--text-color);

  border-radius: 50%;
  border: 1px solid var(--border-color);

  display: flex;
  align-items: center;
  justify-content: center;

  background: transparent;
  cursor: pointer;

  transition: 0.2s ease;

  &:hover {
    background: var(--surface-hover);
  }

  svg {
    display: block;
    fill: currentColor;
   
  }

  use {
    fill: currentColor;

  }
`;