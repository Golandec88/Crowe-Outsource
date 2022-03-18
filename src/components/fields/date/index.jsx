import { useState } from "react";
import { DatePicker } from "@mui/lab";
import TextField from "@components/fields/text-field";
import proptypes from "prop-types";

export default function DatePickerField({ value, ...rest }) {
  const [localValue, setLocalValue] = useState(value);

  return <>
    <DatePicker
      label="Basic example"
      value={localValue}
      renderInput={(params) => <TextField {...params} {...rest} />}
      onChange={setLocalValue}
    />
  </>;
}

DatePickerField.propTypes = {
  value: proptypes.string
};

DatePickerField.defaultProps = {
  value: null
};
