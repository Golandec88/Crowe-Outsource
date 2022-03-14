import proptypes from "prop-types";
import { Box } from "@mui/material";
import s from "./style.module.scss";

export default function Card({ children, marginBottom, disableRadius }) {
  return <Box className={`${s.card} ${marginBottom ? s.mb : ""} ${disableRadius ? s["disable-radius-" + disableRadius] : ""}`}>
    {children}
  </Box>;
}

Card.propTypes = {
  marginBottom: proptypes.bool,
  children: proptypes.node,
  disableRadius: proptypes.oneOf(["top", "bottom", "right", "left", "all"])
};

Card.defaultProps = {
  marginBottom: false
};