import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  margin-top: 24px;
`;

export const Title = styled.div`
  font-size: var(--fs-sm);
  color: var(--gray-500);
`;

export const Value = styled.h3`
  margin: 8px 0;
`;

export const Description = styled.div`
  font-size: var(--fs-xs);
  color: var(--gray-400);
`;