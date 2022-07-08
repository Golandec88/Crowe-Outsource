import { clientType, projectType, userType } from "@store/types";

export interface IProjectState {
  projects: projectType[];
  clients: clientType[];
  operators: userType[];
}
