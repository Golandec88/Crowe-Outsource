import Validator from "@fields/validator";
import { TextField } from "@mui/material";
import s from "./style.module.scss";
import proptypes from "prop-types";

export default function CustomTextField(props) {
  const { rules, rounded, value, loading, ...rest } = props;

  return <>
    <Validator schema={rules ? rules : []} value={value ? value : ""}>
      <TextField
        disabled={loading}
        className={`${s.text_field} ${rounded ? s.rounded : ""}`}
        {...rest}
      />
    </Validator>
  </>;
}

CustomTextField.propTypes = {
  rules: proptypes.array,
  rounded: proptypes.bool,
  value: proptypes.oneOfType([proptypes.string, proptypes.number]),
  loading: proptypes.bool
};

CustomTextField.defaultProps = {
  value: "",
  rules: [],
  loading: false,
  rounded: false
};
