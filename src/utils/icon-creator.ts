import { createElement } from "react";

const iconCreator = async (name: string) => {
  try {
    const icon = await import("@mui/icons-material/" + name);

    return createElement(icon);
  } catch (error) {
    throw new Error(error);
  }
};

export default iconCreator;
