{
  /*File: TextField.js
   Objective: The objective of the page MyTextField component is to create a reusable and customizable TextField,
   input component that integrates with the Formik library. 
   It aims to simplify the process of creating form inputs and managing form state in React applications.
   Here are the more detailed objectives of the MyTextField component:
    Reusability:
     The component is designed to be reusable across different forms and form fields in a React application. 
     It a bstracts away the complexities of rendering and handling TextField inputs, 
     allowing developers to easily incorporate it into their forms.
    Integration with Formik: 
     The component leverages the useFormikContext hook from the Formik library to access the form state,including values, errors, and form handlers.
     This integration enables seamless interaction between the TextField input and the overall form, ensuring consistent form behavior and validation.
    Prop-Based Customization: 
    The MyTextField component accepts various props to customize the appearance and behavior of the rendered TextField input.
    Developers can specify the name, label, type, and size of the input field, allowing for flexibility and adaptability to different form requirements.
    Error Handling: 
     The component automatically handles error display and validation. 
     It checks for field errors and touched status in the Formik context and applies appropriate error styling and error message display when needed.
     This simplifies the process of handling form validation and provides a user-friendly experience by indicating invalid input fields.
    Callback Function for Error Propagation: 
     The component accepts a formikProps prop, which is a callback function provided by the parent component. 
     Whenever the field error changes, the callback function is triggered, allowing the parent component to handle and propagate the error state as necessary.
     This feature enables advanced error handling and integration with other form components or validation libraries.
    Consistent Styling:
     The component leverages the styling capabilities of the Material-UI library to ensure a consistent and visually appealing look and feel. 
     It supports different input sizes, label shrinking for time and date inputs, and customizable styles through the use of Material-UI's TextField component.
By achieving these objectives, the MyTextField component enhances the development experience by simplifying form input creation, promoting code reusability, 
and facilitating seamless integration with Formik for form state management and validation
*/
}

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
