import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import AppWrapper from "../../templates";
import PageNotFound from "../pages/PageNotFound";
import Login from "../pages/Login";

import { PROTECTED_ROUTES } from "../../routes/componentRoutes";

const ProtectedRouter = () => {
  const token = localStorage.getItem("token");

  return (
    <Suspense fallback={null}>
      <Routes>
        {/* Root */}
        <Route
          path="/"
          element={
            token ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Public Routes */}
        <Route
          path="/login"
          element={
            token ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login />
            )
          }
        />

        <Route
          path="/register"
          element={
            token ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login />
            )
          }
        />

        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            token ? (
              <AppWrapper>
                <Routes>
                  {Object.values(PROTECTED_ROUTES).map(
                    ({ path, component: Component }) => (
                      <Route
                        key={path}
                        path={path}
                        element={<Component />}
                      />
                    )
                  )}

                  <Route
                    path="*"
                    element={<PageNotFound />}
                  />
                </Routes>
              </AppWrapper>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Suspense>
  );
};

export default ProtectedRouter;