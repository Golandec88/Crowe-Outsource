import * as icons from "@mui/icons-material";
import React from "react";

export type IconNames = keyof typeof icons;

interface IGenericIconProps {
  name: IconNames;
}

export const MuiIcon = ({ name }: IGenericIconProps): JSX.Element => {
  const Icon = icons[name];
  return <Icon />;
};
