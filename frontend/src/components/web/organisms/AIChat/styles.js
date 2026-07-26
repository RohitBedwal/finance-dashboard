import styled, { keyframes, css } from "styled-components";

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
  gap: 6px;
  padding: 12px;
  border-top: 1px solid var(--border-color);
  align-items: center;
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

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.15); opacity: 0.7; }
`;

export const MicButton = styled.button`
  width: 36px;
  height: 36px;
  min-width: 36px;
  border-radius: 50%;
  border: none;
  background: ${({ $recording }) => ($recording ? "var(--danger-500)" : "var(--surface-hover)")};
  color: ${({ $recording }) => ($recording ? "white" : "var(--text-color)")};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    background: ${({ $recording }) => ($recording ? "var(--danger-600)" : "var(--primary-100)")};
  }

  svg {
    width: 16px;
    height: 16px;
    fill: currentColor;
  }

  ${({ $recording }) =>
    $recording &&
    css`
    &::after {
      content: "";
      position: absolute;
      inset: -3px;
      border-radius: 50%;
      border: 2px solid var(--danger-500);
      animation: ${pulse} 1.2s ease-in-out infinite;
    }
  `}
`;

export const LangToggle = styled.button`
  height: 28px;
  padding: 0 8px;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  background: ${({ $active }) => ($active ? "var(--primary-100)" : "transparent")};
  color: ${({ $active }) => ($active ? "var(--primary-600)" : "var(--muted-text)")};
  font-size: 10px;
  font-weight: var(--fw-semibold);
  font-family: var(--font-primary);
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;

  &:hover {
    border-color: var(--primary-400);
  }

  :root[data-theme="dark"] & {
    background: ${({ $active }) => ($active ? "rgba(132,112,255,0.18)" : "transparent")};
    color: ${({ $active }) => ($active ? "var(--primary-400)" : "var(--muted-text)")};
  }
`;

export const VoiceStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 4px;
  font-size: 11px;
  color: ${({ $recording }) => ($recording ? "var(--danger-500)" : "var(--muted-text)")};
  white-space: nowrap;
`;

export const VoiceDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--danger-500);
  animation: ${pulse} 1s ease-in-out infinite;
`;

export const RecordingBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 6px 12px;
  background: rgba(239, 68, 68, 0.08);
  border-top: 1px solid rgba(239, 68, 68, 0.2);
  font-size: 12px;
  color: var(--danger-500);
  font-family: var(--font-primary);
`;
