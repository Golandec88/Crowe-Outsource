import { useState } from "react";
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

export default function field({
  value,
  onInput,
  type,
  error = false,
  label,
  helperText = "",
  required = false,
  ...rest
}) {
  const [showPassword, setShowPassword] = useState(false);
  const key = Math.random();

  return (
    <FormControl
      error={error}
      fullWidth
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
        onInput={(e) => onInput(e.target.value)}
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
                onClick={() => onInput("")}
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
