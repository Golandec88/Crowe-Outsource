import { Context } from "@forms/generator";
import proptypes from "prop-types";
import { cloneElement, useContext, useEffect, useState } from "react";

const Validator = props => {
  const { children, schema, ...rest } = props;
  const [error, setError] = useState(false);
  const { key, setValidationStatus } = useContext(Context);

  const check = (touched, value, counter = 0) => {
    if (!touched || !schema[counter]) {
      setError(false);
      setValidationStatus({ [key]: { value: true, touched } });
      return;
    }
    if (typeof schema[counter](value) === "string") {
      setError(schema[counter](value));
      setValidationStatus({ [key]: { value: false, touched } });
    } else return check(touched, value, counter + 1);
  };

  useEffect(() => {
    check(false);
  }, []);

  if (!schema) return cloneElement(children, ...rest);
  else return cloneElement(children, {
    ...{
      onChange: event => check(true, event.target.value),
      helperText: error,
      error: !!error
    }, ...rest
  });
};

Validator.protopTypes = {
  children: proptypes.elementType,
  schema: proptypes.array
};

export default Validator;