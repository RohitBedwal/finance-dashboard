import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 20px;
  padding:0px 10px;
  border: 0.1px solid black;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Name = styled.span`
  font-size: var(--fs-sm);
  font-weight: var(--fw-medium);
`;

export const Email = styled.span`
  font-size: var(--fs-xs);
  color: var(--gray-500);
`;