import s from "./style.module.scss";
import Button from "@mui/material/Button";
import proptypes from "prop-types";

export default function DefaultButton({ children, ...rest }) {
  return <>
    <Button className={s.button} {...rest}>{children}</Button>
  </>;
}

DefaultButton.propTypes = {
  children: proptypes.elementType
};
