import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import {Auth0Provider} from '@auth0/auth0-react'
import { MantineProvider } from "@mantine/core";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
    domain="dev-w4gdvyd3ugiug370.us.auth0.com"
    clientId='u5cFD4zQAVIPgDoD7tyzdo9rwQCuJqBN'
    authorizationParams={{
      redirect_uri:"https://real-estate-full-stack-nlw8.vercel.app"
    }}
    audience = "https://dev-w4gdvyd3ugiug370.us.auth0.com/api/v2/"
    scope="openid profile email"
    >
    {/* Wrap App with MantineProvider */}
    <MantineProvider withGlobalStyles withNormalizeCSS>
        <App />
      </MantineProvider>
    </Auth0Provider>
  </React.StrictMode>
)


