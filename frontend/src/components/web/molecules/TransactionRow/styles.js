import styled from "styled-components";

export const Row = styled.tr`
  border-bottom: 1px solid var(--gray-200);
  transition: background 0.2s ease;

  &:hover {
    background: var(--primary-100);
  }

  td {
    padding: 14px 10px;
    font-size: var(--fs-sm);
    font-family: var(--font-primary);
    color: var(--gray-700);
    text-align: left;
  }

  td:last-child {
    width: 120px;
  }
`;