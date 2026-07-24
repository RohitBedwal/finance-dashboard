import styled from "styled-components";

export const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  min-height: calc(100vh - 140px);

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

export const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const SectionTitle = styled.h3`
  font-size: var(--fs-lg);
  font-weight: 500;
  color: var(--text-color);
  margin-bottom: 4px;
`;
