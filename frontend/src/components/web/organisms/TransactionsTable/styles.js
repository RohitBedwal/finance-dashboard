import styled from "styled-components";

export const Container = styled.div`
  background: var(--color-bg);
  margin-top: 20px;
`;

export const TableScroll = styled.div`
  max-height: 520px;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  border: 0.1px solid var(--border-color);
  border-radius: 30px;

  /* Firefox */
  scrollbar-width: none;
  scrollbar-color: var(--primary-200) transparent;

  /* WebKit (Chrome/Safari/Edge) */
  &::-webkit-scrollbar {
    width: 4px;
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

  @media (max-width: 767px) {
    display: none;
  }
`;

export const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: separate;
  border-spacing: 0;
  
  th {
    text-transform: uppercase;
    text-align: left;
    font-size: var(--fs-sm);
    font-weight: 200;
    padding: 16px 20px;
    color: var(--primary-600);
    background: var(--surface-hover);
    position: sticky;
    top: 0;
    z-index: 1;
    user-select: none;
    cursor: pointer;
    transition: all 0.2s ease;
    border-bottom: 0.1px solid var(--border-color);
  }

  th:first-child {
    cursor: default;
  }

  th:not(:first-child):hover {
    background: var(--surface-hover);
    opacity: 0.85;
  }


  thead tr {
    background: var(--surface-hover);
  }

  /* Header rounded only once */
  thead tr th:first-child {
    border-radius: 30px 0 0 30px;
  }

  thead tr th:last-child {
    border-radius: 0 30px 30px 0;
  }

  /* Data rows */
  tbody tr {
    background: var(--color-bg);
    box-shadow: inset 0 -1px 0 var(--border-color);
    transition: background 0.2s ease;
    border-radius: 30px;
  }

  tbody tr td {
    padding: 18px 20px;
    font-size: var(--fs-sm);
  }

  /* Rounded corners per row */
  tbody tr td:first-child {
    border-radius: 30px 0 0 30px;
  }

  tbody tr td:last-child {
    border-radius: 0 30px 30px 0;
  }
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 16px;
`;

export const PageInfo = styled.div`
  font-size: var(--fs-sm);
  color: var(--muted-text);
`;

/** Mobile Card View Styles */
export const MobileCardWrap = styled.div`
  display: none;
  flex-direction: column;
  gap: 12px;
  max-height: 520px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  @media (max-width: 767px) {
    display: flex;
  }

  scrollbar-width: none;

  &::-webkit-scrollbar {
    width: 0;
  }
`;

export const MobileCard = styled.div`
  background: var(--color-bg);
  border: 0.1px solid var(--border-color);
  border-radius: 20px;
  padding: 16px;
  display: grid;
  gap: 12px;
`;

export const MobileCardRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

export const MobileCardField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const MobileCardLabel = styled.span`
  font-size: var(--fs-xs);
  font-weight: 500;
  color: var(--muted-text);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const MobileCardValue = styled.span`
  font-size: var(--fs-sm);
  color: var(--text-color);
  font-weight: var(--fw-medium);

  &.income {
    color: var(--success-800);
  }

  &.expense {
    color: var(--danger-500);
  }
`;

export const MobileCardBadge = styled.div`
  margin-top: 4px;
`;

export const ActionBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: ${(props) => (props.show ? "14px 18px" : "0 18px")};
  min-height: ${(props) => (props.show ? "50px" : "0")};
  background: var(--surface-hover);
  border: 0.1px solid
    ${(props) => (props.show ? "var(--border-color)" : "transparent")};
  border-radius: 20px;
  margin-bottom: ${(props) => (props.show ? "16px" : "0")};
  max-height: ${(props) => (props.show ? "64px" : "0")};
  opacity: ${(props) => (props.show ? 1 : 0)};
  overflow: hidden;
  pointer-events: ${(props) => (props.show ? "auto" : "none")};
  transition: all 0.24s ease;
`;

export const SelectionInfo = styled.span`
  font-size: var(--fs-sm);
  color: var(--text-color);
  font-weight: var(--fw-medium);
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CheckboxCell = styled.td`
  padding: 16px 10px !important;
  text-align: center;
  width: 50px;
  min-width: 50px;
`;

export const SortIcon = styled.span`
  display: inline-block;
  margin-left: 6px;
  font-size: 11px;
  color: var(--muted-text);
  transition: color 0.2s ease;
  opacity: 0.6;

  th:hover & {
    opacity: 1;
    color: var(--text-color);
  }
`;

export const StyledCheckbox = styled.input.attrs({ type: "checkbox" })`
  width: 18px;
  height: 18px;
  cursor: pointer;
  appearance: none;
  border: 1.5px solid var(--checkbox-border);
  border-radius: 6px;
  background: var(--checkbox-bg);
  display: inline-grid;
  place-content: center;
  transition: all 0.2s ease;

  &::before {
    content: "";
    width: 9px;
    height: 9px;
    transform: scale(0);
    transition: transform 0.16s ease;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0, 43% 62%);
    background: var(--checkbox-check-color);
  }

  &:hover {
    border-color: var(--checkbox-border-hover);
  }

  &:checked {
    background: var(--checkbox-checked-bg);
    border-color: var(--checkbox-checked-bg);
  }

  &:checked::before {
    transform: scale(1);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--checkbox-focus-ring);
  }

  &:active {
    transform: scale(0.95);
  }
`;
