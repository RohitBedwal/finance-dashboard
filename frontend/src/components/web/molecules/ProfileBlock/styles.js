import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
`;

export const Container = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 30px;
  padding: 2px;
  border: 1px solid var(--gray-300);
  background: var(--color-bg);
  cursor: pointer;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

export const Name = styled.span`
  font-size: var(--fs-sm);
  font-weight: var(--fw-medium);
  color: var(--text-color);
`;

export const Email = styled.span`
  font-size: var(--fs-xs);
  color: var(--gray-500);
`;

export const Chevron = styled.span`
  color: var(--gray-500);
  font-size: 12px;
  padding-right:5px;
`;

export const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 240px;
  background: var(--color-bg);
  border: 1px solid var(--gray-300);
  border-radius: 16px;
  box-shadow: 0 10px 24px rgba(17, 17, 19, 0.08);
  padding: 8px;
  z-index: 50;
  display: grid;
  gap: 6px;
`;

export const Option = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  border: none;
  border-radius: 12px;
  background: ${({ $isActive }) => ($isActive ? "var(--primary-100)" : "var(--color-bg)")};
  padding: 8px;
  cursor: pointer;
  text-align: left;

  &:hover {
    background: var(--primary-100);
  }
`;

export const OptionInfo = styled.div`
  display: flex;
  flex-direction: column;
`;