import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.25);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 999;
`;

export const Modal = styled.div`
  width: 450px;
  background: var(--color-bg);
  border-radius: 24px;
  padding: 32px;
  position: relative;
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 24px;
  p{
  font-size:13px;
  color:var(--muted-text)
  }
`;

export const Title = styled.h2`
  font-size: var(--fs-xl);
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

export const FullRow = styled.div`
  grid-column: span 2;
`;

export const Input = styled.input`
  width: 100%;
  padding: 14px;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  background: var(--color-bg);
  color: var(--text-color);
`;

export const Select = styled.select`
  width: 100%;
  padding: 14px;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  background: var(--color-bg);
  color: var(--text-color);
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;

  width: 40px;
  height: 40px;

  border-radius: 50%;
  border: 1px solid var(--border-color);

  background: var(--surface-hover);
  color: var(--text-color);
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 18px;
`;
export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 14px;
  }
`;

export const AddCategoryRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 6px;
`;

export const SmallInput = styled.input`
  flex: 1;
  padding: 8px;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  background: var(--color-bg);
  color: var(--text-color);
`;

export const DateWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CalendarIcon = styled.div`
  width: 40px;
  height: 40px;

  border-radius: 50%;
  border: 1px solid var(--border-color);

  display: flex;
  align-items: center;
  justify-content: center;
`;