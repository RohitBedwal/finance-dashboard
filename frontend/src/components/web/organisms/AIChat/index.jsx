import React, { useState, useRef, useEffect, useCallback } from "react";
import { chatWithAI, transcribeAudio } from "../../../../api/aiApi";
import * as S from "./styles";

const SUGGESTIONS = [
  "Add expense",
  "Add income",
  "Set budget",
  "Add to savings",
  "Export CSV",
  "Export PDF",
];

const GREETING = `Hi! I'm your AI finance assistant. Here's what I can do:

- Record income and expenses (just tell me what you spent!)
- Pick a bank and category for each entry
- Create or update monthly budgets
- Move money to or from savings
- Answer questions about your spending and balance
- Export transactions as CSV or a PDF bank statement
- Take voice commands`;

const ACTION_LABELS = {
  income_added: { icon: "💵", text: "Income Recorded" },
  expense_added: { icon: "💸", text: "Expense Recorded" },
  budget_created: { icon: "📊", text: "Budget Created" },
  budget_updated: { icon: "📊", text: "Budget Updated" },
  budget_removed: { icon: "🗑️", text: "Budget Removed" },
  savings_added: { icon: "💰", text: "Added to Savings" },
  savings_removed: { icon: "🏧", text: "Withdrawn from Savings" },
  csv_export: { icon: "📄", text: "CSV Exported" },
  pdf_export: { icon: "📑", text: "Statement Generated" },
};

