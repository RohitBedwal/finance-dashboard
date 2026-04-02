import styled from "styled-components";

export const Container = styled.div`
  background: var(--white);
  border-radius: 16px;
  padding: 20px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    text-align: left;
    padding-bottom: 14px;
    font-size: var(--fs-sm);
    color: var(--gray-500);
  }
`;