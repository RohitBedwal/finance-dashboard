import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: rgba(17, 17, 19, 0.55);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const Modal = styled.div`
  width: 100%;
  max-width: 440px;
  background: var(--color-bg);
  border: 1px solid var(--border-color);
  border-radius: 24px;
  padding: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 6px;
`;

export const Title = styled.h2`
  font-size: var(--fs-xl);
  color: var(--text-color);
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

export const Subtitle = styled.p`
  font-size: var(--fs-xs);
  color: var(--muted-text);
  margin-bottom: 18px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Label = styled.label`
  font-size: var(--fs-xs);
  font-weight: var(--fw-medium);
  color: var(--text-color);
`;

export const Input = styled.input`
  height: 44px;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 0 14px;
  background: var(--color-bg);
  color: var(--text-color);
  font-size: var(--fs-sm);
  font-family: var(--font-primary);
  outline: none;
  transition: border-color 0.15s ease;

  &:focus {
    border-color: var(--primary-600);
  }

  &::placeholder {
    color: var(--muted-text);
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 6px;
`;

export const SkipButton = styled.button`
  height: 44px;
  padding: 0 18px;
  border: 1px solid var(--border-color);
  border-radius: 999px;
  background: transparent;
  color: var(--muted-text);
  font-size: var(--fs-sm);
  font-family: var(--font-primary);
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: var(--gray-400);
    color: var(--text-color);
  }
`;

export const SaveButton = styled.button`
  height: 44px;
  padding: 0 22px;
  border: none;
  border-radius: 999px;
  background: var(--primary-600);
  color: white;
  font-size: var(--fs-sm);
  font-weight: var(--fw-medium);
  font-family: var(--font-primary);
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover:not(:disabled) {
    background: var(--primary-700);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
