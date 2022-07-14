import { roleType } from "@hooks/types";

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
