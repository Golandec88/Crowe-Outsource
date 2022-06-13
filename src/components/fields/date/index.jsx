import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import s from "../field/style.module.scss";
import proptypes from "prop-types";

import TextField from "@mui/material/TextField";

export default function DatePickerField({
  onChange,
  value,
  name = undefined,
  label = "Date",
}) {
  function onChangeHandler(newDate) {
    try {
      onChange(new Date(newDate).toISOString(), name);
    } catch {
      onChange(newDate, name);
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        inputFormat="dd/MM/yyyy"
        label={label}
        value={value}
        onChange={onChangeHandler}
        renderInput={(params) => (
          <TextField {...params} fullWidth className={s.field} />
        )}
      />
    </LocalizationProvider>
  );
}

DatePickerField.proptypes = {
  value: proptypes.any,
  onChange: proptypes.func,
  label: proptypes.string,
  name: proptypes.string,
};
