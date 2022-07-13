import { createContext } from "react";
import { messageType, notificationStateType } from "@services/types";
import { Context } from "vm";

export const initialState = {
  type: null,
  message: null,
  setValue: (value) => value,
} as notificationStateType;

const NotificationsContext = createContext(initialState) as Context;

function showMessage({ type, message }: messageType) {
  NotificationsContext.Provider.setState({ type, message });
}

export { NotificationsContext, showMessage };
