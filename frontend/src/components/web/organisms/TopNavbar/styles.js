import styled from "styled-components";

export const Container = styled.header`
  grid-area: navbar;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: var(--navbar-height);
  padding: 0 var(--m-24);
  background-color: var(--color-bg);
`;

export const Actions = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

export const IconButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid var(--gray-300);
  background: var(--color-bg);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--gray-700);
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: var(--primary-100);
  }
`;