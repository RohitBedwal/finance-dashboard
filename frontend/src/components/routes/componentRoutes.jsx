import { lazy } from "react";
import PageNotFound from "../web/pages/PageNotFound";

import { errorRoutes, openRoutes, protectedRoutes } from "./index";

const Login = lazy(() => import("../web/pages/Login"));

const Dashboard = lazy(() => import("../web/pages/Dashboard"));
const Transactions = lazy(() => import("../web/pages/Transactions"));
const Budget = lazy(() => import("../web/pages/Budget"));
const Analytics = lazy(() => import("../web/pages/Analytics"));

export const OPEN_ROUTES = {
  login: {
    exact: true,
    path: openRoutes.login,
    component: Login,
  },
   register: {
    path: "/register",
    component: Login,
  },
};

export const PROTECTED_ROUTES = {
  dashboard: {
    exact: true,
    path: protectedRoutes.dashboard,
    component: Dashboard,
  },
  transactions: {
    exact: true,
    path: protectedRoutes.transactions,
    component: Transactions,
  },
  budget: {
    exact: true,
    path: protectedRoutes.budget,
    component: Budget,
  },
  analytics: {
    exact: true,
    path: protectedRoutes.analytics,
    component: Analytics,
  },
};

export const ERROR_ROUTES = {
  pageNotFound: {
    path: errorRoutes.pageNotFound,
    component: PageNotFound,
  },
};