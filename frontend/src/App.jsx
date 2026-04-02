import React, { useEffect, useLayoutEffect } from "react";
import { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";
import { Route, Routes, useLocation } from "react-router-dom";

import ProtectedRouter from "./components/web/routes/ProtectedRouter";
import theme from "./theme";
import { CloseButton } from "./components/web/atoms/toaster";
import PageNotFound from "./components/web/pages/PageNotFound";

import "react-toastify/dist/ReactToastify.css";

// Demo mode: auth is bypassed for now.
// const TIMER_TO_REFRESH_TOKEN = 5 * 60 * 1000;

const App = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    // Demo mode: no token refresh.
    return undefined;
  }, []);

  return (
    <ThemeProvider theme={{ ...theme.default }}>
      <Routes location={location}>
        <Route
          path="/*"
          element={<ProtectedRouter />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <ToastContainer
        bodyClassName={"toastify"}
        closeButton={<CloseButton />}
        position="top-center"
      />
    </ThemeProvider>
  );
};

export default App;
