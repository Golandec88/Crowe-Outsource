import { render } from "react-dom";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "@src/store/create-store.js";
import App from "@components/app";
import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";

if (module.hot) module.hot.accept();

render(
  <Provider store={store}>
    <StrictMode>
      <Router>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </Router>
    </StrictMode>
  </Provider>,
  document.getElementById("app")
);
