{
  /*File: AutoComplete.js
   Objective: The objective of the page defines a custom MyAutocomplete component that encapsulates the logic for rendering an Autocomplete input field within a Formik form.
   The Autocomplete component is from a library like Material-UI.
   Here's an explanation of the props used in the MyAutocomplete component:
    name: The name of the field, used to identify the input field and access its value, error, and touched state from the Formik context.
    label: The label text to be displayed for the input field.
    type: The type of input (defaulted to "text").
    size: The size of the input field.
    options: An array of options to be shown in the Autocomplete dropdown.
    getOptionLabel: A function that extracts and returns the label for each option in the Autocomplete dropdown.

   Inside the MyAutocomplete component, the useFormikContext hook is used to access the Formik context, including the values (form values),
   errors (form errors),touched (field touched state), handleChange (field change event handler), and handleBlur (field blur event handler) properties.

   The component then retrieves the specific value, error, and touched state for the corresponding field based on the provided name prop using the getIn utility function.

   The MyAutocomplete component renders the Autocomplete component, which is responsible for displaying the dropdown and handling the selection of options.
   It receives various props, such as options, getOptionLabel, value, onChange, and onBlur, which control its behavior and appearance based on the provided props.

   Inside the Autocomplete component, a TextField component is rendered using the renderInput prop.
   This TextField component is responsible for rendering the input field itself.
   It receives various props, such as type, name, size, fullWidth, label, error, and helperText,
   which control its behavior and appearance based on the provided props. 
   The error prop is set based on whether the field has been touched and has an error,
   and the helperText prop displays the error message if the field has been touched and has an error.

   Overall, the MyAutocomplete component simplifies the process of creating Autocomplete input fields within a Formik form,
   handling options, selection, and validation, and providing a consistent interface for displaying errors and managing input state
*/
}
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
