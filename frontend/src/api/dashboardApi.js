import api from "./axios";

export const getDashboardStats = () =>
  api.get("/dashboard/stats");

export const getTransactions = () =>
  api.get("/transactions");