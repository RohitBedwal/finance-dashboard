import styled from "styled-components";

export const Select = styled.select`
  // height: 42px;
  border-radius: 30px;
  border: 1px solid var(--gray-200);
  padding: 5px 15px;
  font-family: var(--font-primary);

  &:focus {
    border-color: var(--primary-600);
    outline: none;
  }
`;