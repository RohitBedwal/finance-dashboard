import React, { useState, useEffect } from "react";
import AIChat from "../AIChat";
import * as S from "./styles";
import { useData } from "../../../../context/DataContext";

const ChatIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const BotIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
    <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2zM9.5 13a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm5 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
  </svg>
);

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { refetchAll } = useData();

  useEffect(() => {
    if (localStorage.getItem("openChatOnLoad") === "1") {
      const timer = setTimeout(() => {
        localStorage.removeItem("openChatOnLoad");
        setIsOpen(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <>
          <S.Overlay onClick={() => setIsOpen(false)} />
          <S.Window>
            <S.Header>
              <S.HeaderLeft>
                <S.HeaderAvatar>
                  <span><BotIcon /></span>
                </S.HeaderAvatar>
                <S.HeaderInfo>
                  <S.HeaderTitle>Finance Assistant</S.HeaderTitle>
                  <S.HeaderSubtitle>Ask anything about your money</S.HeaderSubtitle>
                </S.HeaderInfo>
              </S.HeaderLeft>
              <S.CloseButton onClick={() => setIsOpen(false)}>
                <CloseIcon />
              </S.CloseButton>
            </S.Header>
            <AIChat $widget onAction={refetchAll} />
          </S.Window>
        </>
      )}

      <S.FAB
        onClick={() => setIsOpen((prev) => !prev)}
        $isOpen={isOpen}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </S.FAB>
    </>
  );
};

export default ChatWidget;
