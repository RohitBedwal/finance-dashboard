import React, { useState, useEffect } from "react";
import * as S from "./styles";

const SLIDES = [
  {
    leftTitle: "Dashboard",
    title: "Welcome to FinGenius",
    description:
      "Your smart finance companion. Track income, manage budgets, and get AI-powered insights — all in one place.",
    bullets: [
      "Track every transaction in one dashboard",
      "Set budgets and monitor spending",
      "Let AI handle the heavy lifting",
    ],
  },
  {
    leftTitle: "Analytics",
    title: "Your Dashboard",
    description:
      "See your total balance, income, and expenses at a glance. Navigate months with the arrows to explore your history.",
    bullets: [
      "Summary cards with month-over-month changes",
      "Monthly overview table for the last 6 months",
      "Budget breakdown and savings goals",
    ],
  },
  {
    leftTitle: "Transactions",
    title: "Manage Transactions",
    description:
      "Add income or expenses manually, or let the AI create them for you. Filter, search, and export anytime.",
    bullets: [
      "Add via form or AI chat — your choice",
      "Filter by date, type, category, or status",
      "Export all transactions to CSV",
    ],
  },
  {
    leftTitle: "Budgets",
    title: "Set Budgets",
    description:
      "Set spending limits per category and track how much you've used. Edit or delete anytime.",
    bullets: [
      "Create budgets for any expense category",
      "Track usage with visual progress bars",
      "AI chatbot can create budgets for you",
    ],
  },
  {
    leftTitle: "AI Assistant",
    title: "AI Chat Assistant",
    description:
      "Click the chat bubble at the bottom-right to talk to your AI. Works in English and Hindi.",
    bullets: [
      '"Add expense 500 for groceries" — done',
      "Use the mic button to speak instead of type",
      "Ask questions about your spending habits",
    ],
  },
];

const Logomark = () => (
  <S.LogoMark>
    <S.LogoStem />
    <S.LogoTop />
    <S.LogoMid />
  </S.LogoMark>
);

/* ===== SLIDE 0: Summary Cards ===== */
const WelcomePreview = () => (
  <S.MiniCards>
    <S.MiniCard>
      <S.MiniCardTitle>Balance</S.MiniCardTitle>
      <S.MiniCardAmount>₹1.24L</S.MiniCardAmount>
      <S.MiniCardBadge $type="up">↑ 12.5%</S.MiniCardBadge>
    </S.MiniCard>
    <S.MiniCard>
      <S.MiniCardTitle>Income</S.MiniCardTitle>
      <S.MiniCardAmount>₹85K</S.MiniCardAmount>
      <S.MiniCardBadge $type="up">↑ 8.2%</S.MiniCardBadge>
    </S.MiniCard>
    <S.MiniCard>
      <S.MiniCardTitle>Expenses</S.MiniCardTitle>
      <S.MiniCardAmount>₹32.5K</S.MiniCardAmount>
      <S.MiniCardBadge $type="down">↓ 3.1%</S.MiniCardBadge>
    </S.MiniCard>
  </S.MiniCards>
);

/* ===== SLIDE 1: Dashboard Table ===== */
const DashboardPreview = () => (
  <S.MiniTable>
    <S.MiniTableHeader>
      <S.MiniTableHeaderCell>Month</S.MiniTableHeaderCell>
      <S.MiniTableHeaderCell>Income</S.MiniTableHeaderCell>
      <S.MiniTableHeaderCell>Expense</S.MiniTableHeaderCell>
      <S.MiniTableHeaderCell>Balance</S.MiniTableHeaderCell>
    </S.MiniTableHeader>
    <S.MiniTableRow>
      <S.MiniTableCell $bold>Jul 2026</S.MiniTableCell>
      <S.MiniTableCell $green>+₹45,000</S.MiniTableCell>
      <S.MiniTableCell $red>-₹18,200</S.MiniTableCell>
      <S.MiniTableCell>₹26,800</S.MiniTableCell>
    </S.MiniTableRow>
    <S.MiniTableRow>
      <S.MiniTableCell $bold>Jun 2026</S.MiniTableCell>
      <S.MiniTableCell $green>+₹42,000</S.MiniTableCell>
      <S.MiniTableCell $red>-₹21,500</S.MiniTableCell>
      <S.MiniTableCell>₹20,500</S.MiniTableCell>
    </S.MiniTableRow>
    <S.MiniTableRow>
      <S.MiniTableCell $bold>May 2026</S.MiniTableCell>
      <S.MiniTableCell $green>+₹38,000</S.MiniTableCell>
      <S.MiniTableCell $red>-₹15,800</S.MiniTableCell>
      <S.MiniTableCell>₹22,200</S.MiniTableCell>
    </S.MiniTableRow>
    <S.MiniTableRow>
      <S.MiniTableCell $bold>Apr 2026</S.MiniTableCell>
      <S.MiniTableCell $green>+₹40,000</S.MiniTableCell>
      <S.MiniTableCell $red>-₹19,300</S.MiniTableCell>
      <S.MiniTableCell>₹20,700</S.MiniTableCell>
    </S.MiniTableRow>
  </S.MiniTable>
);

