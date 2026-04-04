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
  color: var(--black);
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  select {
    border-radius: 999px;
    border: 1px solid var(--gray-200);
    padding: 8px 14px;
    font-size: var(--fs-sm);
    color: var(--gray-900);
  }
`;

export const Section = styled.div`
  margin-top: 14px;
`;

export const SectionTitle = styled.h4`
  font-size: var(--fs-sm);
  color: var(--primary-600);
  margin-bottom: 10px;
  letter-spacing: 0.04em;
`;

export const TableWrap = styled.div`
  margin-top: 14px;
  overflow-x: auto;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  border: 1px solid var(--primary-200);
  border-radius: 30px;

  scrollbar-width: none;
  scrollbar-color: var(--primary-200) transparent;

  &::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 999px;
  }

  &:hover::-webkit-scrollbar-thumb {
    background-color: var(--primary-200);
  }
`;

export const Table = styled.table`
  width: 100%;
  min-width: 960px;
  border-collapse: separate;
  border-spacing: 2px;

  th,
  td {
    padding: 16px 20px;
    text-align: right;
    font-size: var(--fs-sm);
    color: var(--black);
    white-space: nowrap;
  }

  thead tr {
    background: var(--primary-100);
  }

  th {
    text-transform: uppercase;
    font-weight: 200;
    color: var(--primary-600);
    background: var(--primary-100);
    position: sticky;
    top: 0;
    z-index: 1;
  }

  thead tr th:first-child {
    border-radius: 30px 0 0 30px;
  }

  thead tr th:last-child {
    border-radius: 0 30px 30px 0;
  }

  tbody tr {
    background: var(--white);
    box-shadow: inset 0 -1px 0 var(--primary-200);
    border-radius: 30px;
  }

  tbody tr td {
    font-size: var(--fs-sm);
  }

  tbody tr td:first-child {
    border-radius: 30px 0 0 30px;
  }

  tbody tr td:last-child {
    border-radius: 0 30px 30px 0;
  }

  th:first-child,
  td:first-child {
    text-align: left;
    min-width: 150px;
  }

  tbody tr:last-child {
    background: var(--primary-100);
  }

  tbody tr:last-child td {
    font-weight: 500;
  }
`;

export const SummaryGrid = styled.div`
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const SummaryItem = styled.div`
  border: 1px solid var(--primary-200);
  border-radius: 20px;
  padding: 12px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  background: var(--white);

  span {
    color: var(--gray-500);
    font-size: var(--fs-sm);
  }

  strong {
    color: var(--black);
    font-size: var(--fs-md);
    font-weight: var(--fw-medium);
  }
`;
