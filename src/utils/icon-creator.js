import { createElement } from "react";

const iconCreator = name => {
  try {
    const icon = require("@mui/icons-material/" + name).default;
    
    return createElement(icon);
  } catch (error) {
    throw new Error(error);
  }
};

export default iconCreator;