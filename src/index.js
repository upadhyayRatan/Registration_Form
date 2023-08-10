import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import Profile from "./Profile";
import {
  Routes,
  Route,
  useNavigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/profile/:email",
    element: <Profile />,
  },
]);
root.render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
