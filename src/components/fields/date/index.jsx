import { useState } from "react";
import { DatePicker } from "@mui/lab";
import TextField from "@components/fields/text-field";
import proptypes from "prop-types";

export default function DatePickerField({ initialState, ...rest }) {
  const [value, setValue] = useState(initialState);

  return <>
    <DatePicker
      label="Basic example"
      value={value}
      renderInput={(params) => <TextField {...params} {...rest} />}
      onChange={(newValue) => {setValue(newValue);}}
    />
  </>;
}

DatePickerField.propTypes = {
  initialState: proptypes.string
};

DatePickerField.defaultProps = {
  initialState: null
};