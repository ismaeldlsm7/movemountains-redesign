import React from "react";
import ReactDOM from "react-dom/client";
import "./theme.css";
import App from "./App";

// Initialize theme before React mounts (avoids flash)
const saved = localStorage.getItem("mm-theme");
const systemPrefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
const initialTheme = saved || (systemPrefersLight ? "light" : "dark");
document.documentElement.setAttribute("data-theme", initialTheme);

// Follow system changes if user hasn't manually chosen
if (window.matchMedia) {
  window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", (e) => {
    if (!localStorage.getItem("mm-theme")) {
      document.documentElement.setAttribute("data-theme", e.matches ? "light" : "dark");
    }
  });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);