import LoadingButton from "@mui/lab/LoadingButton";
import proptypes from "prop-types";
import s from "./style.module.scss";

export default function SignButton({ children, ...rest }) {
  return <>
    <LoadingButton className={s.button} {...rest}>
      {children}
    </LoadingButton>
  </>;
}

SignButton.propTypes = {
  children: proptypes.elementType
};
