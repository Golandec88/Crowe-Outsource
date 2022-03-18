import { Context } from "@forms/generator";
import proptypes from "prop-types";
import { cloneElement, useContext, useEffect, useState } from "react";

export default function Validator({ children, schema, value, ...rest }) {
  const [error, setError] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const { key, setValidationStatus } = useContext(Context);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const check = (touched, value, counter = 0) => {
    if (!touched || !schema[counter]) {
      setError(false);
      setValidationStatus({ [key]: { value: true, touched } });
      return;
    }
    if (typeof schema[counter](value) === "string") {
      setError(schema[counter](value));
      setValidationStatus({ [key]: { value: false, touched } });
      return;
    }
    return check(touched, value, counter + 1);
  };

  const onChange = (event) => {
    if(schema) check(true, event.target.value);
    setLocalValue(event.target.value);
  };

  return cloneElement(children, Object.assign({
    value: localValue,
    onChange
  }, schema ? {
    helperText: error,
    error: !!error,
  } : {}, rest));
}

Validator.protopTypes = {
  children: proptypes.elementType,
  schema: proptypes.array,
  value: proptypes.string
};
