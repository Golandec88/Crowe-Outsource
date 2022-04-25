import proptypes from "prop-types";
import { Box } from "@mui/material";
import s from "./style.module.scss";

export default function Card(props) {
  const { children, marginBottom, disableRadius } = props;

  return <>
    <Box className={formatClassName(marginBottom, disableRadius)}>
      {children}
    </Box>
  </>;
}

function formatClassName(marginBottom, disableRadius) {
  let result = s.card;
  if (marginBottom)  result =+ " " + s.mb;
  if (disableRadius) result =+ " " + s["disable-radius-" + disableRadius];
  return result;
}

Card.propTypes = {
  children: proptypes.node,
  marginBottom: proptypes.bool,
  disableRadius: proptypes.oneOf(["top", "bottom", "right", "left", "all"])
};

Card.defaultProps = {
  marginBottom: false
};
