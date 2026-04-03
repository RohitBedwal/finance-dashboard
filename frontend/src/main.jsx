import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "./components/css/root.scss";
import App from "./App.jsx";
import { TransactionFilterProvider } from "./context/TransactionFilterContext.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <TransactionFilterProvider>

      <App />
    </TransactionFilterProvider>
    </BrowserRouter>
  </StrictMode>,
)
