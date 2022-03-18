import { createContext, useState } from "react";
import SignButton from "@buttons/sign";
import TextField from "@fields/text-field";
import { Box, FormControl, Grid } from "@mui/material";
import proptypes from "prop-types";
import Title from "@components/title";
import DateAdapter from "@mui/lab/AdapterDateFns";
import { LocalizationProvider } from "@mui/lab";
import DatePicker from "@fields/date";

const fields = {
  "title": Title,
  "text": TextField,
  "button-sign": SignButton,
  "date": DatePicker
};

export const Context = createContext({
  validationStatus: {},
  setValidationStatus: function () {
  },
  key: ""
});

export default function Generator({ grow, spacing, schema }) {
  const [validationStatus, setValidationStatus] = useState({});
  const handler = (val) => console.log(val);

  return <>
    <LocalizationProvider dateAdapter={DateAdapter}>
      <FormControl onChange={handler}>
        <Box sx={{ flexGrow: grow }}>
          <Grid container spacing={spacing}>
            {schema.map((
              item,
              index
            ) => <Grid item key={index} xs={item.cols}>
              <Grid container spacing={spacing}>
                {item.child.map((
                  field,
                  subIndex
                ) => {
                  const Component = fields[field.type];

                  if (field.type.split("-")[0] === "button") {
                    return <Component
                      {...field.props}
                      key={`#component-key-${index}${subIndex}`}
                      disabled={!Object
                        .values(validationStatus)
                        .every(item => item.touched ? item.value : false)}
                    />;
                  }

                  return <Context.Provider
                    key={`#${field.type}-${index}-${subIndex}`}
                    value={{
                      setValidationStatus: event => setValidationStatus(Object.assign(validationStatus, event)),
                      validationStatus,
                      key: `#${field.type}-${index}-${subIndex}`,
                    }}>
                    <Grid item key={`#grid-key-${index}${subIndex}`} xs={field.cols ? field.cols : 12}>
                      <Component {...field.props}/>
                    </Grid>
                  </Context.Provider>;
                })}
              </Grid>
            </Grid>)}
          </Grid>
        </Box>
      </FormControl>
    </LocalizationProvider>
  </>;
}

Generator.propTypes = {
  schema: proptypes.array,
  grow: proptypes.number,
  spacing: proptypes.number
};

Generator.defaultProps = {
  grow: 1,
  spacing: 1
};
