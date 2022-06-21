import s from "./style.module.scss";
import { Visibility, VisibilityOff, Close } from "@mui/icons-material";
import { Controller } from "react-hook-form";
import { useState } from "react";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

export default function Field({
  control,
  resetField,
  type = "text",
  label,
  name = undefined,
  required = false,
  rules = {},
  fullWidth = false,
  ...rest
}) {
  const [showPassword, setShowPassword] = useState(false);
  const key = Math.random();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl
          error={!!error}
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
            onChange={onChange}
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
                    onClick={() => resetField(name)}
                    edge="end"
                  >
                    <Close />
                  </IconButton>
                )}
              </InputAdornment>
            }
          />
          {!!error && (
            <FormHelperText id={`outlined-weight-helper-${key}`}>
              {error.message}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}

// Field.proptypes = {
//   value: proptypes.any,
//   onInput: proptypes.func,
//   type: proptypes.string,
//   label: proptypes.string,
//   required: proptypes.bool,
//   fullWidth: proptypes.bool,
//   rules: proptypes.array,
//   name: proptypes.string,
// };
