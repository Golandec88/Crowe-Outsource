import Validator from "@fields/validator";
import { TextField } from "@mui/material";
import s from "./style.module.scss";

const textField = props => {
  const { rules, ...rest } = props;

  return <>
    <Validator schema={rules}>
      <TextField
        className={s.text_field}
        {...rest}
      />
    </Validator>
  </>;
};

export default textField;