import styled from "styled-components";

export const Container = styled.aside`
  width: 250px;
  height: 100vh;
  background: var(--white);
  border-right: 1px solid var(--gray-200);
  padding: 24px;
`;

export const Logo = styled.h2`
  margin-bottom: 40px;
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const MenuItem = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  cursor: pointer;
  font-size: var(--fs-sm);

  &:hover {
    color: var(--primary-600);
  }
`;