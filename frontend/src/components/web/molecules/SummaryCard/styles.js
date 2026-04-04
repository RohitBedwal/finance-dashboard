import styled from "styled-components";

export const Container = styled.div`
  background: var(--white);
  border-radius: 30px;
  padding: 3px 3px 22px 22px;
  border: 1px solid var(--gray-200);
`;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.span`
  font-size: var(--fs-lg);
  color: var(--black);
  font-weight: 500;

`;

export const RedirectButton = styled.button`
  width: 50px;
  height: 50px;

  border-radius: 50%;
  border: 1px solid var(--gray-200);

  display: flex;
  align-items: center;
  justify-content: center;

  background: transparent;
  cursor: pointer;

  transition: 0.2s ease;

  &:hover {
    background: var(--primary-100);
  }
`;

export const Amount = styled.h2`
  margin: 18px 0 12px;
  font-size: 29px;
  font-weight: 500;

  span {
    font-size: 29px;
    color: var(--gray-200);
    margin-left: 2px;
  }
`;

export const ChangeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ChangeText = styled.span`
  font-size: var(--fs-xs);
  color: var(--gray-300);
`;