import { useState } from "react";
import proptypes from "prop-types";
import s from "./style.module.scss";

import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff, Close } from "@mui/icons-material";

export default function Field({
  value,
  onInput,
  type,
  label,
  required = false,
  fullWidth = false,
  rules = [],
  name = undefined,
  ...rest
}) {
  const [showPassword, setShowPassword] = useState(false);
  const key = Math.random();
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  function inputHadler(value) {
    onInput(value, name);
    let isValid = true;

    if (rules.length) {
      rules.forEach((item) => {
        isValid = isValid === true ? item(value) : isValid;
      });
    }

    setError(isValid !== true);
    setHelperText(isValid === true ? "" : isValid);
  }

  return (
    <FormControl
      error={error}
      fullWidth={fullWidth}
      required={required}
      className={s.field}
      variant="outlined"
    >
      <InputLabel htmlFor={`outlined-field-${key}`}>{label}</InputLabel>
      <OutlinedInput
        id={`outlined-field-${key}`}
        label={label}
        type={type === "password" && showPassword ? "text" : type}
        value={value}
        onInput={(e) => inputHadler(e.target.value)}
        name={name}
        {...rest}
        endAdornment={
          <InputAdornment position="end">
            {value && type === "password" && (
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            )}
            {value && !rest.readOnly && (
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => inputHadler("")}
                edge="end"
              >
                <Close />
              </IconButton>
            )}
          </InputAdornment>
        }
      />
      {helperText && (
        <FormHelperText id={`outlined-weight-helper-${key}`}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}

Field.proptypes = {
  value: proptypes.any,
  onInput: proptypes.func,
  type: proptypes.string,
  label: proptypes.string,
  required: proptypes.bool,
  fullWidth: proptypes.bool,
  rules: proptypes.array,
  name: proptypes.string,
};
