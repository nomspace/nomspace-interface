import "react-app-polyfill/stable";
import "@celo-tools/use-contractkit/lib/styles.css";
import "react-toastify/dist/ReactToastify.min.css";
import "src/index.css";

import {
  Alfajores,
  Celo,
  ContractKitProvider,
} from "@celo-tools/use-contractkit";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "src/state";
import theme from "src/theme";
import { ThemeProvider } from "theme-ui";
import { HashRouter as Router } from "react-router-dom";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

if (process.env.REACT_APP_SENTRY_DSN) {
  const sentryCfg = {
    environment: `${process.env.REACT_APP_VERCEL_ENV ?? "unknown"}`,
    release: `${
      process.env.REACT_APP_VERCEL_GIT_COMMIT_REF?.replace(/\//g, "--") ??
      "unknown"
    }-${process.env.REACT_APP_VERCEL_GIT_COMMIT_SHA ?? "unknown"}`,
  };
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 0.2,
    ...sentryCfg,
  });
  console.log(
    `Initializing Sentry environment at release ${sentryCfg.release} in environment ${sentryCfg.environment}`
  );
} else {
  console.warn(`REACT_APP_SENTRY_DSN not found. Sentry will not be loaded.`);
}

ReactDOM.render(
  <React.StrictMode>
    <ContractKitProvider
      dapp={{
        name: "Nomspace",
        description: "Protocol for name registration",
        url: "https://app.nom.space",
        icon: "https://www.nom.space/favicon-32x32.png",
        supportedNetworks: [Celo, Alfajores],
      }}
    >
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <App />
          </Router>
        </Provider>
      </ThemeProvider>
    </ContractKitProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
