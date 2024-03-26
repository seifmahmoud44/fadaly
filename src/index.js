import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AddId from "./pages/AddId";
import TakePic from "./pages/TakePic";
import History from "./pages/History";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "addid",
        element: <AddId />,
      },
      {
        path: "takepic",
        element: <TakePic />,
      },
      {
        path: "history",
        element: <History />,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
