import { DatePicker } from "@mui/lab";
import TextField from "@components/fields/text-field";

export default function DatePickerField(props) {
  return <>
    <DatePicker
      renderInput={(params) => <TextField {...params}/>}
      onChange={() => {}}
      {...props}
    />
  </>;
}
