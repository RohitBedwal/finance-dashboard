import React from "react";
import styled from "styled-components";

const Container = styled.main`
  grid-area: main;
  height: calc(100vh - var(--navbar-height));
  overflow-y: auto;
  padding: 24px;
  background: var(--color-bg);
`;

const Main = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Main;