const AIChat = ({ fullHeight = false, onAction, $widget = false }) => {
  const getStorageKey = () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      return user?.id ? `ai-chat-messages-${user.id}` : "ai-chat-messages";
    } catch {
      return "ai-chat-messages";
    }
  };

  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(getStorageKey());
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        role: "assistant",
        content: GREETING,
      },
    ];
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [pendingDraft, setPendingDraft] = useState(null);
  const [draftOptions, setDraftOptions] = useState(null);
  const [recording, setRecording] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [voiceError, setVoiceError] = useState("");
  const [recordTime, setRecordTime] = useState(0);
  const [transcribing, setTranscribing] = useState(false);
  const messagesEndRef = useRef(null);
  const recorderRef = useRef(null);
  const streamRef = useRef(null);
  const sendMessageRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    setVoiceSupported(!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia));
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(getStorageKey(), JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (recording) {
      setRecordTime(0);
      timerRef.current = setInterval(() => setRecordTime((t) => t + 1), 1000);
    } else {
      clearInterval(timerRef.current);
      setRecordTime(0);
    }
    return () => clearInterval(timerRef.current);
  }, [recording]);

  useEffect(() => {
    return () => {
      if (recorderRef.current && recorderRef.current.state !== "inactive") {
        recorderRef.current.stop();
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  const stopRecording = useCallback(() => {
    if (recorderRef.current && recorderRef.current.state !== "inactive") {
      recorderRef.current.requestData();
      recorderRef.current.stop();
    }
    setRecording(false);
  }, []);

  const startRecording = useCallback(async () => {
    setVoiceError("");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const audioCtx = new AudioContext();
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);

      const chunks = [];
      const recorder = new MediaRecorder(stream);
      recorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      recorder.onstop = async () => {
        console.log("Recording stopped, chunks:", chunks.length);
        setRecording(false);

        if (chunks.length === 0) {
          setVoiceError("No audio recorded.");
          return;
        }

        setTranscribing(true);

        try {
          const blob = new Blob(chunks, { type: recorderRef.current?.mimeType || "audio/webm" });
          console.log("Audio blob size:", blob.size, "bytes, type:", blob.type);

          const reader = new FileReader();
          reader.onloadend = async () => {
            const base64 = reader.result.split(",")[1];
            console.log("Base64 length:", base64.length);

            try {
              console.log("Sending to transcribe API...");
              const res = await transcribeAudio(base64);
              console.log("Transcription result:", res.data.text);
              const text = res.data.text?.trim();
              if (text) {
                setInput(text);
                setTimeout(() => sendMessageRef.current?.(text), 150);
              } else {
                setVoiceError("No speech detected. Try again.");
              }
            } catch (err) {
              console.error("Transcription API error:", err.response?.data || err.message);
              setVoiceError("Transcription failed: " + (err.response?.data?.message || err.message));
            } finally {
              setTranscribing(false);
            }
          };
          reader.readAsDataURL(blob);
        } catch {
          setVoiceError("Failed to process audio.");
          setTranscribing(false);
        }
      };

      recorder.start(500);
      setRecording(true);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      let maxVol = 0;
      const checkVolume = () => {
        if (recorder.state !== "recording") return;
        analyser.getByteFrequencyData(dataArray);
        const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
        if (avg > maxVol) maxVol = avg;
        requestAnimationFrame(checkVolume);
      };
      checkVolume();
      setTimeout(() => {
        console.log("Max volume during recording:", maxVol);
        audioCtx.close();
      }, 10000);
    } catch (err) {
      console.error("Mic access error:", err);
      if (err.name === "NotAllowedError") {
        setVoiceError("Microphone access denied. Allow mic permission.");
      } else {
        setVoiceError("Cannot access microphone.");
      }
    }
  }, []);

  const toggleRecording = () => {
    if (recording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

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

      const draft = pendingDraft;
      setPendingDraft(null);

      const res = await chatWithAI(text.trim(), history, draft);
      const action = res.data.action || null;
      const pending = res.data.pendingAction || null;
      const nextDraft = res.data.pendingDraft || null;

      if (nextDraft) {
        setPendingDraft(nextDraft);
        setDraftOptions({ need: res.data.need, options: res.data.options || [] });
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: res.data.answer,
          },
        ]);
      } else if (pending) {
        setPendingAction(pending);
        setDraftOptions(null);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: res.data.answer,
            pendingAction: pending,
          },
        ]);
      } else {
        setDraftOptions(null);
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

  sendMessageRef.current = sendMessage;

  const handleConfirm = async (confirmed) => {
    if (!pendingAction) return;

    const label = confirmed ? "Yes, do it" : "No, cancel";
    setMessages((prev) => [
      ...prev,
      { role: "user", content: label },
    ]);
    setPendingAction(null);
    setDraftOptions(null);
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
        content: GREETING,
      },
    ]);
    setPendingAction(null);
    setPendingDraft(null);
    setDraftOptions(null);
    localStorage.removeItem(getStorageKey());
  };

  const PENDING_LABELS = {
    add_income: "Add income",
    add_expense: "Add expense",
    create_budget: "Create/update budget",
    update_budget: "Update budget",
    remove_budget: "Remove budget",
    add_savings: "Add to savings",
    remove_savings: "Withdraw from savings",
    export_csv: "Export transactions to CSV",
    export_pdf: "Generate bank statement PDF",
  };

  const downloadFile = (data, filename, mimeType, isBase64 = false) => {
    let blob;
    if (isBase64) {
      const binary = atob(data);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      blob = new Blob([bytes], { type: mimeType });
    } else {
      blob = new Blob([data], { type: mimeType });
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename || "file";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
                  {msg.action.csv && (
                    <S.DownloadButton onClick={() => downloadFile(msg.action.csv, msg.action.filename, "text/csv;charset=utf-8;")}>
                      <svg viewBox="0 0 24 24">
                        <path d="M12 2a2 2 0 0 1 2 2v10.59l3.29-3.29 1.42 1.41L13 18.42a2 2 0 0 1-2 0L6.29 12.7l1.42-1.41L11 14.59V4a2 2 0 0 1 1-1.73V2zM4 20h16v2H4v-2z" />
                      </svg>
                      Download CSV
                    </S.DownloadButton>
                  )}
                  {msg.action.pdfBase64 && (
                    <S.DownloadButton onClick={() => downloadFile(msg.action.pdfBase64, msg.action.filename, "application/pdf", true)}>
                      <svg viewBox="0 0 24 24">
                        <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 8H4v12c0 1.1.9 2 2 2h12v-2H6V8zm8 3h2v2h-2v2h-2v-2h-2v-2h2v-2h2v2z" />
                      </svg>
                      Download PDF
                    </S.DownloadButton>
                  )}
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

      {!loading && !pendingAction && !pendingDraft && (
        <S.Suggestions>
          {SUGGESTIONS.map((text) => (
            <S.SuggestionChip key={text} onClick={() => handleSuggestion(text)}>
              {text}
            </S.SuggestionChip>
          ))}
          <S.ClearButton onClick={clearChat}>Clear chat</S.ClearButton>
        </S.Suggestions>
      )}

      {!loading && pendingDraft && draftOptions?.options?.length > 0 && (
        <S.OptionRow>
          {draftOptions.options.map((opt) => (
            <S.OptionChip key={opt} onClick={() => sendMessage(opt)}>
              {opt}
            </S.OptionChip>
          ))}
        </S.OptionRow>
      )}

      <S.InputArea>
        {voiceSupported && (
          <S.MicButton $recording={recording} onClick={toggleRecording}>
            <svg viewBox="0 0 24 24">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
            </svg>
          </S.MicButton>
        )}
        <S.Input
          placeholder={pendingDraft ? "Type your answer... (or 'cancel')" : recording ? "Listening..." : "Ask about your finances..."}
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
      {voiceError && (
        <div style={{ padding: "4px 12px 8px", fontSize: "11px", color: "var(--danger-500)" }}>
          {voiceError}
        </div>
      )}
      {recording && (
        <S.RecordingBar>
          <S.VoiceDot />
          <span>Recording... {recordTime}s — click mic to stop</span>
        </S.RecordingBar>
      )}
      {transcribing && (
        <S.RecordingBar>
          <S.VoiceDot />
          <span>Transcribing...</span>
        </S.RecordingBar>
      )}
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
