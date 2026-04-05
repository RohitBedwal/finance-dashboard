import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 767px) {
    width: 100%;
  }
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: fit-content;

  @media (max-width: 767px) {
    width: 100%;

    > * {
      flex: 1;
    }
  }
`;

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;

  border-radius: 50%;
  border: 1px solid var(--border-color);

  background: var(--color-bg);
  cursor: pointer;

  transition: all 0.2s ease;

  svg {
    width: 20px;
    height: 20px;
    color: var(--text-color);
  }

  &:hover {
    background: var(--surface-hover);
  }

  @media (max-width: 767px) {
    width: 50px;
    height: 50px;

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

export const DateRange = styled.div`
  display: flex;
  align-items: center;

  height: 42px;
  padding: 0 var(--m-16);

  border-radius: 999px;
  border: 1px solid var(--border-color);

  background: var(--color-bg);

  position: relative;
  z-index: 200;
  min-width: 0;

  .react-datepicker-wrapper {
    width: 100%;
  }

  input {
    border: none;
    outline: none;
    font-size: var(--fs-sm);
    font-family: var(--font-primary);
    color: var(--gray-700);
    background: transparent;
    width: 100%;
    cursor: pointer;
  }

  @media (max-width: 767px) {
    flex: 1;
    height: 50px;
    padding: 0 12px;

    input {
      font-size: var(--fs-xs);
    }
  }
`;
