import { Box } from "@mui/material";
import s from "./style.module.scss";
import React, { ReactNode } from "react";
import { cardType } from "@components/cards/cards/types";

const Card: React.FC<cardType> = (props) => {
  const { children, marginBottom = false, disableRadius } = props;

  return (
    <>
      <Box className={formatClassName(marginBottom, disableRadius)}>
        {children}
      </Box>
    </>
  );
};

function formatClassName(marginBottom: boolean, disableRadius?: string) {
  let result = s.card;
  if (marginBottom) result = +" " + s.mb;
  if (disableRadius) result = +" " + s["disable-radius-" + disableRadius];
  return result;
}

export default Card;
