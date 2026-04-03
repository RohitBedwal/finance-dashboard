import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 20px;
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  
  width: fit-content; /* prevents stretching */
`;
export const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;

  border-radius: 50%;
  border: 1px solid var(--gray-200);

  background: var(--white);
  cursor: pointer;

  transition: all 0.2s ease;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background: var(--gray-100);
  }
`;
// export const DateRange = styled.div`
//   padding: 10px 18px;

//   border-radius: 30px;
//   border: 1px solid var(--gray-200);

//   font-size: var(--fs-sm);
//   font-family: var(--font-primary);

//   background: var(--white);
// `;

export const DateRange = styled.div`
  display: flex;
  align-items: center;

  height: 42px;
  padding: 0 var(--m-16);

  border-radius: 999px;
  border: 1px solid var(--gray-200);

  background: var(--white);

  position: relative;
  z-index: 200;

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
`;