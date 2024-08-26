import React from "react";
import { createRoot } from "react-dom/client"; // Updated import
import { HashRouter } from "react-router-dom";
import App from "./components/app";
import Style from "./style/main.scss";

function main() {
  const container = document.querySelector(".app-wrapper");
  const root = createRoot(container); // Create a root.
  root.render(
    <HashRouter>
      <App />
    </HashRouter>
  );
}

document.addEventListener("DOMContentLoaded", main);

