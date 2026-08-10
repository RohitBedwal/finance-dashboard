import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { registerSW } from "virtual:pwa-register";
import "./index.css";
import "./components/css/root.scss";
import App from "./App.jsx";
import { TransactionFilterProvider } from "./context/TransactionFilterContext.jsx";
import { DataProvider } from "./context/DataContext.jsx";

registerSW({ immediate: true });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <TransactionFilterProvider>
    <DataProvider>

      <App />
    </DataProvider>
    </TransactionFilterProvider>
    </BrowserRouter>
  </StrictMode>,
)
