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
  align-items: center;
  gap: 10px;

  select {
    border-radius: 999px;
    border: 1px solid var(--border-color);
    padding: 8px 14px;
    font-size: var(--fs-sm);
    color: var(--text-color);
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
  border: 0.1px solid var(--border-color);
  border-radius: 30px;

  scrollbar-width: none;
  scrollbar-color: var(--border-color) transparent;

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
    background-color: var(--border-color);
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
    color: var(--text-color);
    white-space: nowrap;
  }

  thead tr {
    background: var(--surface-hover);
  }

  th {
    text-transform: uppercase;
    font-weight: 200;
    color: var(--primary-600);
    background: var(--surface-hover);
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
    background: var(--color-bg);
    box-shadow: inset 0 -1px 0 var(--border-color);
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
    background: var(--surface-hover);
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
  border: 0.1px solid var(--border-color);
  border-radius: 20px;
  padding: 12px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  background: var(--color-bg);

  span {
    color: var(--muted-text);
    font-size: var(--fs-sm);
  }

  strong {
    color: var(--text-color);
    font-size: var(--fs-md);
    font-weight: var(--fw-medium);
  }
`;
