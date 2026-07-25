import React, { useState, useRef, useEffect } from "react";
import { chatWithAI } from "../../../../api/aiApi";
import * as S from "./styles";

const SUGGESTIONS = [
  "How much did I spend on food?",
  "Add 5000 to savings",
  "Set budget of 3000 for food",
];

const ACTION_LABELS = {
  income_added: { icon: "💵", text: "Income Recorded" },
  expense_added: { icon: "💸", text: "Expense Recorded" },
  budget_created: { icon: "📊", text: "Budget Created" },
  budget_updated: { icon: "📊", text: "Budget Updated" },
  budget_removed: { icon: "🗑️", text: "Budget Removed" },
  savings_added: { icon: "💰", text: "Added to Savings" },
  savings_removed: { icon: "🏧", text: "Withdrawn from Savings" },
};

const AIChat = ({ fullHeight = false, onAction, $widget = false }) => {
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem("ai-chat-messages");
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        role: "assistant",
        content: "Hi! I'm your AI finance assistant. Ask me anything about your spending, budgets, or financial habits.",
      },
    ];
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("ai-chat-messages", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim() || loading) return;

    const userMessage = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const history = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await chatWithAI(text.trim(), history);
      const action = res.data.action || null;
      const pending = res.data.pendingAction || null;

      if (pending) {
        setPendingAction(pending);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: res.data.answer,
            pendingAction: pending,
          },
        ]);
      } else {
        const answer = action?.summary
          ? `${res.data.answer}\n\n${action.summary}`
          : res.data.answer;

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: answer,
            action,
          },
        ]);

        if (action && onAction) {
          onAction();
        }
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I couldn't process that. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async (confirmed) => {
    if (!pendingAction) return;

    const label = confirmed ? "Yes, do it" : "No, cancel";
    setMessages((prev) => [
      ...prev,
      { role: "user", content: label },
    ]);
    setPendingAction(null);
    setLoading(true);

    if (!confirmed) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Okay, cancelled." },
      ]);
      setLoading(false);
      return;
    }

    try {
      const confirmText = `__confirm__:${JSON.stringify(pendingAction)}`;
      const res = await chatWithAI(confirmText, []);
      const action = res.data.action || null;
      const answer = action?.summary
        ? `${res.data.answer}\n\n${action.summary}`
        : res.data.answer;

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: answer,
          action,
        },
      ]);

      if (action && onAction) {
        onAction();
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleSuggestion = (text) => {
    sendMessage(text);
  };

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "Hi! I'm your AI finance assistant. Ask me anything about your spending, budgets, or financial habits.",
      },
    ]);
    setPendingAction(null);
    localStorage.removeItem("ai-chat-messages");
  };

  const PENDING_LABELS = {
    add_income: "Add income",
    add_expense: "Add expense",
    create_budget: "Create/update budget",
    update_budget: "Update budget",
    remove_budget: "Remove budget",
    add_savings: "Add to savings",
    remove_savings: "Withdraw from savings",
  };

  const chatContent = (
    <>
      <S.Messages>
        {messages.map((msg, index) => (
          <S.Message key={index} $isUser={msg.role === "user"}>
            <S.Avatar $isUser={msg.role === "user"}>
              <span>{msg.role === "user" ? "Y" : "AI"}</span>
            </S.Avatar>
            <div>
              <S.Bubble $isUser={msg.role === "user"}>{msg.content}</S.Bubble>
              {msg.action && (
                <S.ActionCard>
                  <S.ActionBadge>
                    <span>{ACTION_LABELS[msg.action.type]?.icon}</span>
                    <span>{ACTION_LABELS[msg.action.type]?.text}</span>
                  </S.ActionBadge>
                </S.ActionCard>
              )}
              {msg.pendingAction && index === messages.length - 1 && !loading && (
                <S.ConfirmCard>
                  <S.ConfirmText>
                    {PENDING_LABELS[msg.pendingAction.intent] || "Perform action"}?
                  </S.ConfirmText>
                  <S.ConfirmButtons>
                    <S.ConfirmYes onClick={() => handleConfirm(true)}>Yes, do it</S.ConfirmYes>
                    <S.ConfirmNo onClick={() => handleConfirm(false)}>Cancel</S.ConfirmNo>
                  </S.ConfirmButtons>
                </S.ConfirmCard>
              )}
            </div>
          </S.Message>
        ))}

        {loading && (
          <S.Message $isUser={false}>
            <S.Avatar>
              <span>AI</span>
            </S.Avatar>
            <S.Bubble>
              <S.TypingIndicator>
                <span />
                <span />
                <span />
              </S.TypingIndicator>
            </S.Bubble>
          </S.Message>
        )}

        <div ref={messagesEndRef} />
      </S.Messages>

      {!loading && !pendingAction && (
        <S.Suggestions>
          {SUGGESTIONS.map((text) => (
            <S.SuggestionChip key={text} onClick={() => handleSuggestion(text)}>
              {text}
            </S.SuggestionChip>
          ))}
          <S.ClearButton onClick={clearChat}>Clear chat</S.ClearButton>
        </S.Suggestions>
      )}

      <S.InputArea>
        <S.Input
          placeholder="Ask about your finances..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading || !!pendingAction}
        />
        <S.SendButton onClick={() => sendMessage(input)} disabled={loading || !input.trim() || !!pendingAction}>
          <svg viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </S.SendButton>
      </S.InputArea>
    </>
  );

  if ($widget) return chatContent;

  return (
    <S.Container $fullHeight={fullHeight}>
      {chatContent}
    </S.Container>
  );
};

export default AIChat;
