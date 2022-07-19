import { filesType } from "@store/types";

export type colorsType = {
  color:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  type: string;
  text: string;
};

export type replyBttonsType = {
  disabled?: boolean;
  id: string;
  staffType: "call-center" | "manager";
  onChange: (modelType: string | null, id: string) => void;
  checkedList: filesType[];
};
