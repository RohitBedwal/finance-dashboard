import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import AppWrapper from "../../templates";
import PageNotFound from "../pages/PageNotFound";
import { PROTECTED_ROUTES } from "../../routes/componentRoutes";
import { protectedRoutes } from "../../routes";

const ProtectedRouter = () => {
  return (
    <AppWrapper>
      <Suspense fallback={null}>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={protectedRoutes.dashboard} replace />}
          />

          {Object.values(PROTECTED_ROUTES).map(({ path, component: Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </AppWrapper>
  );
};

export default ProtectedRouter;
