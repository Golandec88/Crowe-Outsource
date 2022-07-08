import { activitiesType, menuType, IRoles, userType } from "@store/types";

export interface IUserState {
  loading: boolean;
  error: boolean;
  token: string;
  info: userType;
  roles: IRoles;
  menu: menuType[];
  operators: userType[];
  activities: activitiesType[];
}
