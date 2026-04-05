import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ $columns }) => $columns || 4}, 1fr);
  gap: 20px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;