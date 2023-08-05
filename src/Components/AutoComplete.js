
// Import React Component Hooks
import React from "react";
// Import Mui Component Hooks
import { Autocomplete, TextField } from "@mui/material";
// Import formik Component Hooks
import { useFormikContext, getIn } from "formik";
// Define the MyAutocomplete component Function
const MyAutocomplete = ({
  name,
  label,
  type = "text",
  size,
  options,
  getOptionLabel,
  disable
}) => {
  // Access formik context
  const { values, errors, touched, handleChange, handleBlur } =
    useFormikContext();
  // Retrieve field value, error, and touched state using getIn utility function
  const fieldValue = getIn(values, name);
  const fieldError = getIn(errors, name);
  const fieldTouched = getIn(touched, name);
  return (
    <Autocomplete
      options={options} // Options for the autocomplete
      getOptionLabel={getOptionLabel} // Function to extract the label from each option
      disableClearable
      readOnly={disable}
      value={options.find(o=>o.assert_types_id===Number(fieldValue))||null} // Current selected value
      onChange={(event, newValue) => {
        handleChange({
          target: {
            name: name,
            value: newValue?.assert_types_id,
          },
        });
      }} // Handle value change
      onBlur={handleBlur} // Handle input blur
      renderInput={(params) => (
        <TextField
          {...params}
          type={type}
          name={name}
          size={size}
          fullWidth
          label={label}
          error={fieldTouched && !!fieldError} // Set error state based on field being touched and having an error
          helperText={fieldTouched && fieldError} // Display error message if field is touched and has an error
        />
      )}
    />
  );
};
export default MyAutocomplete;
