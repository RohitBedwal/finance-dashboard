import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const Modal = styled.div`
  width: 440px;
  background: var(--color-bg);
  border-radius: 24px;
  padding: 28px;
  position: relative;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 38px;
  height: 38px;
  border-radius: 999px;
  border: 1px solid var(--gray-300);
  background: var(--color-bg);
  cursor: pointer;
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 20px;

  p {
    color: var(--gray-500);
    font-size: var(--fs-sm);
    margin-top: 2px;
  }
`;

export const Title = styled.h3`
  font-size: var(--fs-xl);
  color: var(--text-color);
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;

  label {
    font-size: var(--fs-sm);
    color: var(--gray-700);
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  border: 1px solid var(--gray-300);
  border-radius: 999px;
`;

export const Footer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;
