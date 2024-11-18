import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { SpotifyContextProvider } from "./utils/contexts/ReturnedDataContext.tsx";
import { NotificationContextProvider } from "./utils/contexts/NotificationContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <SpotifyContextProvider>
        <NotificationContextProvider>
          <App />
        </NotificationContextProvider>
      </SpotifyContextProvider>
    </Router>
  </StrictMode>
);
