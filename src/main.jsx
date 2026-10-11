import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// Fonts are bundled with the site (no Google Fonts request: faster and more private)
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
