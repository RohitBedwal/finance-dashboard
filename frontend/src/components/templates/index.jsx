import React from "react";
import styled from "styled-components";
import Sidebar from "../web/organisms/Sidebar/index";
import NavigationShell from "./NavigationShell";

export const Layout = styled.div`
  display: grid;
  min-height: 100vh;

  grid-template-columns: var(--sidebar-width-expanded) 1fr;
  grid-template-rows: var(--navbar-height) 1fr;

  grid-template-areas:
    "sidebar navbar"
    "sidebar main";

  @media (max-width: 1400px) {
    grid-template-columns: var(--sidebar-width) 1fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;

    grid-template-areas:
      "navbar"
      "main";
  }
`;

const AppWrapper = ({ children }) => {
  return (
    <Layout>
        <NavigationShell/>
      {children}
    </Layout>
  );
};


export default AppWrapper;