import * as React from "react";

import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import "./src/custom.d.ts";
import store from "./src/redux/store/store";
// Handle runtime errors

const showErrorOverlay = (err: Event) => {
  const ErrorOverlay = customElements.get("vite-error-overlay");
  if (!ErrorOverlay) {
    return;
  }
  const overlay = new ErrorOverlay(err);
  const body = document.body;
  if (body !== null) {
    body.appendChild(overlay);
  }
};

window.addEventListener("error", showErrorOverlay);
window.addEventListener("unhandledrejection", ({ reason }) =>
  showErrorOverlay(reason)
);

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
