import styled, { css } from "styled-components";

export const Container = styled.header`
  grid-area: navbar;
  position: relative;
  z-index: 400;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: var(--navbar-height);
  padding: 0 var(--m-24);
  background-color: var(--color-bg);

  @media (max-width: 767px) {
    justify-content: flex-start;
    gap: 8px;
    align-items: center;
  }
`;

export const DesktopPageHeaderSlot = styled.div`
  display: block;

  @media (max-width: 767px) {
    display: none;
  }
`;

export const Actions = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;

  @media (max-width: 767px) {
    width: auto;
    justify-content: flex-start;
    gap: 8px;
    order: 3;
  }
`;

export const IconButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid var(--gray-300);
  background: var(--color-bg);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--text-color);
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: var(--surface-hover);
  }

  @media (max-width: 767px) {
    display: none;
  }
`;

export const HamburgerButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid var(--gray-300);
  background: var(--color-bg);
  display: none;
  align-items: center;
  justify-content: center;
  color: var(--text-color);
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;

  svg {
    display: block;
    flex-shrink: 0;
  }

  &:hover {
    background: var(--surface-hover);
    transform: scale(1.03);
  }

  @media (max-width: 767px) {
    display: inline-flex;
    order: 1;
  }
`;

export const MobilePageHeaderSlot = styled.div`
  display: none;

  @media (max-width: 767px) {
    display: flex;
    flex: 1;
    min-width: 0;
    justify-content: center;
    order: 2;
  }
`;

export const MobileSidebarOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 1100;
  display: none;
  opacity: ${({ $closing }) => ($closing ? 0 : 1)};
  transition: opacity 0.24s ease;

  @media (max-width: 767px) {
    display: block;
  }
`;

export const MobileSidebarPanel = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: min(72vw, 280px);
  box-shadow: 12px 0 28px rgba(0, 0, 0, 0.16);
  transform: ${({ $closing }) => ($closing ? "translateX(-100%)" : "translateX(0)")};
  transition: transform 0.28s ease;
  will-change: transform;

`;