/* ===== SLIDE 2: Transactions ===== */
const TransactionsPreview = () => (
  <S.MiniTxList>
    <S.MiniTxRow>
      <S.MiniTxAvatar $bg="rgba(41, 123, 50, 0.25)">
        <svg viewBox="0 0 24 24" fill="none" stroke="#8ee89b" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
      </S.MiniTxAvatar>
      <S.MiniTxInfo>
        <S.MiniTxName>Salary</S.MiniTxName>
        <S.MiniTxCategory>Income • UPI</S.MiniTxCategory>
      </S.MiniTxInfo>
      <S.MiniTxAmount $income>+₹45,000</S.MiniTxAmount>
    </S.MiniTxRow>
    <S.MiniTxRow>
      <S.MiniTxAvatar $bg="rgba(232, 56, 56, 0.25)">
        <svg viewBox="0 0 24 24" fill="none" stroke="#ff9b9b" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
      </S.MiniTxAvatar>
      <S.MiniTxInfo>
        <S.MiniTxName>Amazon Order</S.MiniTxName>
        <S.MiniTxCategory>Shopping • Card</S.MiniTxCategory>
      </S.MiniTxInfo>
      <S.MiniTxAmount>-₹2,350</S.MiniTxAmount>
    </S.MiniTxRow>
    <S.MiniTxRow>
      <S.MiniTxAvatar $bg="rgba(249, 151, 12, 0.25)">
        <svg viewBox="0 0 24 24" fill="none" stroke="#ffd18a" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
      </S.MiniTxAvatar>
      <S.MiniTxInfo>
        <S.MiniTxName>Groceries</S.MiniTxName>
        <S.MiniTxCategory>Food • Cash</S.MiniTxCategory>
      </S.MiniTxInfo>
      <S.MiniTxAmount>-₹1,800</S.MiniTxAmount>
    </S.MiniTxRow>
    <S.MiniTxRow>
      <S.MiniTxAvatar $bg="rgba(41, 123, 50, 0.25)">
        <svg viewBox="0 0 24 24" fill="none" stroke="#8ee89b" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
      </S.MiniTxAvatar>
      <S.MiniTxInfo>
        <S.MiniTxName>Freelance</S.MiniTxName>
        <S.MiniTxCategory>Income • Bank</S.MiniTxCategory>
      </S.MiniTxInfo>
      <S.MiniTxAmount $income>+₹8,500</S.MiniTxAmount>
    </S.MiniTxRow>
  </S.MiniTxList>
);

/* ===== SLIDE 3: Budgets ===== */
const BudgetsPreview = () => (
  <S.MiniBudgets>
    <S.MiniBudgetCard>
      <S.MiniBudgetHeader>
        <S.MiniBudgetCategory>Food & Dining</S.MiniBudgetCategory>
        <S.MiniBudgetPercent $pct={42}>42% used</S.MiniBudgetPercent>
      </S.MiniBudgetHeader>
      <S.MiniBudgetTrack>
        <S.MiniBudgetFill $pct={42} />
      </S.MiniBudgetTrack>
      <S.MiniBudgetFooter>
        <S.MiniBudgetSpent>₹6,300 spent</S.MiniBudgetSpent>
        <span>of ₹15,000</span>
      </S.MiniBudgetFooter>
    </S.MiniBudgetCard>
    <S.MiniBudgetCard>
      <S.MiniBudgetHeader>
        <S.MiniBudgetCategory>Shopping</S.MiniBudgetCategory>
        <S.MiniBudgetPercent $pct={78}>78% used</S.MiniBudgetPercent>
      </S.MiniBudgetHeader>
      <S.MiniBudgetTrack>
        <S.MiniBudgetFill $pct={78} />
      </S.MiniBudgetTrack>
      <S.MiniBudgetFooter>
        <S.MiniBudgetSpent>₹11,700 spent</S.MiniBudgetSpent>
        <span>of ₹15,000</span>
      </S.MiniBudgetFooter>
    </S.MiniBudgetCard>
    <S.MiniBudgetCard>
      <S.MiniBudgetHeader>
        <S.MiniBudgetCategory>Transport</S.MiniBudgetCategory>
        <S.MiniBudgetPercent $pct={25}>25% used</S.MiniBudgetPercent>
      </S.MiniBudgetHeader>
      <S.MiniBudgetTrack>
        <S.MiniBudgetFill $pct={25} />
      </S.MiniBudgetTrack>
      <S.MiniBudgetFooter>
        <S.MiniBudgetSpent>₹1,500 spent</S.MiniBudgetSpent>
        <span>of ₹6,000</span>
      </S.MiniBudgetFooter>
    </S.MiniBudgetCard>
  </S.MiniBudgets>
);

