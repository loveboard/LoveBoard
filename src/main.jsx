import React from 'react'
import ReactDOM from 'react-dom/client'


/* pages/routes imports */
import Root from "./routes/root";
import ErrorPage from "./error-page";
import Contact from "./routes/contact";
import Creator from "./routes/creator";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "contacts/:contactId",
    element: <Contact />,
  },,
  {
    path: "profile",
    element: <Creator />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);