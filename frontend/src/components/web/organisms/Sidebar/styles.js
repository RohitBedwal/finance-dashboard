import styled from "styled-components";

export const Container = styled.aside`
  grid-area: sidebar;
  width: 100%;
  height: 100%;
  background-color: var(--primary-100);
  padding: 0px 24px;


  @media (max-width: 768px) {
    display: none;
  }
`;

export const Logo = styled.h2`
  font-size: var(--fs-lg);
  margin-bottom: 40px;
  align-items:center;
  display:flex;
  height: 80px;

`;

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const MenuItem = styled.button`
  appearance: none;
  border: 0;
  background: transparent;
  text-align: left;
  padding: 10px 12px;
  border-radius: 25px;

  display: flex;
  gap: 12px;
  align-items: center;
  cursor: pointer;
  font-size: var(--fs-sm);

  color: var(--gray-600);

  ${({ $active }) =>
    $active
      ? `
    background-color: var(--primary-600);
    color: var(--white);
  `
      : ""};

  // &:hover {
  //   color: var(--primary-600);
  // }
`;

export const MenuItemIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;

  svg {
    display: block;
    fill: var(--gray-600);
  }

  ${({ $active }) => ($active ? `
    color: var(--primary-800);
    svg {
    display: block;
    fill: var(--white);
  }
    ` : "")};
`;

export const MenuItemLabel = styled.span`
  font-size: var(--fs-sm);
  font-weight: ${({ $active }) => ($active ? "var(--fw-medium)" : "var(--fw-regular)")};
`;