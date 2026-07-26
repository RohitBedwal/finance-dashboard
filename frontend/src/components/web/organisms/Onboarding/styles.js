import styled, { css, keyframes } from "styled-components";

/* ================= LAYOUT ================= */

export const Container = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  background: var(--color-bg);
  animation: ${(p) =>
    p.$exiting
      ? css`fadeOut 0.3s ease forwards`
      : css`fadeIn 0.4s ease`};

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

/* ================= LEFT PANEL ================= */

export const LeftSection = styled.div`
  flex: 1;
  height: 100vh;
  background: linear-gradient(160deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%);
  color: white;
  position: relative;
  overflow: hidden;

  @media (max-width: 900px) {
    display: none;
  }

  &::before {
    content: "";
    position: absolute;
    top: -200px;
    right: -200px;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, transparent 70%);
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -150px;
    left: -150px;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%);
  }
`;

export const LeftOverlay = styled.div`
  position: relative;
  z-index: 1;
  height: 100%;
  padding: 48px 48px;
  display: flex;
  flex-direction: column;
`;

export const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const LogoWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 40px;
`;

export const LogoMark = styled.span`
  display: inline-flex;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(8px);
  position: relative;
  flex-shrink: 0;
`;

export const LogoStem = styled.span`
  position: absolute;
  left: 10px;
  top: 7px;
  width: 10px;
  height: 28px;
  border-radius: 7px;
  background: #818cf8;
`;

export const LogoTop = styled.span`
  position: absolute;
  left: 18px;
  top: 7px;
  width: 16px;
  height: 7px;
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.9);
`;

export const LogoMid = styled.span`
  position: absolute;
  left: 18px;
  top: 18px;
  width: 12px;
  height: 7px;
  border-radius: 7px;
  background: #c4b5fd;
`;

export const LogoText = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: white;
  letter-spacing: 0.3px;
`;

export const LeftHeading = styled.h1`
  font-size: 42px;
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.5px;
  margin-bottom: 8px;

  span {
    background: linear-gradient(135deg, #818cf8, #c084fc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

export const SlideNumber = styled.span`
  font-size: 120px;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.04);
  letter-spacing: -4px;
  line-height: 1;
  margin-top: auto;
  user-select: none;
`;

/* ================= MOCKUP CONTAINER ================= */

export const MockupWrap = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
`;

export const MockupInner = styled.div`
  width: 100%;
  max-width: 380px;
  max-height: 340px;
  overflow: hidden;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.03);
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

/* ================= SUMMARY CARDS MOCKUP ================= */

export const MiniCards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

export const MiniCard = styled.div`
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const MiniCardTitle = styled.span`
  font-size: 11px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const MiniCardAmount = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: white;
`;

export const MiniCardBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 10px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 999px;
  width: fit-content;
  ${(p) =>
    p.$type === "up"
      ? css`
          background: rgba(41, 123, 50, 0.25);
          color: #8ee89b;
        `
      : css`
          background: rgba(232, 56, 56, 0.25);
          color: #ff9b9b;
        `}
`;

/* ================= TABLE MOCKUP ================= */

export const MiniTable = styled.div`
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
`;

export const MiniTableHeader = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  padding: 8px 14px;
  background: rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
`;

export const MiniTableHeaderCell = styled.span`
  font-size: 9px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: rgba(165, 180, 252, 0.8);
`;

export const MiniTableRow = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  padding: 10px 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  align-items: center;

  &:last-child {
    border-bottom: none;
  }
`;

export const MiniTableCell = styled.span`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.75);

  ${(p) =>
    p.$green &&
    css`
      color: #8ee89b;
      font-weight: 600;
    `}
  ${(p) =>
    p.$red &&
    css`
      color: #ff9b9b;
      font-weight: 600;
    `}
  ${(p) =>
    p.$bold &&
    css`
      font-weight: 600;
      color: white;
    `}
`;

/* ================= TRANSACTION ROW MOCKUP ================= */

export const MiniTxList = styled.div`
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
`;

export const MiniTxRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);

  &:last-child {
    border-bottom: none;
  }
`;

export const MiniTxAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: ${(p) => p.$bg};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 14px;
    height: 14px;
  }
`;

export const MiniTxInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const MiniTxName = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: white;
`;

export const MiniTxCategory = styled.span`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.4);
`;

export const MiniTxAmount = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${(p) => (p.$income ? "#8ee89b" : "#ff9b9b")};
`;

/* ================= BUDGET MOCKUP ================= */

export const MiniBudgets = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const MiniBudgetCard = styled.div`
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const MiniBudgetHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const MiniBudgetCategory = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: white;
`;

export const MiniBudgetPercent = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: ${(p) =>
    p.$pct > 80 ? "#ff9b9b" : p.$pct > 50 ? "#ffd18a" : "#8ee89b"};
`;

