import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { PriceProvider } from "./contexts/PriceContext";

const API_KEY = "PY5454LK1DK9S6X2";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PriceProvider apiKey={API_KEY}>
      <App />
    </PriceProvider>
  </StrictMode>,
);
