import Validator from "@fields/validator";
import { TextField } from "@mui/material";
import s from "./style.module.scss";
import proptypes from "prop-types";

export default function CustomTextField({ rules, rounded, value, ...rest }) {
  return <>
    <Validator schema={rules ? rules : []} value={value}>
      <TextField
        className={`${s.text_field} ${rounded ? s.rounded : ""}`}
        {...rest}
      />
    </Validator>
  </>;
}

CustomTextField.propTypes = {
  rules: proptypes.array,
  rounded: proptypes.bool,
  value: proptypes.string
};

CustomTextField.defaultProps = {
  value: ""
};
