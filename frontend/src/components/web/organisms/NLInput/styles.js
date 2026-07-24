import styled from "styled-components";

export const Container = styled.div`
  background: var(--color-bg);
  border-radius: 20px;
  border: 1px solid var(--border-color);
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus-within {
    border-color: var(--primary-500);
    box-shadow: 0 0 0 3px var(--primary-100);
  }
`;

export const SparkIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--primary-600), var(--primary-400));
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 18px;
    height: 18px;
    fill: white;
  }
`;

export const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: var(--text-color);
  font-size: var(--fs-md);
  font-family: var(--font-primary);

  &::placeholder {
    color: var(--gray-300);
  }
`;

export const SubmitButton = styled.button`
  height: 40px;
  padding: 0 20px;
  border-radius: 12px;
  border: none;
  background: var(--primary-600);
  color: white;
  font-size: var(--fs-sm);
  font-weight: 500;
  font-family: var(--font-primary);
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.2s ease, opacity 0.2s ease;

  &:hover {
    background: var(--primary-700);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Preview = styled.div`
  margin-top: 12px;
  background: var(--primary-100);
  border-radius: 14px;
  padding: 16px;
  border: 1px solid var(--primary-200);
`;

export const PreviewRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;

  span {
    font-size: var(--fs-sm);
    color: var(--gray-500);
  }

  strong {
    font-size: var(--fs-sm);
    color: var(--text-color);
  }
`;

export const PreviewActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`;

export const ConfirmButton = styled.button`
  flex: 1;
  height: 40px;
  border-radius: 10px;
  border: none;
  background: var(--primary-600);
  color: white;
  font-size: var(--fs-sm);
  font-weight: 500;
  font-family: var(--font-primary);
  cursor: pointer;

  &:hover {
    background: var(--primary-700);
  }
`;

export const CancelButton = styled.button`
  flex: 1;
  height: 40px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: var(--color-bg);
  color: var(--text-color);
  font-size: var(--fs-sm);
  font-family: var(--font-primary);
  cursor: pointer;

  &:hover {
    background: var(--surface-hover);
  }
`;

export const LoadingText = styled.span`
  font-size: var(--fs-sm);
  color: var(--primary-600);
  animation: pulse 1.5s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;
