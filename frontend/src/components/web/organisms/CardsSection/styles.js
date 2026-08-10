import styled, { css } from "styled-components";

export const Section = styled.section`
  margin-bottom: 24px;
  min-width: 0;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
`;

export const Title = styled.h3`
  font-size: var(--fs-lg);
  color: var(--text-color);

  @media (max-width: 768px) {
    display: none;
  }
`;

export const MobileOnly = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 0 10px;
  }
`;

export const DesktopOnly = styled.div`
  display: block;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Scroll = styled.div`
  overflow-x: auto;
  padding: 8px 10px 12px;
  scrollbar-width: thin;
`;

export const Row = styled.div`
  display: flex;
  gap: 16px;
  min-width: max-content;
`;

export const Card = styled.div`
  width: 300px;
  height: 172px;
  border-radius: 20px;
  background: ${({ $gradient }) => $gradient};
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  color: white;
  position: relative;
  flex-shrink: 0;
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  box-shadow: ${({ $selected }) =>
    $selected
      ? "0 0 0 3px var(--color-bg), 0 0 0 6px var(--primary-600), 0 12px 30px rgba(17, 17, 19, 0.25)"
      : "0 10px 28px rgba(17, 17, 19, 0.18)"};

  &:hover {
    transform: translateY(-2px);
  }

  &::after {
    content: "";
    position: absolute;
    top: -60px;
    right: -60px;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.08);
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
  }
`;

export const CardTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1;
`;

export const BankName = styled.span`
  font-size: var(--fs-sm);
  font-weight: var(--fw-bold);
  letter-spacing: 0.3px;
`;

export const DeleteButton = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.15);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover:not(:disabled) {
    background: rgba(232, 56, 56, 0.85);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: 12px;
    height: 12px;
    stroke: currentColor;
    stroke-width: 2.5;
    fill: none;
  }
`;

export const NameTrigger = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  font-family: var(--font-primary);
  font-size: var(--fs-sm);
  font-weight: var(--fw-bold);
  letter-spacing: 0.3px;
  cursor: pointer;
  z-index: 1;
  transition: background 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.22);
  }
`;

export const SwitchButton = styled.span`
  display: inline-flex;
  color: rgba(255, 255, 255, 0.85);

  svg {
    width: 16px;
    height: 16px;
    fill: currentColor;
    transition: transform 0.2s ease;
    ${({ $open }) => $open && css`transform: rotate(180deg);`}
  }
`;

export const MobileCardWrap = styled.div`
  position: relative;
  width: 100%;
`;

export const SwitchMenu = styled.div`
  position: absolute;
  top: 46px;
  left: 0;
  width: 220px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 14px;
  background: ${({ $gradient }) => $gradient};
  color: #fff;
  overflow-y: auto;
  max-height: 150px;
  box-shadow: 0 12px 30px rgba(17, 17, 19, 0.3);
  z-index: 5;
`;

export const SwitchItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 11px 14px;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  background: ${({ $active }) => ($active ? "rgba(255, 255, 255, 0.18)" : "transparent")};
  color: #fff;
  font-size: var(--fs-sm);
  font-weight: var(--fw-medium);
  font-family: var(--font-primary);
  cursor: pointer;
  text-align: left;
  transition: background 0.15s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.12);
  }

  span:last-child {
    color: rgba(255, 255, 255, 0.7);
    font-weight: var(--fw-regular);
  }
`;

export const ChipIcon = styled.div`
  margin-top: 20px;
  z-index: 1;

  svg {
    width: 34px;
    height: 24px;
    fill: rgba(255, 255, 255, 0.85);
    stroke: rgba(0, 0, 0, 0.2);
  }
`;

export const Number = styled.div`
  margin-top: 10px;
  font-size: 16px;
  font-weight: var(--fw-medium);
  letter-spacing: 2.5px;
  z-index: 1;
`;

export const CardBottom = styled.div`
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1;
`;

export const CardName = styled.span`
  font-size: var(--fs-xs);
  font-weight: var(--fw-medium);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  opacity: 0.95;
`;

export const BankAbbr = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--fs-sm);
  font-weight: var(--fw-bold);
`;

export const AddTile = styled.button`
  width: 300px;
  height: 172px;
  border-radius: 20px;
  border: 2px dashed var(--border-color);
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.15s ease;

  &:hover {
    border-color: var(--primary-400);
    background: var(--primary-100);
  }
`;

export const AddIcon = styled.span`
  font-size: 26px;
  font-weight: var(--fw-light);
  color: var(--primary-600);
  line-height: 1;
`;

export const AddText = styled.span`
  font-size: var(--fs-sm);
  color: var(--primary-600);
  font-weight: var(--fw-medium);
`;

export const Empty = styled.div`
  border: 2px dashed var(--border-color);
  border-radius: 20px;
  padding: 28px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
`;

export const EmptyText = styled.p`
  font-size: var(--fs-sm);
  color: var(--muted-text);
`;

export const EmptyButton = styled.button`
  height: 38px;
  padding: 0 20px;
  border: none;
  border-radius: 999px;
  background: var(--primary-600);
  color: white;
  font-size: var(--fs-sm);
  font-weight: var(--fw-medium);
  font-family: var(--font-primary);
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: var(--primary-700);
  }
`;
