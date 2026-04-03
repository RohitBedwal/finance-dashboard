import styled from "styled-components";

export const Container = styled.div`
  background: var(--white);
  // padding: 20px;
  margin-top: 20px;
  
`;

export const TableScroll = styled.div`
  max-height: 520px;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  border: 1px solid var(--primary-200);
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
    background-color: var(--primary-200);
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
    font-weight:200;
    padding: 16px 20px;
    color: var(--primary-600);
    background: var(--primary-100);
    position: sticky;
    top: 0;
    z-index: 1;
  }


  thead tr {
    background: var(--primary-100);
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
    background: var(--white);
    box-shadow: inset 0 -1px 0 var(--primary-200); /* bottom border only */
    transition: background 0.2s ease;
    border-radius: 30px;
  }

  // tbody tr:hover {
  //   background: var(--primary-100);
  // }

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
  color: var(--gray-700);
`;