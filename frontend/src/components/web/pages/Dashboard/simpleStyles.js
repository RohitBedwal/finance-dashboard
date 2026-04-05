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
  border: 1px solid var(--primary-200);
  border-radius: 30px;
  padding: 3px 2px 0px 20px;
  background: var(--white);
`;

export const SavingsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const SavingsTitle = styled.h3`
  font-size: var(--fs-lg);
  color: var(--black);
`;

export const SavingsArrowButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--gray-200);
  background: var(--white);
  color: var(--black);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const SavingsList = styled.div`
  display: grid;
  padding-right:20px;
  gap: 14px;
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
  color: var(--black);
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
  background: var(--primary-100);
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
  color: var(--primary-100);
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
`;

export const RecentSection = styled.div`
  border: 1px solid var(--primary-200);
  border-radius: 30px;
  padding: 18px;
  background: var(--white);
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
  color: var(--black);
`;

export const RecentActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const RecentActionButton = styled.button`
  border: 1px solid var(--gray-200);
  background: var(--white);
  border-radius: 999px;
  padding: 8px 14px;
  font-size: var(--fs-sm);
  color: var(--gray-900);
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
    background: var(--primary-100);
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
    color: var(--black);
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
`;

export const RedirectButton = styled.button`
  width: 50px;
  height: 50px;

  border-radius: 50%;
  border: 1px solid var(--gray-200);

  display: flex;
  align-items: center;
  justify-content: center;

  background: transparent;
  cursor: pointer;

  transition: 0.2s ease;

  &:hover {
    background: var(--primary-100);
  }
`;