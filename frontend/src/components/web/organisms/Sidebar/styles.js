import styled from "styled-components";

export const Container = styled.aside`
  grid-area: sidebar;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: var(--sidebar-bg);
  padding: 0px 24px;
  position: relative;
  z-index: var(--sidebar-z-index);
  transition: width 0.25s ease, padding 0.25s ease;

  @media (max-width: 1400px) {
    width: var(--sidebar-width);
    padding: 0 10px;
    overflow: visible;

    &:hover {
      width: var(--sidebar-width-expanded);
      padding: 0 24px;
      box-shadow: 8px 0 20px rgba(0, 0, 0, 0.06);
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Logo = styled.h2`
  font-size: var(--fs-lg);
  margin-bottom: 28px;
  align-items: center;
  justify-content: flex-start;
  display: flex;
  gap: 12px;
  height: 80px;
  width: 100%;
  white-space: nowrap;

  @media (max-width: 1400px) {
    justify-content: center;
    gap: 0;
  }
`;

export const LogoMark = styled.span`
  display: inline-flex;
  width: 44px;
  height: 44px;
  border-radius: 999px;
  align-items: center;
  justify-content: center;
  background: var(--text-color);
  position: relative;
  flex-shrink: 0;

  @media (max-width: 1400px) {
    width: 38px;
    height: 38px;
  }
`;

export const LogoStem = styled.span`
  position: absolute;
  left: 10px;
  top: 8px;
  width: 10px;
  height: 26px;
  border-radius: 10px;
  background: var(--primary-600);
`;

export const LogoTop = styled.span`
  position: absolute;
  left: 18px;
  top: 8px;
  width: 18px;
  height: 8px;
  border-radius: 10px;
  background: var(--color-bg);
`;

export const LogoMid = styled.span`
  position: absolute;
  left: 18px;
  top: 19px;
  width: 13px;
  height: 8px;
  border-radius: 10px;
  background: var(--primary-300);
`;

export const LogoFull = styled.span`
  color: var(--text-color);
  font-weight: var(--fw-semibold);
  letter-spacing: 0.2px;

  @media (max-width: 1400px) {
    display: none;
  }

  @media (max-width: 1400px) {
    opacity: 0;
    width: 0;
    overflow: hidden;
    transition: opacity 0.2s ease;
  }

  ${Container}:hover & {
    @media (max-width: 1400px) {
      display: inline;
    }
  }

`;

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  flex: 1;

  @media (max-width: 1400px) {
    align-items: center;
    gap: 16px;
  }

  ${Container}:hover & {
    @media (max-width: 1400px) {
      align-items: stretch;
    }
  }
`;

export const ThemeToggleWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding: 12px 0 18px;

  @media (max-width: 1400px) {
    justify-content: center;
  }

  ${Container}:hover & {
    @media (max-width: 1400px) {
      justify-content: flex-start;
    }
  }
`;

export const ThemeToggleButton = styled.button`
  position: relative;
  width: 68px;
  height: 34px;
  border-radius: 999px;
  border: 1px solid var(--gray-300);
  background: ${({ $active }) => ($active ? "var(--gray-700)" : "var(--color-bg)")};
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  cursor: pointer;
  transition: background-color 0.25s ease, border-color 0.25s ease;
`;

export const ThemeIcon = styled.span`
  font-size: 12px;
  line-height: 1;
  opacity: ${({ $active }) => ($active ? 1 : 0.45)};
  z-index: 1;
  transition: opacity 0.25s ease;
`;

export const ThemeToggleThumb = styled.span`
  position: absolute;
  top: 3px;
  left: 3px;
  width: 26px;
  height: 26px;
  border-radius: 999px;
  background: var(--primary-600);
  transform: ${({ $active }) => ($active ? "translateX(34px)" : "translateX(0)")};
  transition: transform 0.25s ease;
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
  width: 100%;
  transition: background-color 0.2s ease, color 0.2s ease;

  color: var(--text-color);

  @media (max-width: 1400px) {
    justify-content: center;
    gap: 0;
    width: 44px;
    height: 44px;
    padding: 0;
    border-radius: 999px;
  }

  ${Container}:hover & {
    @media (max-width: 1400px) {
      justify-content: flex-start;
      gap: 12px;
      width: 100%;
      height: auto;
      padding: 10px 12px;
      border-radius: 25px;
    }
  }

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
  flex-shrink: 0;

  svg {
    display: block;
    fill: var(--text-color);
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

  @media (max-width: 1400px) {
    opacity: 0;
    width: 0;
    overflow: hidden;
    white-space: nowrap;
    transition: opacity 0.2s ease;
  }

  ${Container}:hover & {
    @media (max-width: 1400px) {
      opacity: 1;
      width: auto;
      overflow: visible;
    }
  }
`;