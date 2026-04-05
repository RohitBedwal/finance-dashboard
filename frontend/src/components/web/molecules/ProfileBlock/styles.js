import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  z-index: 500;
`;

export const Container = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 30px;
  padding: 2px;
  border: 1px solid var(--border-color);
  background: var(--color-bg);
  cursor: pointer;

  @media (max-width: 767px) {
    gap: 0;
    padding: 0;
    border: none;
    background: transparent;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;

  @media (max-width: 767px) {
    display: none;
  }
`;

export const Name = styled.span`
  font-size: var(--fs-sm);
  font-weight: var(--fw-medium);
  color: var(--text-color);
`;

export const Email = styled.span`
  font-size: var(--fs-xs);
  color: var(--muted-text);
`;

export const Chevron = styled.span`
  color: var(--muted-text);
  font-size: 12px;
  padding-right:5px;

  @media (max-width: 767px) {
    display: none;
  }
`;

export const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 240px;
  background: var(--color-bg);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  box-shadow: 0 10px 24px rgba(17, 17, 19, 0.08);
  padding: 8px;
  z-index: 500;
  display: grid;
  gap: 6px;
`;

export const Option = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  border: none;
  border-radius: 12px;
  background: ${({ $isActive }) => ($isActive ? "var(--select-option-selected-bg)" : "var(--color-bg)")};
  padding: 8px;
  cursor: pointer;
  text-align: left;

  &:hover {
    background: var(--select-option-hover-bg);
  }
`;

export const OptionInfo = styled.div`
  display: flex;
  flex-direction: column;
`;