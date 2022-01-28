import SignButton from "@buttons/sign";
import TextField from "@fields/text-field";
import { Box, Grid } from "@mui/material";
import proptypes from "prop-types";
import { createContext, useState } from "react";

const fields = {
  "text": TextField,
  "button-sign": SignButton
};
 
export const Context = createContext({});

const Generator = ({ grow, spacing, schema }) => {
  if(!schema) throw new Error("\"schema\" prop in \"Generator\" is required");
  const [validationStatus, setValidationStatus] = useState({});

  return <>
    <Box sx={{ flexGrow: grow }}>
      <Grid container spacing={spacing}>
        {schema.map((
          item,
          index
        ) => <Grid item key={index} xs={item.cols}>
          {item.child.map((
            field,
            subIndex
          ) => {
            const Component = fields[field.type];

            if(field.type.split("-")[0] === "button")
              return <Component
                {...field.props}
                key={`#key-${index}${subIndex}`}
                disabled={!Object
                  .values(validationStatus)
                  .every(item => item.touched ? item.value : false)}
              />;

            return <Context.Provider
              key={`#${field.type}-${index}-${subIndex}`}
              value={{
                setValidationStatus: event => setValidationStatus({ ...validationStatus, ...event }),
                key: `#${field.type}-${index}-${subIndex}`,
                validationStatus
              }}>
              <Component {...field.props}/>
            </Context.Provider>;
          })}
        </Grid>)}
      </Grid>
    </Box>
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