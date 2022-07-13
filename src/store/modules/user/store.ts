import { IUserState } from "@modules/user/types";
import { rolesType, userType } from "@store/types";

export default {
  loading: false,
  error: false,
  token: null,
  info: {} as userType,
  roles: {} as rolesType,
  menu: [],
  operators: [],
  activities: [],
} as IUserState;
