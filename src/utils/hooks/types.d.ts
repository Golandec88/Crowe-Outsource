import { callbackType } from "@store/types";

export type useDispatchFuncType<T> = (
  params?: T,
  callback?: callbackType
) => void;

export type roleType = 1 | 2 | 3 | 4;

export type schemaType = {
  child: { type: string }[];
};

export type userType = {
  user: {
    roles: number;
  };
};
