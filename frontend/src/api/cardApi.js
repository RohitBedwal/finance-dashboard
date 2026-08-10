import api from "./axios";

export const getCards = () =>
  api.get("/cards");

export const addCard = (card) =>
  api.post("/cards", card);

export const deleteCard = (id) =>
  api.delete(`/cards/${id}`);
