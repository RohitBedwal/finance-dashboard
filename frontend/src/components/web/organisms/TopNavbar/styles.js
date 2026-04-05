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
    box-shadow: 0 1px 0 var(--border-color);
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

export const SearchArea = styled.div`
  position: relative;

  @media (max-width: 767px) {
    display: none;
  }
`;

export const SearchDropdown = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: min(340px, 40vw);
  z-index: 20;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  transform: ${({ $open }) => ($open ? "translateY(0)" : "translateY(-6px)")};
  pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
  transition: opacity 0.2s ease, transform 0.2s ease;

  @media (max-width: 1024px) {
    width: min(280px, 44vw);
  }
`;

export const SearchForm = styled.form`
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid var(--border-color);
  border-radius: 999px;
  background: var(--color-bg);
  padding: 0 12px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 8px 24px rgba(17, 17, 19, 0.08);

  &:focus-within {
    border-color: var(--primary-500);
    box-shadow: 0 0 0 3px var(--primary-200);
  }
`;

export const SearchSubmitButton = styled.button`
  border: 1px solid var(--border-color);
  background: var(--surface-hover);
  color: var(--muted-text);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  cursor: pointer;
  width: 24px;
  height: 24px;
  border-radius: 999px;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background: var(--primary-100);
    color: var(--text-color);
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  min-width: 0;
  border: 0;
  outline: none;
  background: transparent;
  color: var(--text-color);
  font-size: var(--fs-sm);
  font-family: var(--font-primary);

  &::placeholder {
    color: var(--muted-text);
  }

  &::-webkit-search-cancel-button {
    -webkit-appearance: none;
    appearance: none;
  }
`;

export const ClearSearchButton = styled.button`
  border: 0;
  width: 24px;
  height: 24px;
  border-radius: 999px;
  background: transparent;
  color: var(--muted-text);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background: var(--color-bg);
    color: var(--text-color);
  }
`;

export const IconButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid var(--border-color);
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
  border: 1px solid var(--border-color);
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