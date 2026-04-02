import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Left = styled.div`
  display: flex;
  flex-direction: column;
  
`;

export const Title = styled.h2`
  font-size: var(--fs-xl);
  font-weight: var(--fw-medium);
  color: var(--gray-900);
`;

export const Description = styled.p`
  font-size: var(--fs-sm);
  color: var(--gray-500);
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;