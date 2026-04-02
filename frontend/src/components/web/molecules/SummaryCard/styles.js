import styled from "styled-components";

export const Container = styled.div`
  background: var(--white);
  border-radius: 30px;
  padding: 18px;
  
  border: 1px solid var(--gray-200);
`;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Title = styled.span`
  font-size: var(--fs-sm);
  color: var(--gray-500);
`;

export const Amount = styled.h3`
  margin: 10px 0;
  font-size: var(--fs-xl);

`;