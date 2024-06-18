import React from "react";
import ReactDOM from "react-dom/client";
import router from "./router.jsx";
import App from "./App.jsx";

import "./index.css";
import { RouterProvider } from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <RouterProvider router={router}>
    <App></App>
  </RouterProvider>
  // </React.StrictMode>
);
//
