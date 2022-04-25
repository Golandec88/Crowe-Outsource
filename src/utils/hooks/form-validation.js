import { useEffect, useState } from "react";
import needValidation from "@utils/need-validation";

export default schema => {
  const [validationStatus, setValidationStatus] = useState({});
  const [buttonsDisabled, setButtonsDisabled] = useState(true);

  const validationHandler = event => {
    setValidationStatus(Object.assign(validationStatus, event));
    setButtonsDisabled(Object.values(validationStatus).map(item => item.touched && item.value).some(item => item === false));
  };

  useEffect(() => {
    schema.map((item, index) => {
      item.child.map((field, subIndex) => {
        if(needValidation(field.type)) {
          setValidationStatus(Object.assign(validationStatus, { [`#${field.type}-${index}-${subIndex}`]: { value: false, touched: false } }));
          setButtonsDisabled(true);
        }
      });
    });
  }, [schema, validationStatus]);

  return [validationStatus, validationHandler, buttonsDisabled];
};


