import React from "react";
import styled from "styled-components";

const Container = styled.main`
  width: 100%;
  min-height: 100vh;
  margin-left: 250px;
  background: var(--primary-100);

  transition: margin-left 0.35s cubic-bezier(0.4, 0, 0.2, 1),
              width 0.35s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 1000px) {
    width: 100%;
    margin-left: 70px;
  }
`;

const Main = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Main;