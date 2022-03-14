import Validator from "@fields/validator";
import { TextField } from "@mui/material";
import s from "./style.module.scss";

const textField = props => {
  const { rules, rounded, ...rest } = props;

  return <>
    <Validator schema={rules ? rules : []}>
      <TextField
        className={`${s.text_field} ${rounded ? s.rounded : ""}`}
        {...rest}
      />
    </Validator>
  </>;
};

export default textField;