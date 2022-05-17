import { createContext } from "react";

export const initialState = {
  type: null,
  message: null,
  setValue: (value) => value
};

const NotificationsContext = createContext(initialState);

function showMessage({ type, message }) {
  NotificationsContext.Provider.setState({ type, message });
}

export { NotificationsContext, showMessage };
