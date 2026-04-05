import styled from "styled-components";

export const Input = styled.input`
  height: 42px;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  padding: 0 16px;
  font-family: var(--font-primary);
  outline: none;

  &:focus {
    border-color: var(--primary-600);
  }
`;