import styled from "styled-components";

export const Container = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: var(--fs-sm);
  color: var(--gray-700);
`;

export const Dot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ $dashed, $color }) => ($dashed ? "transparent" : $color)};
  border: ${({ $dashed, $color }) =>
    $dashed ? `2px solid ${$color}` : "none"};
  opacity: ${({ $dashed }) => ($dashed ? 0.8 : 1)};
`;
