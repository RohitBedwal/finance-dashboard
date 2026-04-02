import styled from "styled-components";

export const Container = styled.header`
  grid-area: navbar;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: var(--navbar-height);
  padding: 0 var(--m-24);
  background-color: var(--white);
`;

export const Actions = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;