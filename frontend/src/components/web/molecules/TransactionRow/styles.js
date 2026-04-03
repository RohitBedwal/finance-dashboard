import styled from "styled-components";

export const Row = styled.tr`
  // border-bottom: 1px solid var(--gray-600);
  
  // &:hover {
  //   background: var(--primary-100);
  // }

  td {
    padding: 16px 10px;
    font-size: var(--fs-sm);
  }

  td.Income {
    color: var(--success-800);
    font-weight: var(--fw-medium);
  }

  td.Expense {
    color: var(--danger-500);
    font-weight: var(--fw-medium);
  }
`;