export const MiniBudgetTrack = styled.div`
  height: 6px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  overflow: hidden;
`;

export const MiniBudgetFill = styled.div`
  height: 100%;
  border-radius: 999px;
  transition: width 0.6s ease;
  background: ${(p) =>
    p.$pct > 80
      ? "linear-gradient(90deg, #ff9b9b, #e83838)"
      : p.$pct > 50
      ? "linear-gradient(90deg, #ffd18a, #f9970c)"
      : "linear-gradient(90deg, #8ee89b, #297b32)"};
  width: ${(p) => p.$pct}%;
`;

export const MiniBudgetFooter = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.4);
`;

export const MiniBudgetSpent = styled.span`
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
`;

/* ================= CHAT MOCKUP ================= */

export const MiniChat = styled.div`
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const MiniChatHeader = styled.div`
  padding: 10px 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const MiniChatAvatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background: linear-gradient(135deg, #bfb7ff, #8470ff);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  font-weight: 700;
  color: white;
`;

export const MiniChatTitle = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: white;
`;

export const MiniChatSubtitle = styled.span`
  font-size: 9px;
  color: rgba(255, 255, 255, 0.4);
`;

export const MiniChatMessages = styled.div`
  padding: 10px 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const MiniBubble = styled.div`
  max-width: 80%;
  padding: 7px 10px;
  font-size: 11px;
  line-height: 1.4;
  border-radius: 10px;
  ${(p) =>
    p.$user
      ? css`
          background: #8470ff;
          color: white;
          align-self: flex-end;
          border-bottom-right-radius: 3px;
        `
      : css`
          background: rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.85);
          align-self: flex-start;
          border-bottom-left-radius: 3px;
        `}
`;

export const MiniChatInput = styled.div`
  padding: 8px 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const MiniChatInputField = styled.div`
  flex: 1;
  height: 28px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

export const MiniChatSendBtn = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: #8470ff;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 12px;
    height: 12px;
    fill: white;
  }
`;

/* ================= RIGHT PANEL ================= */

export const RightSection = styled.div`
  flex: 1;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;

  @media (max-width: 900px) {
    height: auto;
    min-height: 100vh;
    padding: 32px 20px;
  }
`;

export const RightCard = styled.div`
  position: relative;
  width: 100%;
  max-width: 480px;
  padding: 48px 44px;
  border: 1px solid var(--border-color);
  border-radius: 24px;
  background: var(--color-bg);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  min-height: 440px;

  @media (max-width: 900px) {
    padding: 36px 28px;
    min-height: auto;
  }
`;

export const SkipButton = styled.button`
  position: absolute;
  top: 20px;
  right: 24px;
  background: none;
  border: none;
  color: var(--muted-text);
  font-size: var(--fs-sm);
  font-family: var(--font-primary);
  font-weight: var(--fw-medium);
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 8px;
  transition: color 0.15s ease;

  &:hover {
    color: var(--text-color);
  }
`;

export const RightContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Title = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 12px;
  line-height: 1.3;
`;

export const Description = styled.p`
  font-size: var(--fs-md);
  color: var(--muted-text);
  line-height: 1.7;
  margin-bottom: 28px;
`;

export const BulletList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const Bullet = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: var(--fs-sm);
  color: var(--text-color);
  line-height: 1.5;
`;

export const BulletDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--primary-600);
  flex-shrink: 0;
`;

/* ================= BOTTOM ================= */

export const Bottom = styled.div`
  margin-top: 36px;
`;

export const Dots = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
`;

export const Dot = styled.button`
  width: ${(p) => (p.$active ? "28px" : "8px")};
  height: 8px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: all 0.25s ease;
  background: ${(p) => (p.$active ? "var(--primary-600)" : "var(--border-color)")};

  &:hover {
    background: ${(p) => (p.$active ? "var(--primary-600)" : "var(--gray-400)")};
  }
`;

export const Actions = styled.div`
  display: flex;
  gap: 12px;
`;

export const BackButton = styled.button`
  flex: 0 0 auto;
  padding: 14px 28px;
  border-radius: 14px;
  border: 1px solid var(--border-color);
  background: var(--color-bg);
  color: var(--text-color);
  font-size: 15px;
  font-weight: var(--fw-medium);
  font-family: var(--font-primary);
  cursor: pointer;
  transition: all 0.15s ease;
  visibility: ${(p) => (p.$visible ? "visible" : "hidden")};

  &:hover {
    background: var(--surface-hover);
    border-color: var(--primary-400);
  }
`;

export const NextButton = styled.button`
  flex: 1;
  padding: 14px 28px;
  border-radius: 14px;
  border: none;
  background: var(--primary-600);
  color: var(--white);
  font-size: 15px;
  font-weight: var(--fw-medium);
  font-family: var(--font-primary);
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: var(--primary-700);
  }
`;
