import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  padding: var(--m-24);
`;

const LandingPage = () => {
  return (
    <Container>
      <h1>Landing</h1>
      <p>
        Go to <Link to="/dashboard">Dashboard</Link>
      </p>
    </Container>
  );
};

export default LandingPage;
