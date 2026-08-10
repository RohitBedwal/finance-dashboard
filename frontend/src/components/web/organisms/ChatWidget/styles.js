import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(12px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

export const FAB = styled.button`
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 9999;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, var(--primary-500), var(--primary-700));
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(132, 112, 255, 0.35);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.08);
    box-shadow: 0 6px 28px rgba(132, 112, 255, 0.45);
  }

  svg {
    width: 26px;
    height: 26px;
    fill: currentColor;
    transition: transform 0.25s ease;
  }

  ${({ $isOpen }) =>
    $isOpen &&
    `
    svg {
      transform: rotate(90deg);
    }
  `}

  @media (max-width: 768px) {
    display: ${({ $isOpen }) => ($isOpen ? "none" : "flex")};
  }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9998;
  background: transparent;
`;

export const Window = styled.div`
  position: fixed;
  bottom: 96px;
  right: 28px;
  z-index: 9999;
  width: 380px;
  height: 520px;
  background: var(--color-bg);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.18);
  animation: ${fadeIn} 0.2s ease;

  :root[data-theme="dark"] & {
    box-shadow: 0 12px 48px rgba(0, 0, 0, 0.45);
  }

  @media (max-width: 768px) {
    inset: 0;
    width: 100%;
    height: 100%;
    max-height: 100dvh;
    border-radius: 0;
    border: none;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 18px;
  border-bottom: 1px solid var(--border-color);
  background: var(--color-bg);
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const HeaderAvatar = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--primary-400), var(--primary-600));
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    font-size: 14px;
    font-weight: var(--fw-semibold);
    color: white;
  }
`;

export const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HeaderTitle = styled.span`
  font-size: var(--fs-sm);
  font-weight: var(--fw-semibold);
  color: var(--text-color);
`;

export const HeaderSubtitle = styled.span`
  font-size: var(--fs-xs);
  color: var(--muted-text);
`;

export const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: var(--muted-text);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;

  &:hover {
    background: var(--surface-hover);
    color: var(--text-color);
  }

  svg {
    width: 18px;
    height: 18px;
    stroke: currentColor;
    stroke-width: 2;
    fill: none;
  }
`;
