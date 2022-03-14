import { createContext, useState } from "react";
import SignButton from "@buttons/sign";
import TextField from "@fields/text-field";
import { Box, Grid } from "@mui/material";
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
 
export const Context = createContext({});

const Generator = ({ grow, spacing, schema }) => {
  if(!schema) throw new Error("\"schema\" prop in \"Generator\" is required");
  const [validationStatus, setValidationStatus] = useState({});

  return <>
    <LocalizationProvider dateAdapter={DateAdapter}>
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

                if(field.type.split("-")[0] === "button") {
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
                    setValidationStatus: event => setValidationStatus({ ...validationStatus, ...event }),
                    key: `#${field.type}-${index}-${subIndex}`,
                    validationStatus
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

    </LocalizationProvider>
  </>;
};

Generator.propTypes = {
  schema: proptypes.array,
  grow: proptypes.number,
  spacing: proptypes.number
};

Generator.defaultProps = {
  grow: 1,
  spacing: 1
};

export default Generator;