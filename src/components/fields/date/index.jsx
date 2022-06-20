import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import proptypes from "prop-types";
import { Controller } from "react-hook-form";
import s from "../field/style.module.scss";

import TextField from "@mui/material/TextField";

export default function DatePickerField({
  name = undefined,
  label = "Date",
  rules = {},
  control,
}) {
  function onChangeHandler(newDate, callback) {
    try {
      callback(new Date(newDate).toISOString());
    } catch {
      callback(newDate);
    }
  }

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={new Date().toISOString()}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            inputFormat="dd/MM/yyyy"
            label={label}
            value={value}
            onChange={(date) => onChangeHandler(date, onChange)}
            error={!!error}
            renderInput={(params) => (
              <TextField {...params} fullWidth className={s.field} />
            )}
          />
        </LocalizationProvider>
      )}
    />
  );
}

DatePickerField.proptypes = {
  value: proptypes.any,
  onChange: proptypes.func,
  label: proptypes.string,
  name: proptypes.string,
};
