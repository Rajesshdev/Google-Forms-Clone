{
  /*File: AntTextfield.js
   Objective: The objective of the page defines a custom MyTextField component that is used in a form with Formik and Ant Design's Form.
    Item and Input components. The MyTextField component encapsulates the logic for rendering a text input field with validation capabilities.
    
    Here's an explanation of the props used in the MyTextField component:
      name: The name of the field, used to identify the input field and access its value, error, and touched state from the Formik context.
      label: The label or placeholder text to be displayed in the input field.
      type: The type of input (e.g., "text", "password", "email", etc.).
      prefix (optional): A prefix element to be displayed before the input field.
      suffix (optional): A suffix element to be displayed after the input field.
      dis (optional): A boolean indicating whether the input field should be disabled.
      
      Inside the MyTextField component, the useFormikContext hook is used to access the Formik context, 
      including the values (form values), errors (form errors), touched (field touched state),
      handleChange (field change event handler), and handleBlur (field blur event handler) properties.

      The component then extracts the specific value, error, and touched state for the corresponding field based on the provided name prop.
      The component uses the Ant Design Form.Item component to wrap the Input component. 
      The validateStatus prop is set to "error" if the field has been touched and there is an error, and the help prop displays the validation error message when the field has been touched and an error exists.
      The Input component is used to render the actual input field. It receives various props, such as type, disabled, name, size, style, placeholder, value, onChange, onBlur, prefix, and suffix, which control its behavior and appearance based on the provided props.
      
Overall, the MyTextField component simplifies the process of creating text input fields within a Formik form, handling validation and providing a consistent interface for displaying errors and managing input state

*/
}
// Import React Component Hooks
import React from "react";
// Import antd Component Hooks
import { Input, Form } from "antd";
// Import formik Component Hooks
import { useFormikContext, getIn } from "formik";
// Define the MyTextField component Function
const MyTextField = ({ name, label, type, prefix, suffix, disable}) => {
  // Get the formik context values, errors, touched state, and event handlers
  const { values, errors, touched, handleChange, handleBlur } =
    useFormikContext();
  // Extract the specific field value, error, and touched state based on the provided name prop
  const fieldValue = getIn(values, name);
  const fieldError = getIn(errors, name);
  const fieldTouched = getIn(touched, name);

  // Render the component
  return (
    <Form.Item
      // Set the validateStatus prop to "error" if the field has been touched and there is an error
      validateStatus={fieldTouched && fieldError ? "error" : ""}
      // Set the help prop to display the validation error message when the field has been touched and an error exists
      help={fieldTouched && fieldError}
    >
      <Input
        // Set the input type based on the type prop value
        type={type}
        // Set the readOnly prop based on the disable prop value
        readOnly={disable}
        // Set the name prop to identify the input field
        name={name}
        // Set the size prop to "large" for the input
        size="large"
        // Set the style prop to customize the input's color and placeholder color
        style={{ color: "black", "::placeholder": { color: "black" } }}
        // Set the placeholder prop to display the label as a placeholder
        placeholder={label}
        // Set the value prop to the field value
        value={fieldValue}
        // Set the onChange prop to handle changes in the input value
        onChange={handleChange}
        // Set the onBlur prop to handle the input being blurred
        onBlur={handleBlur}
        // Set the prefix prop to display a prefix element in the input
        prefix={prefix}
        // Set the suffix prop to display a suffix element in the input
        suffix={suffix}
      />
    </Form.Item>
  );
};

export default MyTextField;
