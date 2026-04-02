import styled from "styled-components";

export const Input = styled.input`
  height: 44px;
  border-radius: 10px;
  border: 1px solid var(--gray-200);
  padding: 0 14px;
  font-family: var(--font-primary);

  &:focus {
    border-color: var(--primary-600);
    outline: none;
  }
`;