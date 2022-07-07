import { useState } from "react";
import proptypes from "prop-types";
import s from "@fields/field/style.module.scss";

import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff, Close } from "@mui/icons-material";

export default function CustomValidateField({
  value,
  onInput,
  type,
  error = false,
  label,
  helperText = "",
  required = false,
  fullWidth = false,
  name = undefined,
  rules = [],
  ...rest
}) {
  const [showPassword, setShowPassword] = useState(false);
  const key = Math.random();

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
        onInput={(e) => onInput(e.target.value, name, rules)}
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
            {value && (
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => onInput("", name, rules)}
                edge="end"
              >
                <Close />
              </IconButton>
            )}
          </InputAdornment>
        }
      />
      {helperText && (
        <FormHelperText id="outlined-weight-helper-text">
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}

CustomValidateField.proptypes = {
  value: proptypes.any,
  onInput: proptypes.func,
  type: proptypes.string,
  error: proptypes.bool,
  label: proptypes.string,
  helperText: proptypes.string,
  required: proptypes.bool,
  fullWidth: proptypes.bool,
};
