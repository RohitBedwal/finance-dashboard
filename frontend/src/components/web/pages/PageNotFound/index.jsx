import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: var(--m-24);
`;

const PageNotFound = () => {
  return (
    <Container>
      <h1>404</h1>
      <p>Page not found</p>
    </Container>
  );
};

export default PageNotFound;
