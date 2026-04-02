export const isUserAuthorized = Boolean(
  typeof window !== "undefined" && window.localStorage?.getItem("accessToken")
);

export const getAccessAndNewRefreshToken = async () => {
  // Placeholder: integrate your real refresh-token flow here.
  return null;
};
