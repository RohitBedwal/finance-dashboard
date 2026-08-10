import styled from "styled-components";

export const Page = styled.div`
  max-width: 860px;
`;

export const PageHeader = styled.div`
  margin-bottom: 24px;
`;

export const PageTitle = styled.h1`
  font-size: var(--fs-2xl);
  color: var(--text-color);
  margin-bottom: 6px;
`;

export const PageSubtitle = styled.p`
  font-size: var(--fs-sm);
  color: var(--muted-text);
`;

export const Card = styled.div`
  background: var(--color-bg);
  border: 1px solid var(--border-color);
  border-radius: 30px;
  padding: 24px;
  min-width: 0;

  @media (max-width: 767px) {
    padding: 16px;
    border-radius: 20px;
  }
`;

export const CardHeader = styled.div`
  margin-bottom: 20px;
`;

export const CardTitle = styled.h2`
  font-size: var(--fs-lg);
  color: var(--text-color);
  margin-bottom: 6px;
`;

export const CardHint = styled.p`
  font-size: var(--fs-xs);
  color: var(--muted-text);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;

  > input,
  > div {
    width: 100%;
  }

  ${({ $full }) => $full && "grid-column: 1 / -1;"}
`;

export const Label = styled.label`
  font-size: var(--fs-xs);
  font-weight: var(--fw-medium);
  color: var(--text-color);
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const SaveButton = styled.button`
  height: 44px;
  padding: 0 28px;
  border: none;
  border-radius: 999px;
  background: var(--primary-600);
  color: white;
  font-size: var(--fs-sm);
  font-weight: var(--fw-medium);
  font-family: var(--font-primary);
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover:not(:disabled) {
    background: var(--primary-700);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const LoaderWrap = styled.div`
  display: flex;
  justify-content: center;
  padding: 60px 0;
`;

export const Spinner = styled.div`
  width: 36px;
  height: 36px;
  border: 3px solid var(--border-color);
  border-top-color: var(--primary-600);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
