import { StrictMode } from "react";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import "./global.css";

import store from "@services/store-service";
import i18n from "@services/i18n-service";

import Notification from "@components/notification";
import Router from "@components/router";

export default function App() {
  return <>
    <StrictMode>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <Router />
          <Notification />
        </Provider>
      </I18nextProvider>
    </StrictMode>
  </>;
}
