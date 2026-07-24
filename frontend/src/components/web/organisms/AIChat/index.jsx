import React, { useState, useRef, useEffect } from "react";
import { chatWithAI } from "../../../../api/aiApi";
import * as S from "./styles";

const SUGGESTIONS = [
  "How much did I spend on food this month?",
  "What's my biggest expense category?",
  "How can I save more money?",
  "Compare my spending this month vs last month",
  "Am I on track with my budgets?",
];

const AIChat = ({ fullHeight = false }) => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm your AI finance assistant. Ask me anything about your spending, budgets, or financial habits.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res.data.answer },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I couldn't process that. Please try again." },
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

  return (
    <S.Container $fullHeight={fullHeight}>
      <S.Messages>
        {messages.map((msg, index) => (
          <S.Message key={index} $isUser={msg.role === "user"}>
            <S.Avatar $isUser={msg.role === "user"}>
              <span>{msg.role === "user" ? "Y" : "AI"}</span>
            </S.Avatar>
            <S.Bubble $isUser={msg.role === "user"}>{msg.content}</S.Bubble>
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

      {messages.length <= 1 && (
        <S.Suggestions>
          {SUGGESTIONS.map((text) => (
            <S.SuggestionChip key={text} onClick={() => handleSuggestion(text)}>
              {text}
            </S.SuggestionChip>
          ))}
        </S.Suggestions>
      )}

      <S.InputArea>
        <S.Input
          placeholder="Ask about your finances..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <S.SendButton onClick={() => sendMessage(input)} disabled={loading || !input.trim()}>
          <svg viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </S.SendButton>
      </S.InputArea>
    </S.Container>
  );
};

export default AIChat;
