import styled, { css } from "styled-components";

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

  ${({ $mobileDrawer }) =>
    $mobileDrawer &&
    css`
      position: relative;
      height: 100%;
      width: 100%;
      padding: 0 18px;
      z-index: 1101;

      @media (min-width: 769px) {
        display: none;
      }

      @media (max-width: 768px) {
        display: flex;
      }
    `}

  @media (max-width: 1400px) {
    ${({ $mobileDrawer }) =>
      !$mobileDrawer &&
      css`
    width: var(--sidebar-width);
    padding: 0 10px;
    overflow: visible;

    &:hover {
      width: var(--sidebar-width-expanded);
      padding: 0 24px;
      box-shadow: 8px 0 20px rgba(0, 0, 0, 0.06);
    }
    `}
  }

  @media (max-width: 768px) {
    ${({ $mobileDrawer }) =>
      !$mobileDrawer &&
      css`
        display: none;
      `}
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
    ${({ $mobileDrawer }) =>
      !$mobileDrawer &&
      css`
        justify-content: center;
        gap: 0;
      `}
  }

  ${Container}:hover & {
    @media (max-width: 1400px) {
      ${({ $mobileDrawer }) =>
        !$mobileDrawer &&
        css`
          justify-content: flex-start;
          gap: 12px;
        `}
    }
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
    ${({ $mobileDrawer }) =>
      !$mobileDrawer &&
      css`
        opacity: 0;
        width: 0;
        overflow: hidden;
        white-space: nowrap;
        transition: opacity 0.2s ease;
      `}
  }

  ${Container}:hover & {
    @media (max-width: 1400px) {
      opacity: 1;
      width: auto;
      overflow: visible;
    }
  }

`;

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  flex: 1;

  @media (max-width: 1400px) {
    ${({ $mobileDrawer }) =>
      !$mobileDrawer &&
      css`
    align-items: center;
    gap: 16px;
    `}
  }

  ${Container}:hover & {
    @media (max-width: 1400px) {
      ${({ $mobileDrawer }) =>
        !$mobileDrawer &&
        css`
          align-items: stretch;
        `}
    }
  }
`;

export const ThemeToggleWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding: 12px 0 18px;

  @media (max-width: 1400px) {
    ${({ $mobileDrawer }) =>
      !$mobileDrawer &&
      css`
    justify-content: center;
    `}
  }

  ${Container}:hover & {
    @media (max-width: 1400px) {
      ${({ $mobileDrawer }) =>
        !$mobileDrawer &&
        css`
          justify-content: flex-start;
        `}
    }
  }
`;

export const ThemeToggleButton = styled.button`
  position: relative;
  width: 96px;
  height: 44px;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  background: var(--gray-100);
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  cursor: pointer;
  transition: background-color 0.24s ease, border-color 0.24s ease,
    box-shadow 0.24s ease;

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--primary-300);
  }

  :root[data-theme="dark"] & {
    background: var(--gray-800);
    border-color: var(--gray-600);
  }

  @media (max-width: 1400px) {
    ${({ $mobileDrawer }) =>
      !$mobileDrawer &&
      css`
        width: 44px;
        padding: 0;
        justify-content: center;
      `}
  }

  ${Container}:hover & {
    @media (max-width: 1400px) {
      ${({ $mobileDrawer }) =>
        !$mobileDrawer &&
        css`
          width: 96px;
          padding: 0 15px;
          justify-content: space-between;
        `}
    }
  }
`;

export const ThemeIcon = styled.span`
  font-size: 20px;
  line-height: 1;
  width: 20px;
  text-align: center;
  color: ${({ $active }) => ($active ? "var(--white)" : "var(--gray-900)")};
  opacity: ${({ $active }) => ($active ? 1 : 0.95)};
  z-index: 1;
  transition: color 0.24s ease, opacity 0.24s ease;

  :root[data-theme="dark"] & {
    color: ${({ $active }) => ($active ? "var(--white)" : "var(--gray-200)")};
  }

  @media (max-width: 1400px) {
    ${({ $mobileDrawer, $active }) =>
      !$mobileDrawer &&
      css`
        display: ${$active ? "inline-block" : "none"};
        position: static;
        transform: none;
        opacity: 1;
      `}
  }

  ${Container}:hover & {
    @media (max-width: 1400px) {
      ${({ $mobileDrawer }) =>
        !$mobileDrawer &&
        css`
          position: static;
          transform: none;
          opacity: ${({ $active }) => ($active ? 1 : 0.95)};
        `}
    }
  }
`;

export const ThemeToggleThumb = styled.span`
  position: absolute;
  top: 2px;
  left: 2px;
  width: 40px;
  height: 40px;
  border-radius: 999px;
  background: var(--primary-600);
  transform: ${({ $active }) => ($active ? "translateX(52px)" : "translateX(0)")};
  transition: transform 0.24s ease, background-color 0.24s ease;

  :root[data-theme="dark"] & {
    background: var(--primary-500);
  }

  @media (max-width: 1400px) {
    ${({ $mobileDrawer }) =>
      !$mobileDrawer &&
      css`
        width: 38px;
        height: 38px;
        top: 2px;
        left: 2px;
        transform: translateX(0);
      `}
  }

  ${Container}:hover & {
    @media (max-width: 1400px) {
      ${({ $mobileDrawer }) =>
        !$mobileDrawer &&
        css`
          width: 40px;
          height: 40px;
          top: 2px;
          left: 2px;
          transform: ${({ $active }) => ($active ? "translateX(52px)" : "translateX(0)")};
        `}
    }
  }
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
    ${({ $mobileDrawer }) =>
      !$mobileDrawer &&
      css`
    justify-content: center;
    gap: 0;
    width: 44px;
    height: 44px;
    padding: 0;
    border-radius: 999px;
    `}
  }

  ${Container}:hover & {
    @media (max-width: 1400px) {
      ${({ $mobileDrawer }) =>
        !$mobileDrawer &&
        css`
          justify-content: flex-start;
          gap: 12px;
          width: 100%;
          height: auto;
          padding: 10px 12px;
          border-radius: 25px;
        `}
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
    ${({ $mobileDrawer }) =>
      !$mobileDrawer &&
      css`
    opacity: 0;
    width: 0;
    overflow: hidden;
    white-space: nowrap;
    transition: opacity 0.2s ease;
    `}
  }

  ${Container}:hover & {
    @media (max-width: 1400px) {
      ${({ $mobileDrawer }) =>
        !$mobileDrawer &&
        css`
          opacity: 1;
          width: auto;
          overflow: visible;
        `}
    }
  }
`;