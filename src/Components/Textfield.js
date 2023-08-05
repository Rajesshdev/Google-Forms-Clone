
import React, { useEffect } from "react";
import { TextField } from "@mui/material";
import { useFormikContext, getIn } from "formik";

const MyTextField = ({ name, label, type, size, formikProps, id, disable, prefix, setFieldValue, detail, index,variant }) => {
  // Access formik context
  const { values, errors, touched, handleChange, handleBlur } =
    useFormikContext();

  // Get field value, error, and touched status from formik values
  const fieldValue = getIn(values, name);
  const fieldError = getIn(errors, name);
  const fieldTouched = getIn(touched, name);

  useEffect(() => {
    // Call formikProps callback when field error changes
    if (fieldError && formikProps) {
      formikProps(fieldError);
    }
  }, [fieldError]);

  useEffect(() => {
    // Call formikProps callback when field value changes and there is no error
    if (fieldValue && !fieldError && formikProps) {
      formikProps(fieldError);
    }
  }, [fieldValue, fieldError]);
  const Min = getIn(values, `form_fields[${index}].field_attributes.validations.min`);
  const Max = getIn(values, `form_fields[${index}].field_attributes.validations.max`);
  useEffect(() => {
    if (setFieldValue) {
      if (detail?.value !== "Min-Max") {
        setFieldValue(`form_fields[${index}].field_attributes.validations.regex`, `^\d{${Min},}$`);
      } else {
        setFieldValue(`form_fields[${index}].field_attributes.validations.regex`, `^.{${Min},${Max}}$`);
      }
    }
  }, [setFieldValue, Min, Max])
  return (
    <TextField
      type={type}
      name={name}
      id={id}
      size={size ? "medium" : "small"}
      label={label}
      fullWidth
      value={fieldValue}
      variant={variant}
      inputProps={
        { readOnly: disable }
      }
      prefix={prefix}
      onChange={handleChange}
      onBlur={handleBlur}
      error={fieldTouched && !!fieldError} // Set error state based on field being touched and having an error
      helperText={fieldTouched && fieldError} // Display error message if field is touched and has an error
      InputLabelProps={
        type === "time" || type === "date" ? { shrink: true } : {}
      }
    />
  );
};

export default MyTextField;
