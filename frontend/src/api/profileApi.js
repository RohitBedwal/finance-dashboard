import api from "./axios";

export const getCompanyDetails = () =>
  api.get("/profile");

export const updateCompanyDetails = (details) =>
  api.put("/profile", details);
