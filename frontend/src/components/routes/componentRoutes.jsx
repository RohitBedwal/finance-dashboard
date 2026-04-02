import { lazy } from "react";
import PageNotFound from "../web/pages/PageNotFound";
import { errorRoutes, protectedRoutes } from "./index";

const Dashboard = lazy(() => import("../web/pages/Dashboard"));
const Transactions = lazy(() => import("../web/pages/Transactions"));
const Wallet = lazy(() => import("../web/pages/Wallet"));
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
  wallet: {
    exact: true,
    path: protectedRoutes.wallet,
    component: Wallet,
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
