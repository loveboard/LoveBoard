import React from 'react'
import ReactDOM from 'react-dom/client'


/* pages/routes imports */
import Root from "./routes/root"
import ErrorPage from "./error-page"
import Creator from "./routes/creator"

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css'


import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://c9f27295ccc34bb002e4794092fc706a@o4506555540766720.ingest.sentry.io/4506555542732800",
  integrations: [
    new Sentry.BrowserTracing({
      // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
    }),
    new Sentry.Replay({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});




const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
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