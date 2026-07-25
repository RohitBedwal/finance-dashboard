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
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Message = styled.div`
  display: flex;
  gap: 10px;
  max-width: 80%;
  align-self: ${({ $isUser }) => ($isUser ? "flex-end" : "flex-start")};
  flex-direction: ${({ $isUser }) => ($isUser ? "row-reverse" : "row")};
`;

export const Avatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 7px;
  background: ${({ $isUser }) =>
    $isUser ? "var(--primary-600)" : "linear-gradient(135deg, var(--primary-400), var(--primary-600))"};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  span {
    font-size: 10px;
    color: white;
  }
`;

export const Bubble = styled.div`
  padding: 8px 12px;
  border-radius: 12px;
  font-size: 12px;
  line-height: 1.45;
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
  padding: 12px;
  border-top: 1px solid var(--border-color);
`;

export const Input = styled.input`
  flex: 1;
  height: 40px;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 0 14px;
  background: var(--color-bg);
  color: var(--text-color);
  font-size: 13px;
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
  width: 40px;
  height: 40px;
  border-radius: 10px;
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
    width: 16px;
    height: 16px;
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
  gap: 4px;
  padding: 0 12px 8px;
`;

export const SuggestionChip = styled.button`
  padding: 4px 8px;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  background: var(--color-bg);
  color: var(--text-color);
  font-size: 10px;
  font-family: var(--font-primary);
  cursor: pointer;
  transition: all 0.2s ease;
  line-height: 1.3;

  &:hover {
    border-color: var(--primary-400);
    background: var(--primary-100);
    color: var(--primary-600);
  }

  :root[data-theme="dark"] & {
    background: var(--gray-800);
    border-color: var(--gray-700);
    color: #ffffff;

    &:hover {
      border-color: var(--primary-400);
      background: rgba(132, 112, 255, 0.15);
      color: #ffffff;
    }
  }
`;

export const ActionCard = styled.div`
  margin-top: 6px;
`;

export const ActionBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  border-radius: 999px;
  background: rgba(132, 112, 255, 0.12);
  border: 1px solid rgba(132, 112, 255, 0.25);
  font-size: 10px;
  font-weight: var(--fw-medium);
  color: var(--primary-600);

  :root[data-theme="dark"] & {
    background: rgba(132, 112, 255, 0.18);
    color: var(--primary-400);
  }
`;

export const ClearButton = styled.button`
  padding: 4px 8px;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  background: transparent;
  color: var(--muted-text);
  font-size: 10px;
  font-family: var(--font-primary);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--danger-500);
    color: var(--danger-500);
  }
`;

export const ConfirmCard = styled.div`
  margin-top: 6px;
  padding: 8px 10px;
  border-radius: 10px;
  background: var(--surface-hover);
  border: 1px solid var(--border-color);
`;

export const ConfirmText = styled.p`
  font-size: 11px;
  color: var(--text-color);
  margin: 0 0 6px;
  font-weight: var(--fw-medium);
`;

export const ConfirmButtons = styled.div`
  display: flex;
  gap: 6px;
`;

export const ConfirmYes = styled.button`
  padding: 4px 10px;
  border-radius: 6px;
  border: none;
  background: var(--primary-600);
  color: white;
  font-size: 11px;
  font-family: var(--font-primary);
  font-weight: var(--fw-medium);
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: var(--primary-700);
  }
`;

export const ConfirmNo = styled.button`
  padding: 4px 10px;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  background: transparent;
  color: var(--muted-text);
  font-size: 11px;
  font-family: var(--font-primary);
  font-weight: var(--fw-medium);
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: var(--danger-500);
    color: var(--danger-500);
  }
`;
