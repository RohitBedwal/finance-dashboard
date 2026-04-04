import { lazy } from "react";
import PageNotFound from "../web/pages/PageNotFound";
import { errorRoutes, protectedRoutes } from "./index";
import Goal from "../web/pages/Goal";

const Dashboard = lazy(() => import("../web/pages/Dashboard"));
const Transactions = lazy(() => import("../web/pages/Transactions"));
// const Goal = lazy(() => import("../web/pages/Goal"));
const Analytics = lazy(() => import("../web/pages/Analytics"));
const Settings = lazy(() => import("../web/pages/Settings"));

export const OPEN_ROUTES = {
  // add open/public routes here
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
  goal: {
    exact: true,
    path: protectedRoutes.goal,
    component: Goal,
  },
  analytics: {
    exact: true,
    path: protectedRoutes.analytics,
    component: Analytics,
  },
  settings: {
    exact: true,
    path: protectedRoutes.settings,
    component: Settings,
  },
};

export const ERROR_ROUTES = {
  pageNotFound: {
    path: errorRoutes.pageNotFound,
    component: PageNotFound,
  },
};
