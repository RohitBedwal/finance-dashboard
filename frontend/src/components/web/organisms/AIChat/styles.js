import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: ${({ $fullHeight }) => ($fullHeight ? "calc(100vh - 200px)" : "500px")};
  background: var(--color-bg);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  overflow: hidden;
`;

export const Messages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Message = styled.div`
  display: flex;
  gap: 10px;
  max-width: 80%;
  align-self: ${({ $isUser }) => ($isUser ? "flex-end" : "flex-start")};
  flex-direction: ${({ $isUser }) => ($isUser ? "row-reverse" : "row")};
`;

export const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: ${({ $isUser }) =>
    $isUser ? "var(--primary-600)" : "linear-gradient(135deg, var(--primary-400), var(--primary-600))"};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  span {
    font-size: 14px;
    color: white;
  }
`;

export const Bubble = styled.div`
  padding: 12px 16px;
  border-radius: 16px;
  font-size: var(--fs-sm);
  line-height: 1.6;
  white-space: pre-wrap;

  ${({ $isUser }) =>
    $isUser
      ? `
    background: var(--primary-600);
    color: white;
    border-bottom-right-radius: 4px;
  `
      : `
    background: var(--surface-hover);
    color: var(--text-color);
    border-bottom-left-radius: 4px;
  `}
`;

export const InputArea = styled.div`
  display: flex;
  gap: 8px;
  padding: 16px;
  border-top: 1px solid var(--border-color);
`;

export const Input = styled.input`
  flex: 1;
  height: 44px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 0 16px;
  background: var(--color-bg);
  color: var(--text-color);
  font-size: var(--fs-sm);
  font-family: var(--font-primary);
  outline: none;

  &:focus {
    border-color: var(--primary-500);
  }

  &::placeholder {
    color: var(--gray-300);
  }
`;

export const SendButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: none;
  background: var(--primary-600);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: var(--primary-700);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: 18px;
    height: 18px;
    fill: currentColor;
  }
`;

const typing = keyframes`
  0%, 60%, 100% { opacity: 0.3; }
  30% { opacity: 1; }
`;

export const TypingIndicator = styled.div`
  display: flex;
  gap: 4px;
  padding: 8px 12px;

  span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--gray-300);
    animation: ${typing} 1.4s ease-in-out infinite;

    &:nth-child(2) {
      animation-delay: 0.2s;
    }

    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
`;

export const Suggestions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0 16px 16px;
`;

export const SuggestionChip = styled.button`
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  background: var(--color-bg);
  color: var(--text-color);
  font-size: var(--fs-xs);
  font-family: var(--font-primary);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--primary-400);
    background: var(--primary-100);
    color: var(--primary-600);
  }
`;
