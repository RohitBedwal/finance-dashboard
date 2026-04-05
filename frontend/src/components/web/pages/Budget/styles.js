import styled from "styled-components";

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 14px;
  flex-wrap: wrap;
`;

export const TitleWrap = styled.div`
  h2 {
    font-size: var(--fs-2xl);
    color: var(--text-color);
  }

  p {
    margin-top: 2px;
    font-size: var(--fs-sm);
    color: var(--gray-300);
  }
`;

export const Filters = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
`;

export const Layout = styled.div`
  margin-top: 18px;
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(250px, 1fr);
  gap: 18px;

  @media (max-width: 1280px) {
    grid-template-columns: 1fr;
  }
`;

export const Left = styled.div``;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(200px, 1fr));
  gap: 14px;
  margin-top:25px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const Right = styled.div`
  display: grid;
  gap: 14px;
  align-self: start;
`;

export const MonthlyTitle = styled.h4`
  font-size: var(--fs-lg);
  color: var(--text-color);
  
`;

export const MonthlyBudgetValue = styled.h3`
  margin-top: 20px;
  font-size: 30px;
  color: var(--text-color);
  font-weight:500;

  span {
    color: var(--gray-300);
    font-weight:500;

  }
`;

export const MonthlyStatus = styled.span`
  margin-top: 8px;
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: var(--fs-xs);
  color: var(--success-800);
  background: var(--success-200);
`;

export const MonthlyProgress = styled.div`
//   width: 100%;
  position: relative;
  height: 100px;
`;

export const MonthlyProgressTip = styled.div`
  position: absolute;
  
  z-index: 1;
  border: 1px solid var(--gray-300);
  border-radius: 12px;
  background: var(--color-bg);
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    color: var(--gray-300);
    font-size: var(--fs-xs);
  }

  strong {
    color: var(--text-color);
    font-size: var(--fs-sm);
  }
`;

export const MonthlySpent = styled.div`
  margin-top: -25px;
  text-align: center;
  padding-bottom:20px;

  span {
    font-size: var(--fs-xs);
    color: var(--gray-300);
  }

  strong {
    display: block;
    font-size: 30px;
    color: var(--text-color);
    font-weight:500;

    small {
      color: var(--gray-200);
      font-size: 30px;
      font-weight:500;
    }
  }
`;

export const MostHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  h4 {
    font-size: var(--fs-lg);
    color: var(--text-color);
  }
`;

export const MostList = styled.ul`
  margin-top: 10px;
  list-style: none;
  display: grid;
  gap: 10px;

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--gray-100);

    &:last-child {
      border-bottom: 0;
      padding-bottom: 0;
    }

    div {
      display: flex;
      flex-direction: column;
      gap: 2px;

      strong {
        color: var(--text-color);
        font-size: var(--fs-sm);
      }

      span {
        color: var(--gray-300);
        font-size: var(--fs-xs);
      }
    }
  }
`;

export const ChangePill = styled.span`
  padding: 4px 8px;
  border-radius: 999px;
  background: ${({ $negative }) =>
    $negative ? "var(--success-200)" : "var(--danger-200)"};
  color: ${({ $negative }) =>
    $negative ? "var(--success-800)" : "var(--danger-500)"};
  font-size: var(--fs-xs);
`;
