import { ReactNode } from "react";

export type cardType = {
  children: ReactNode;
  marginBottom?: boolean;
  disableRadius?: "top" | "bottom" | "right" | "left" | "all";
};
