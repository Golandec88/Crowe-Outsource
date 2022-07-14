import { roleType } from "@hooks/types";

// TODO старайся писать типы в стиле какого нибуь ООП, я имею ввиду с большой буквы - так проще воспринимать их

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

