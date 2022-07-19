import { projectType } from "@store/types";

export type projectsType = {
  items: projectType[];
  onAddProject?: (projectName: string) => void;
  role: string;
  loading: boolean;
};
