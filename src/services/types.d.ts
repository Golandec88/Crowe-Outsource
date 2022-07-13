import { roleType } from "@hooks/types";
import { ReactNode } from "react";
import { RouteComponentProps } from "react-router-dom";

export type routerServiceType = {
  isAuth: boolean;
  role: roleType;
};

export type messageType = {
  message: string | null;
  type: string | null;
};

export type notificationStateType = {
  setValue: (value: messageType) => messageType;
} & messageType;

export type routerType = {
  path: string;
  element: RouteComponentProps;
  index: boolean;
};
