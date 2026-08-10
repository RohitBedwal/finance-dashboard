import api from "./axios";

export const parseTransaction = (text) =>
  api.post("/ai/parse-transaction", { text });

export const getInsights = () =>
  api.post("/ai/insights");

export const getPredictions = () =>
  api.post("/ai/predict");

export const chatWithAI = (question, history = [], pendingDraft = null) =>
  api.post("/ai/chat", { question, history, pendingDraft });

export const transcribeAudio = (audioBase64) =>
  api.post("/ai/transcribe", { audio: audioBase64 });
