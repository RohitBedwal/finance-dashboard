import styled from "styled-components";

export const Container = styled.div`
  background: var(--white);
  border-radius: 30px;
  padding: 3px 3px 22px 22px;
  border: 1px solid var(--gray-200);
`;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.span`
  font-size: var(--fs-lg);
  color: var(--black);
  font-weight: 500;

`;

export const RedirectButton = styled.button`
  width: 50px;
  height: 50px;

  border-radius: 50%;
  border: 1px solid var(--gray-200);

  display: flex;
  align-items: center;
  justify-content: center;

  background: transparent;
  cursor: pointer;

  transition: 0.2s ease;

  &:hover {
    background: var(--primary-100);
  }
`;

export const CurrencyChip = styled.span`
  height: 50px;
  padding: 8px 16px;
  border-radius: 100%;
  border: 1px solid var(--gray-200);
  display: inline-flex;
  align-items: center;
  color: var(--gray-700);
  font-size: var(--fs-xs);
`;

export const Amount = styled.h2`
  margin: 18px 0 12px;
  font-size: 29px;
  font-weight: 500;

  span {
    font-size: 29px;
    color: var(--gray-200);
    margin-left: 2px;
  }
`;

export const CardMeta = styled.p`
  margin: -6px 0 8px;
  font-size: var(--fs-xs);
  color: var(--gray-500);
`;

export const Detail = styled.p`
  margin: 0 0 10px;
  font-size: var(--fs-xs);
  color: var(--gray-500);
`;

export const ChangeRow = styled.div`
  display: flex;
  flex-direction: ${({ $isDetailed }) => ($isDetailed ? "column" : "row")};
  align-items: ${({ $isDetailed }) => ($isDetailed ? "flex-start" : "center")};
  gap: ${({ $isDetailed }) => ($isDetailed ? "12px" : "8px")};
`;

export const AnalyticsRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 10px;
`;

export const StatPills = styled.div`
  display: grid;
  padding-right:10px;
  gap: 8px;
`;

export const StatPill = styled.div`
  min-width: 130px;
  height: 40px;
  border-radius: 999px;
  border: 1px solid var(--primary-200);
  background: var(--white);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0 10px;
  color: var(--gray-700);
  font-size: var(--fs-xs);

  span {
    white-space: nowrap;
  }
`;

export const PillIcon = styled.span`
  width: 24px;
  height: 24px;
  border-radius: 10px;
  background: var(--primary-100);
  color: var(--primary-500);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  line-height: 1;
`;

export const ChangeText = styled.span`
  font-size: var(--fs-xs);
  color: var(--gray-300);
`;