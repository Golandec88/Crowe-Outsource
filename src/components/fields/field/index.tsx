import s from "./style.module.scss";
import { Visibility, VisibilityOff, Close } from "@mui/icons-material";
import React, { useRef, useState } from "react";
import { IMaskInput } from "react-imask";
import { Controller } from "react-hook-form";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { fieldType, TextMaskCustomType } from "@fields/field/types";

export default function Field<T>({
  control,
  resetField,
  type = "text",
  label,
  name,
  required = false,
  rules,
  fullWidth = false,
  mask,
  ...rest
}: React.PropsWithChildren<fieldType<T>>) {
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
            inputProps={{
              mask,
              name,
            }}
            {...rest}
            inputComponent={mask ? TextMaskCustom : "input"}
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
const maskInputRef = useRef(null);

const TextMaskCustom: React.FC = (props: TextMaskCustomType) => {
  const { onChange, mask, name, ...other } = props;

  return (
    <IMaskInput
      {...other}
      mask={mask}
      inputRef={() => maskInputRef}
      onAccept={(e: Event) =>
        onChange({
          value: (e.target as HTMLInputElement).value,
          name: props.name,
        })
      }
      overwrite
    />
  );
};
