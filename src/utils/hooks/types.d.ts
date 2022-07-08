import { Dispatch } from "redux";
import { callbackType } from "@modules/global/types";

export type useDispatchFuncType<T> = (
  dispatch?: Dispatch,
  params?: T,
  callback?: callbackType
) => void;

export type roleType = {
  role: 1 | 2 | 3 | 4;
};

export type schemaType = {
  child: { type: string }[];
};

export type userType = {
  user: {
    roles: number;
  };
};
