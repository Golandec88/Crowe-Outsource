import { Button } from "@mui/material";
import proptypes from "prop-types";
import s from "./style.module.scss";

const SignButton = props => {
  const { children, ...rest } = props;

  return <>
    <Button className={s.button} {...rest}>
      {children}
    </Button>
  </>;
};

SignButton.propTypes = {
  children: proptypes.elementType
};

export default SignButton;
