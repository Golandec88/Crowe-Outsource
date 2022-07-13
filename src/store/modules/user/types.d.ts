import { activitiesType, menuType, rolesType, userType } from "@store/types";

export interface IUserState {
  loading: boolean;
  error: boolean;
  token: string | null;
  info: userType;
  roles: rolesType;
  menu: menuType[];
  operators: userType[];
  activities: activitiesType[];
}