/* ===== SLIDE 4: AI Chat ===== */
const ChatPreview = () => (
  <S.MiniChat>
    <S.MiniChatHeader>
      <S.MiniChatAvatar>AI</S.MiniChatAvatar>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <S.MiniChatTitle>Finance Assistant</S.MiniChatTitle>
        <S.MiniChatSubtitle>Ask anything about your money</S.MiniChatSubtitle>
      </div>
    </S.MiniChatHeader>
    <S.MiniChatMessages>
      <S.MiniBubble $user>Add expense 500 for groceries</S.MiniBubble>
      <S.MiniBubble>
        Done! I've added an expense of ₹500 for groceries. Your remaining budget for Food & Dining is ₹8,700.
      </S.MiniBubble>
      <S.MiniBubble $user>How much did I spend this month?</S.MiniBubble>
      <S.MiniBubble>
        You've spent ₹32,500 this month across 24 transactions. Your biggest expense category is Shopping at ₹11,700.
      </S.MiniBubble>
    </S.MiniChatMessages>
    <S.MiniChatInput>
      <S.MiniChatInputField />
      <S.MiniChatSendBtn>
        <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
      </S.MiniChatSendBtn>
    </S.MiniChatInput>
  </S.MiniChat>
);

const PREVIEWS = [WelcomePreview, DashboardPreview, TransactionsPreview, BudgetsPreview, ChatPreview];

const Onboarding = () => {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const seen = localStorage.getItem("onboarding_seen");
    if (user && !seen) {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const close = () => {
    setExiting(true);
    setTimeout(() => {
      localStorage.setItem("onboarding_seen", "1");
      setVisible(false);
      setExiting(false);
      setCurrent(0);
    }, 300);
  };

  const next = () => {
    if (current < SLIDES.length - 1) {
      setCurrent((p) => p + 1);
    } else {
      close();
    }
  };

  const prev = () => {
    if (current > 0) setCurrent((p) => p - 1);
  };

  if (!visible) return null;

  const slide = SLIDES[current];
  const isLast = current === SLIDES.length - 1;
  const Preview = PREVIEWS[current];

  return (
    <S.Container $exiting={exiting}>
      <S.LeftSection>
        <S.LeftOverlay>
          <S.LeftContent>
            <S.LogoWrap>
              <Logomark />
              <S.LogoText>FinGenius</S.LogoText>
            </S.LogoWrap>

            <S.LeftHeading>{slide.leftTitle}</S.LeftHeading>

            <S.MockupWrap>
              <S.MockupInner>
                <Preview />
              </S.MockupInner>
            </S.MockupWrap>

            <S.SlideNumber>
              {String(current + 1).padStart(2, "0")}
            </S.SlideNumber>
          </S.LeftContent>
        </S.LeftOverlay>
      </S.LeftSection>

      <S.RightSection>
        <S.RightCard>
          <S.SkipButton onClick={close}>Skip</S.SkipButton>

          <S.RightContent>
            <S.Title>{slide.title}</S.Title>
            <S.Description>{slide.description}</S.Description>

            <S.BulletList>
              {slide.bullets.map((b, i) => (
                <S.Bullet key={i}>
                  <S.BulletDot />
                  <span>{b}</span>
                </S.Bullet>
              ))}
            </S.BulletList>
          </S.RightContent>

          <S.Bottom>
            <S.Dots>
              {SLIDES.map((_, i) => (
                <S.Dot key={i} $active={i === current} onClick={() => setCurrent(i)} />
              ))}
            </S.Dots>

            <S.Actions>
              <S.BackButton onClick={prev} $visible={current > 0}>
                Back
              </S.BackButton>
              <S.NextButton onClick={next}>
                {isLast ? "Get Started" : "Next"}
              </S.NextButton>
            </S.Actions>
          </S.Bottom>
        </S.RightCard>
      </S.RightSection>
    </S.Container>
  );
};

export default Onboarding;
