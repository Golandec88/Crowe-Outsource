import { Button } from "@mui/material";
import proptypes from "prop-types";
import s from "./style.module.scss";

export default function SignButton({ children, ...rest }) {
  return <>
    <Button className={s.button} {...rest}>
      {children}
    </Button>
  </>;
}

SignButton.propTypes = {
  children: proptypes.elementType
};
