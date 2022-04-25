import { createContext } from "react";
import proptypes from "prop-types";

import { LocalizationProvider } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDateFns";
import { Box, FormControl, Grid } from "@mui/material";

import s from "./style.module.scss";

import Title from "@components/title";
import SignButton from "@buttons/sign";
import TextField from "@fields/text-field";
import DatePicker from "@fields/date";

import needValidation from "@utils/need-validation";
import useFormValidation from "@hooks/form-validation";

const fields = {
  "title": Title,
  "text": TextField,
  "date": DatePicker,
  "button-sign": SignButton
};

export const Context = createContext({
  validationStatus: {},
  setValidationStatus: () => {},
  key: ""
});

export default function Generator({ grow, spacing, schema }) {
  const [validationStatus, setValidationStatus, isDisabled] = useFormValidation(schema);

  return <>
    <LocalizationProvider dateAdapter={DateAdapter}>
      <FormControl>
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
                  const type = field.type;
                  const Component = fields[type];

                  if(needValidation(type)) {
                    return createField(
                      field,
                      `${index}-${subIndex}`,
                      setValidationStatus,
                      validationStatus
                    )(Component);
                  }

                  return <Component
                    {...field.props}
                    key={`#button-key-${index}-${subIndex}`}
                    disabled={isDisabled}
                  />;
                })}
              </Grid>
            </Grid>)}
          </Grid>
        </Box>
      </FormControl>
    </LocalizationProvider>
  </>;
}

function createField(field, key, setStatus, status) {
  const { type, cols, flat, props } = field;

  return function render(Component) {
    return <Context.Provider
      key={`#${type}-${key}`}
      value={{
        setValidationStatus: setStatus,
        validationStatus: status,
        key: `#${type}-${key}`,
      }}>
      <Grid
        className={flat && s.flat}
        item
        key={`#grid-key-${key}`}
        xs={cols ? cols : 12}
      >
        <Component {...props}/>
      </Grid>
    </Context.Provider>;
  };
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
