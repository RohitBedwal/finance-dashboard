import styled from "styled-components";

export const ChartSection = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  margin-top: 24px;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

export const ChartTitle = styled.h3`
  font-size: var(--fs-lg);
  margin-bottom: 16px;
`;

export const ChartPlaceholder = styled.div`
  height: 220px;
  border-radius: 12px;
  background: var(--primary-100);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--fs-sm);
  color: var(--gray-500);
`;