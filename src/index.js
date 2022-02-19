import { render } from "react-dom";
import { StrictMode } from "react";
import { Provider } from "react-redux";

import { BrowserRouter as Router } from "react-router-dom";

import store from "@src/store/store";
import App from "@components/app";

if (module.hot) module.hot.accept();

render(
  <Provider store={store}>
    <StrictMode>
      <Router>
        <App/>
      </Router>
    </StrictMode>
  </Provider>,
  document.getElementById("app")
);