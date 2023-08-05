{
  /*File: Template.js
   Objective: 
   The objective of this page to create a form template in a React application. 
   The template allows users to define the structure and fields of a form.
   The form template can be either a "Checklist" or a "Ticket" form.
   Implement a form template creation and editing functionality in a React application.
   
   Allow users to create new form templates or edit existing ones.
   Retrieve the editid parameter from the URL to determine if it's a new form creation or an existing form update.
   Fetch the existing form data from the server if an editid is provided.
   Set up form state management using the Formik component to handle form values, validation, and submission.
   Define a validation schema (FormvalidationSchema) to validate the form fields based on specified rules.
   Handle form submission (handlesubmit function):
   If it's a new form, send a POST request to the server to create the form template.
   If it's an existing form, send a PUT request to the server to update the form template.
   Provide form input fields for the template name, form type, and description.
   Implement dynamic field reordering functionality using drag and drop.
   Use the react-beautiful-dnd library for drag and drop functionality within the DragDropContext, Droppable, and Draggable components.
   Update the form field order based on the dragged and dropped positions.
   Display success and failure messages using the Snackbar component to provide feedback on form creation or update status.
   Redirect users to the form list page (/assets/forms/list) after a successful form creation or update.
   Utilize various MUI components such as TextField, Select, Button, Checkbox, Tooltip, etc., for form inputs and UI elements.
   Import custom components (Selects, MyTextField) for reusable form input fields.
   Utilize React Router's useHistory hook to enable navigation and redirection after form submission or cancellation.
   Employ a live API service (liveApi) to interact with the server and perform CRUD operations on form templates.
   Handle and display errors if there are any API request failures or exceptions.
   In summary, the code aims to provide a user-friendly interface for creating and editing form templates with form field reordering capability, 
   form validation, and feedback messages on form submission status
*/
}
// Import React Hooks
import React, { useState, useEffect } from "react";
// Import Router Hooks
import { useParams, useHistory } from "react-router-dom";
// Import Mui Component Hooks
import {
  Paper,
  Grid,
  TextField,
  Divider,
  IconButton,
  Switch,
  FormControlLabel,
  FormControl,
  Stack,
  Button,
  Select,
  FormGroup,
  RadioGroup,
  MenuItem,
  Snackbar,
  Alert,
  Checkbox,
  AppBar,
  Typography,
  Toolbar,
  Box,
  InputLabel,
  Radio,
  FormLabel,
} from "@mui/material";
// Import Mui icons
import { Close } from "@material-ui/icons";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
// Import uuid form Id Generator
import { v4 as uuidv4 } from "uuid";
// Import Custom Hooks
import Selects from "../Components/Select";
import MyTextField from "../Components/Textfield";
import IconSelector from "../Popup/Fonts";
import Backdrop from "../Loader/Backdrop";
import UploadComponent from "../Components/FileFormats";
import AntTextField from "../Components/AntTextfield";
import MyAutocomplete from "../Components/AutoComplete";
// Import Service Hooks
import { liveApi } from "../service/Service";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// Import Constants
import {
  SAVE_SUCCESS,
  TIME_OUT,
  FAILURE,
  LINEARSCALE,
  LINEARSCALE1,
} from "../Constants/Constant";
// Import Validation Schema and Initial Values
import { FormvalidationSchema, FormValues } from "../Constants/Validation";
// Formik Hooks
import { Formik, FieldArray, Field } from "formik";
const Template = () => {
  // Call the liveApi function to get an instance of the live API
  const liveapi = liveApi();

  // Import the useHistory function from the React Router library
  const history = useHistory();

  // Get the editid parameter from the URL
  const editid = useParams();

  // Create a state variable called success and a function to update it (setSuccess)
  const [success, setSuccess] = useState("");

  // Create a state variable called failure and a function to update it (setFailure)
  const [failure, setFailure] = useState("");
  const [Asset_type, setAssetType] = useState([]);

  // Create a state variable called Formdata and a function to update it (setFormdata)
  const [Formdata, setFormdata] = useState(FormValues);
  // Create a state variable called Loader and a function to update it (setFormdata)
  const [Loader, setLoader] = useState(false);
  const [Icon, setIcon] = useState("");
  const [Formtype, setFormtype] = useState([{
    "form_type_id": 1,
    "form_type": "Checklist",
    "description": "test data",
    "attribute": null
  }]);
  // This function is called when the form is submitted
  const handlesubmit = (values) => {
    setLoader(true);
    localStorage.setItem("data", JSON.stringify(values));
    setSuccess(SAVE_SUCCESS);
    setTimeout(() => {
      setSuccess("");
      history.push("/");
      setLoader(false);
    }, TIME_OUT);
    // // Check if editid.editid is undefined to determine if it's a new form or an existing form being updated
    // if (editid.editid === undefined) {
    //   // Create a new form (POST request)
    //   liveapi
    //     .post("/ipss-forms/", values)
    //     .then((res) => {
    //       if (res.data.success) {
    //         // Form creation successful
    //         setSuccess(SAVE_SUCCESS);
    //         setTimeout(() => {
    //           setSuccess("");
    //           history.push("/assets/forms/list");
    //           setLoader(false);
    //         }, TIME_OUT);
    //       } else {
    //         // Form creation failed
    //         setFailure(FAILURE);
    //         setTimeout(() => {
    //           setFailure("");
    //           setLoader(false);
    //         }, TIME_OUT);
    //       }
    //     })
    //     .catch((err) => {
    //       console.log("error", err);
    //       setFailure(FAILURE);
    //       setTimeout(() => {
    //         setFailure("");
    //         setLoader(false);
    //       }, TIME_OUT);
    //     });
    // } else {
    //   // Update existing form (PUT request)
    //   delete values.form_order;
    //   liveapi
    //     .put("/ipss-forms/" + Number(editid.editid) + "/", values)
    //     .then((res) => {
    //       if (res.data.success) {
    //         // Form update successful
    //         setSuccess(SAVE_SUCCESS);
    //         setTimeout(() => {
    //           setSuccess("");
    //           history.push("/assets/forms/list");
    //           setLoader(false);
    //         }, TIME_OUT);
    //       } else {
    //         // Form update failed
    //         setFailure(FAILURE);
    //         setTimeout(() => {
    //           setFailure("");
    //           setLoader(false);
    //         }, TIME_OUT);
    //       }
    //     })
    //     .catch((err) => {
    //       console.log("error", err);
    //       setFailure(FAILURE);
    //       setTimeout(() => {
    //         setFailure("");
    //         setLoader(false);
    //       }, TIME_OUT);
    //     });
    // }
  };
  const handleDragEnd = (result, setFieldValue, values) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.index === destination.index) return;

    const updatedFormFields = Array.from(values.form_fields);
    const [removed] = updatedFormFields.splice(source.index, 1);
    updatedFormFields.splice(destination.index, 0, removed);

    const updatedFormFieldsWithOrder = updatedFormFields.map((field, index) => {
      return { ...field, form_order: index };
    });
    console.log(updatedFormFieldsWithOrder, "updated");
    setFieldValue("form_fields", updatedFormFieldsWithOrder);
  };
  // This function fetches the form data
  const GetForm = (id) => {
    liveapi
      .get("/ipss-forms/" + id + "/")
      .then((res) => {
        res.data.form_fields = res.data.form_details;
        delete res.data.form_details;
        const clonedOption = {
          ...res.data,
          form_fields: res.data.form_fields.map((field) => ({
            ...field,
            disabled: true,
          })),
        };

        setFormdata(clonedOption);
        setIcon(res.data?.attribute?.icon_name);
        setLoader(false);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  // This function fetches the form data
  const GetFormTypes = () => {
    liveapi
      .get("/ipss-forms/form_types/")
      .then((res) => {
        setFormtype(res.data.results);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  const Typeget = () => {
    liveapi
      .get("/ipss-forms/assert_types/")
      .then((res) => {
        setAssetType(res.data.results);
        setFailure("");
      })
      .catch((err) => {
        console.log(err);
        setFailure(FAILURE);
        // setTimeout(() => {
        //   setFailure("");
        // }, TIME_OUT);
      });
  };
  // This effect runs when the component mounts or when the editid changes
  useEffect(() => {
    if (editid.editid) {
      // GetForm(editid.editid);
      const Data=localStorage.getItem("data");

      setFormdata(JSON.parse(Data))
      setLoader(true);
      setTimeout(() => {
        setLoader(false);
      }, 1000);
    }
  }, [editid.editid]);
  const FontsChange = (props, setFieldValue) => {
    setFieldValue("attribute.icon_name", props);
  };
  // useEffect(() => {
  //   GetFormTypes();
  //   Typeget();
  // }, []);
  return (
    <div style={{ margin: "3vh" }}>
      {/* The app bar component */}
      <AppBar position="static" class="appbar" elevation={3}>
        <Toolbar>
          <Box display="flex" flexGrow={1}>
            <Typography variant="h6" style={{ fontWeight: 'bolder' }}>
              {editid.editid ? "Update" : "Create"} Form
            </Typography>
          </Box>
          <Grid align="right">
            {/* Go back button */}
            <div class="tooltip">
              <Button
                varient="text"
                className="n_btn"
                id="Form_BackButton"
                onClick={() => window.history.go(-1)}
              >
                <ArrowBackIcon style={{ color: "#000" }}></ArrowBackIcon>
              </Button>
              <span class="tooltiptext">Go Back </span>
            </div>
          </Grid>
        </Toolbar>
      </AppBar>
      <br />
      <br />
      <div
        className="Form_Details-Main"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Formik
          initialValues={Formdata || FormValues} // Initial values for the formik form
          enableReinitialize={true} // Enable reinitialization of form values
          validationSchema={FormvalidationSchema} // Validation schema for form validation
          onSubmit={handlesubmit} // Handle form submission
        >
          {({ handleSubmit, values, errors, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <Paper elevation={3}>
                &nbsp;
                <div style={{ display: "flex" }}>
                  <div style={{ margin: "2vh", flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        flexWrap: "wrap",
                        padding: "0 1vh",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <MyTextField
                          type="text"
                          name="title"
                          id="Form_Add_Template-name"
                          label="Template Name"
                        />
                      </div>

                      <div style={{ flex: 1 }}>
                        <Field name="form_type_id">
                          {({ field }) => (
                            <TextField
                              id="Form_Add_Template-type"
                              select
                              size="small"
                              fullWidth
                              label="Form Type"
                              value={field.value}
                              onChange={(event) =>
                                setFieldValue(
                                  `form_type_id`,
                                  event.target.value
                                )
                              }
                            >
                              {Formtype.map((item) => (
                                <MenuItem
                                  key={item.form_type_id}
                                  value={item.form_type_id}
                                >
                                  {item.form_type}
                                </MenuItem>
                              ))}
                            </TextField>
                          )}
                        </Field>
                      </div>
                    </div>
                    &nbsp;
                    <div
                      style={{
                        width: "calc(100% - 15px)",
                        flex: 1,
                        marginLeft: "1%",
                      }}
                    >
                      <MyTextField
                        type="text"
                        id="Form_Add_Template-description"
                        name="description"
                        label="Description"
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      marginTop: "0.2%",
                    }}
                  >
                    <IconSelector
                      value={Icon}
                      FontsChange={(selectedIcon) =>
                        FontsChange(selectedIcon, setFieldValue)
                      }
                    />
                  </div>
                </div>
                &nbsp;
              </Paper>
              <DragDropContext
                onDragEnd={(result) =>
                  handleDragEnd(result, setFieldValue, values)
                }
              >
                <Droppable
                  droppableId="formFields"
                  isDropDisabled={Boolean(values.form_fields.length === 1)}
                >
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      <FieldArray name="form_fields">
                        {({ push, remove }) => (
                          <Droppable droppableId="form_fields">
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                {values?.form_fields?.map((detail, index) => {
                                  return (
                                    <Draggable
                                      key={detail.unique_id}
                                      draggableId={detail.unique_id}
                                      isDragDisabled={Boolean(
                                        values.form_fields.length === 1
                                      )}
                                      index={index}
                                    >
                                      {(provided, snapshot) => (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                        >
                                          <Paper
                                            elevation={3}
                                            style={{ borderRadius: "10px" }}
                                          >
                                            <div style={{ margin: "2vh" }}>
                                              &nbsp;
                                              <div
                                                style={{
                                                  display: "flex",
                                                  flexWrap: "wrap",
                                                  gap: "10px",
                                                  width: "100%",
                                                  flexDirection: "row",
                                                }}
                                                className="Question_header"
                                              >
                                                <div
                                                  style={{ marginTop: "5px" }}
                                                >
                                                  <div
                                                    style={{ fontSize: "20px" }}
                                                  >
                                                    {index + 1}.
                                                  </div>
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                  <MyTextField
                                                    label="Question"
                                                    name={`form_fields[${index}].title`}
                                                    id={
                                                      "Form_Add_Template-Question-" +
                                                      index +
                                                      "-title"
                                                    }
                                                    disable={
                                                      detail?.disabled
                                                        ? true
                                                        : false
                                                    }
                                                  />
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                  <MyTextField
                                                    label="Description"
                                                    name={`form_fields[${index}].description`}
                                                    id={
                                                      "Form_Add_Template-Question-" +
                                                      index +
                                                      "-description"
                                                    }
                                                    disable={
                                                      detail?.disabled
                                                        ? true
                                                        : false
                                                    }
                                                  />
                                                </div>
                                                {!detail.field_attributes?.field_type.includes(
                                                  "Heading"
                                                ) &&
                                                  !detail.field_attributes?.field_type.includes(
                                                    "Subheading"
                                                  ) && (
                                                    <div style={{ flex: 1 }}>
                                                      <MyTextField
                                                        label="Report Title"
                                                        name={`form_fields[${index}].report_title`}
                                                        id={
                                                          "Form_Add_Template-Question-" +
                                                          index +
                                                          "-report_title"
                                                        }
                                                        disable={
                                                          detail?.disabled
                                                            ? true
                                                            : false
                                                        }
                                                      />
                                                    </div>
                                                  )}
                                                <div style={{ flex: 1 }}>
                                                  <Field
                                                    name={`form_fields[${index}].field_attributes.field_type`}
                                                  >
                                                    {({ field, form }) => {
                                                      return (
                                                        <Selects
                                                          {...field}
                                                          values={field.value}
                                                          id={
                                                            "Form_Add_Template-Question-" +
                                                            index +
                                                            "-type"
                                                          }
                                                          disable={
                                                            detail?.disabled
                                                              ? true
                                                              : false
                                                          }
                                                          onChanges={(
                                                            value
                                                          ) => {
                                                            form.setFieldValue(
                                                              field.name,
                                                              value
                                                            );
                                                          }}
                                                          setFieldValue={
                                                            setFieldValue
                                                          }
                                                          name={`form_fields[${index}].field_attributes.complaints`}
                                                          options={`form_fields[${index}].field_attributes.options`}
                                                          name1={`form_fields[${index}].field_attributes.validations.type`}
                                                          name2={`form_fields[${index}].field_attributes.validations.value`}
                                                          name3={`form_fields[${index}].field_attributes.validations.method`}
                                                          name4={`form_fields[${index}].field_attributes.validations.allowed_file_types`}

                                                        />
                                                      );
                                                    }}
                                                  </Field>
                                                </div>
                                              </div>
                                              <div
                                                style={{
                                                  display:
                                                    detail.field_attributes?.field_type.includes(
                                                      "grid"
                                                    )
                                                      ? "flex"
                                                      : "",
                                                  flexWrap: "wrap",
                                                  marginLeft:
                                                    detail.field_attributes?.field_type.includes(
                                                      "grid"
                                                    )
                                                      ? "2%"
                                                      : "",
                                                }}
                                              >
                                                <div>
                                                  {detail.field_attributes?.field_type.includes(
                                                    "grid"
                                                  ) && (
                                                      <>
                                                        <div
                                                          style={{
                                                            marginLeft: "3%",
                                                            marginBottom: "10px",
                                                          }}
                                                        >
                                                          <Typography>
                                                            Rows
                                                          </Typography>
                                                        </div>
                                                        <FieldArray
                                                          name={`form_fields[${index}].field_attributes.row`}
                                                        >
                                                          {({ push, remove }) => (
                                                            <div
                                                              style={{
                                                                gap: "25px",
                                                                marginLeft:
                                                                  "2.5%",
                                                              }}
                                                            >
                                                              {detail.field_attributes?.row?.map(
                                                                (o, indexs) => (
                                                                  <div
                                                                    style={{
                                                                      display:
                                                                        "flex",
                                                                      marginBottom:
                                                                        detail
                                                                          .field_attributes
                                                                          ?.row
                                                                          .length >
                                                                          1
                                                                          ? ""
                                                                          : "10px",
                                                                    }}
                                                                  >
                                                                    <>
                                                                      <div
                                                                        style={{
                                                                          width:
                                                                            detail
                                                                              .field_attributes
                                                                              ?.row
                                                                              .length >
                                                                              1
                                                                              ? "180px"
                                                                              : "220px",
                                                                        }}
                                                                      >
                                                                        <MyTextField
                                                                          label=""
                                                                          variant="standard"
                                                                          disable={
                                                                            detail?.disabled
                                                                              ? true
                                                                              : false
                                                                          }
                                                                          name={`form_fields[${index}].field_attributes.row[${indexs}].option`}
                                                                        />
                                                                      </div>
                                                                    </>
                                                                    {detail
                                                                      .field_attributes
                                                                      ?.row
                                                                      .length >
                                                                      1 && (
                                                                        <>
                                                                          {detail.disabled ===
                                                                            undefined && (
                                                                              <IconButton
                                                                                onClick={() =>
                                                                                  remove(
                                                                                    indexs
                                                                                  )
                                                                                }
                                                                              >
                                                                                <Close />
                                                                              </IconButton>
                                                                            )}
                                                                        </>
                                                                      )}
                                                                  </div>
                                                                )
                                                              )}

                                                              {detail.disabled ===
                                                                undefined && (
                                                                  <Button
                                                                    onClick={() => {
                                                                      push({
                                                                        option:
                                                                          "No",
                                                                        uniqueId:
                                                                          uuidv4(),
                                                                      });
                                                                    }}
                                                                    variant="contained"
                                                                  >
                                                                    Add Row
                                                                  </Button>
                                                                )}
                                                            </div>
                                                          )}
                                                        </FieldArray>
                                                        &nbsp;
                                                      </>
                                                    )}
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                  {detail.field_attributes?.field_type.includes(
                                                    "grid"
                                                  ) && (
                                                      <div
                                                        style={{
                                                          marginLeft: "3%",
                                                          marginBottom: "10px",
                                                        }}
                                                      >
                                                        <Typography>
                                                          Columns
                                                        </Typography>
                                                      </div>
                                                    )}

                                                  {detail.field_attributes
                                                    ?.field_type ===
                                                    "Checkbox" ||
                                                    detail.field_attributes
                                                      ?.field_type ===
                                                    "RadioButton" ||
                                                    detail.field_attributes
                                                      ?.field_type ===
                                                    "Multiple choice grid" ||
                                                    detail.field_attributes
                                                      ?.field_type ===
                                                    "Checkbox grid" ||
                                                    detail.field_attributes?.field_type.includes(
                                                      "Yes/No Question"
                                                    ) ||
                                                    detail.field_attributes
                                                      ?.field_type ===
                                                    "Dropdown" ? (
                                                    <FieldArray
                                                      name={`form_fields[${index}].field_attributes.options`}
                                                    >
                                                      {({ push, remove }) => (
                                                        <div
                                                          style={{
                                                            display:
                                                              detail.field_attributes?.field_type.includes(
                                                                "Yes/No Question"
                                                              )
                                                                ? "flex"
                                                                : "",
                                                            flexWrap: "wrap",
                                                            gap: "20px",
                                                            marginLeft: "2.5%",
                                                            marginTop: "2%",
                                                          }}
                                                        >
                                                          {detail.field_attributes?.options?.map(
                                                            (
                                                              details,
                                                              indexs
                                                            ) => (
                                                              <div
                                                                key={indexs}
                                                                style={{
                                                                  display:
                                                                    !detail.field_attributes?.field_type.includes(
                                                                      "Yes/No Question"
                                                                    )
                                                                      ? "flex"
                                                                      : "",
                                                                  padding:
                                                                    !detail.field_attributes?.field_type.includes(
                                                                      "Yes/No Question"
                                                                    )
                                                                      ? 5
                                                                      : "",
                                                                }}
                                                              >
                                                                <div
                                                                  style={{
                                                                    display:
                                                                      "flex",
                                                                    gap: "10px",
                                                                    marginLeft:
                                                                      detail.field_attributes?.field_type.includes(
                                                                        "Yes/No Question"
                                                                      )
                                                                        ? indexs ===
                                                                          1
                                                                          ? "-5%"
                                                                          : ""
                                                                        : "",
                                                                  }}
                                                                >
                                                                  <div
                                                                    style={{
                                                                      width:
                                                                        detail.field_attributes?.field_type.includes("grid")
                                                                          ? "170px"
                                                                          : !detail.field_attributes?.field_type.includes("Yes/No Question")
                                                                            ? "150px"
                                                                            : "70px",
                                                                    }}
                                                                  >
                                                                    <MyTextField
                                                                      label={
                                                                        detail.field_attributes?.field_type.includes(
                                                                          "grid"
                                                                        )
                                                                          ? ""
                                                                          : "Option"
                                                                      }
                                                                      variant={
                                                                        detail.field_attributes?.field_type.includes(
                                                                          "grid"
                                                                        )
                                                                          ? "standard"
                                                                          : "outlined"
                                                                      }
                                                                      disable={
                                                                        detail?.disabled
                                                                          ? true
                                                                          : false ||
                                                                            detail.field_attributes?.field_type.includes(
                                                                              "Yes/No Question"
                                                                            )
                                                                            ? true
                                                                            : false
                                                                      }
                                                                      name={`form_fields[${index}].field_attributes.options[${indexs}].option`}
                                                                      id={
                                                                        "Form_Add_Template-Question" +
                                                                        index +
                                                                        "-option" +
                                                                        indexs +
                                                                        "option_name"
                                                                      }
                                                                    />
                                                                  </div>
                                                                  
                                                                  {detail.field_attributes?.field_type.includes(
                                                                    "Yes/No Question"
                                                                  ) && (
                                                                      <>
                                                                        <div
                                                                          style={{
                                                                            width:
                                                                              "145px",
                                                                          }}
                                                                        >
                                                                          <Field
                                                                            name={`form_fields[${index}].field_attributes.options[${indexs}].type`}
                                                                          >
                                                                            {({
                                                                              field,
                                                                            }) => (
                                                                              <FormControl
                                                                                fullWidth
                                                                              >
                                                                                <InputLabel id="demo-simple-select-label">
                                                                                  Details
                                                                                </InputLabel>
                                                                                <Select
                                                                                  labelId="demo-simple-select-label"
                                                                                  inputProps={{
                                                                                    readOnly:
                                                                                      detail?.disabled
                                                                                        ? true
                                                                                        : false,
                                                                                  }}
                                                                                  id={
                                                                                    "Form_Add_Template-Question" +
                                                                                    index +
                                                                                    "-option" +
                                                                                    indexs +
                                                                                    "option_type"
                                                                                  }
                                                                                  {...field}
                                                                                  size="small"
                                                                                  label="Details"
                                                                                  value={
                                                                                    field.value
                                                                                  }
                                                                                  onChange={(
                                                                                    event
                                                                                  ) => {
                                                                                    if (
                                                                                      event
                                                                                        .target
                                                                                        .value ===
                                                                                      "Not Required"
                                                                                    ) {
                                                                                      setFieldValue(
                                                                                        `form_fields[${index}].field_attributes.options[${indexs}].upload`,
                                                                                        {
                                                                                          photo:
                                                                                            [
                                                                                              "jpeg",
                                                                                            ],
                                                                                          video:
                                                                                            [],
                                                                                          document:
                                                                                            [],
                                                                                        }
                                                                                      );
                                                                                    }
                                                                                    if (
                                                                                      event
                                                                                        .target
                                                                                        .value ===
                                                                                      "Mandatory"
                                                                                    ) {
                                                                                      setFieldValue(
                                                                                        `form_fields[${index}].field_attributes.options[${indexs}].remark`,
                                                                                        "Remark"
                                                                                      );
                                                                                      setFieldValue(
                                                                                        `form_fields[${index}].field_attributes.options[${indexs}].upload`,
                                                                                        {
                                                                                          photo:
                                                                                            [],
                                                                                          video:
                                                                                            [],
                                                                                          document:
                                                                                            [],
                                                                                        }
                                                                                      );
                                                                                    }
                                                                                    field.onChange(
                                                                                      event
                                                                                    );
                                                                                  }}
                                                                                >
                                                                                  <MenuItem
                                                                                    key="Not Required"
                                                                                    value="Not Required"
                                                                                  >
                                                                                    Not
                                                                                    Required
                                                                                  </MenuItem>
                                                                                  <MenuItem
                                                                                    key="Mandatory"
                                                                                    value="Mandatory"
                                                                                  >
                                                                                    Mandatory
                                                                                  </MenuItem>
                                                                                  <MenuItem
                                                                                    key="Optional"
                                                                                    value="Optional"
                                                                                  >
                                                                                    Optional
                                                                                  </MenuItem>
                                                                                </Select>
                                                                              </FormControl>
                                                                            )}
                                                                          </Field>
                                                                        </div>
                                                                      </>
                                                                    )}
                                                                </div>
                                                                &nbsp;
                                                                {details.type !==
                                                                  "Not Required" &&
                                                                  detail.field_attributes?.field_type.includes(
                                                                    "Yes/No Question"
                                                                  ) && (
                                                                    <div
                                                                      style={{
                                                                        display:
                                                                          "flex",
                                                                        alignItems:
                                                                          "center",
                                                                      }}
                                                                    >
                                                                      <div
                                                                        style={{
                                                                          marginTop:
                                                                            "-8%",
                                                                        }}
                                                                      >
                                                                        <Field
                                                                          key={
                                                                            index
                                                                          }
                                                                          name={`form_fields[${index}].field_attributes.options[${indexs}].remark`}
                                                                        >
                                                                          {({
                                                                            field,
                                                                          }) => (
                                                                            <FormGroup
                                                                              row
                                                                            >
                                                                              <FormControlLabel
                                                                                control={
                                                                                  <Checkbox
                                                                                    color="primary"
                                                                                    id={`form_fields[${index}].field_attributes.options[${indexs}].remark`}
                                                                                    checked={
                                                                                      field.value ===
                                                                                      "Remark"
                                                                                    }
                                                                                    name="Remark"
                                                                                    onChange={(
                                                                                      event
                                                                                    ) => {
                                                                                      if (
                                                                                        !detail.disabled
                                                                                      ) {
                                                                                        if (
                                                                                          event
                                                                                            .target
                                                                                            .checked ===
                                                                                          false
                                                                                        ) {
                                                                                          setFieldValue(
                                                                                            `form_fields[${index}].field_attributes.options[${indexs}].label`,
                                                                                            "Remarks"
                                                                                          );
                                                                                          if (
                                                                                            details.type !==
                                                                                            "Not Required"
                                                                                          ) {
                                                                                            setFieldValue(
                                                                                              `form_fields[${index}].field_attributes.options[${indexs}].image_upload`,
                                                                                              "Upload"
                                                                                            );
                                                                                          }
                                                                                        }

                                                                                        const newValue =
                                                                                          event
                                                                                            .target
                                                                                            .checked
                                                                                            ? "Remark"
                                                                                            : "";
                                                                                        field.onChange(
                                                                                          {
                                                                                            target:
                                                                                            {
                                                                                              name: field.name,
                                                                                              value:
                                                                                                newValue,
                                                                                            },
                                                                                          }
                                                                                        );
                                                                                      }
                                                                                    }}
                                                                                  />
                                                                                }
                                                                              />
                                                                            </FormGroup>
                                                                          )}
                                                                        </Field>
                                                                      </div>
                                                                      <div
                                                                        style={{
                                                                          width:
                                                                            "170px",
                                                                        }}
                                                                      >
                                                                        <AntTextField
                                                                          label=""
                                                                          suffix={
                                                                            details.remark ? (
                                                                              <Tooltip title="Optional custom text for remarks">
                                                                                <InfoCircleOutlined
                                                                                  style={{
                                                                                    color:
                                                                                      "rgba(0,0,0,.45)",
                                                                                  }}
                                                                                />
                                                                              </Tooltip>
                                                                            ) : (
                                                                              ""
                                                                            )
                                                                          }
                                                                          disable={
                                                                            details.remark ===
                                                                              "" ||
                                                                              detail?.disabled
                                                                              ? true
                                                                              : false
                                                                          }
                                                                          name={`form_fields[${index}].field_attributes.options[${indexs}].label`}
                                                                          id={
                                                                            "Form_Add_Template-Question-" +
                                                                            index +
                                                                            "field_attributes.options" +
                                                                            indexs +
                                                                            "label"
                                                                          }
                                                                        />
                                                                      </div>
                                                                    </div>
                                                                  )}
                                                                {details.type !==
                                                                  "Not Required" &&
                                                                  detail.field_attributes?.field_type.includes(
                                                                    "Yes/No Question"
                                                                  ) && (
                                                                    <>
                                                                      <div>
                                                                        <div
                                                                          style={{
                                                                            display:
                                                                              "flex",
                                                                          }}
                                                                        >
                                                                          <Field
                                                                            key={
                                                                              index
                                                                            }
                                                                            name={`form_fields[${index}].field_attributes.options[${indexs}].image_upload`}
                                                                          >
                                                                            {({
                                                                              field,
                                                                            }) => (
                                                                              <FormGroup
                                                                                row
                                                                                style={{
                                                                                  marginTop:
                                                                                    "-8%",
                                                                                }}
                                                                              >
                                                                                <FormControlLabel
                                                                                  label=" "
                                                                                  control={
                                                                                    <Checkbox
                                                                                      color="primary"
                                                                                      checked={
                                                                                        field.value ===
                                                                                        "Upload"
                                                                                      }
                                                                                      name="Upload"
                                                                                      onChange={(
                                                                                        event
                                                                                      ) => {
                                                                                        if (
                                                                                          !detail.disabled
                                                                                        ) {
                                                                                          if (
                                                                                            event
                                                                                              .target
                                                                                              .checked ===
                                                                                            false
                                                                                          ) {
                                                                                            if (
                                                                                              details.type !==
                                                                                              "Not Required"
                                                                                            ) {
                                                                                              setFieldValue(
                                                                                                `form_fields[${index}].field_attributes.options[${indexs}].uploadlabel`,
                                                                                                "Upload"
                                                                                              );
                                                                                              setFieldValue(
                                                                                                `form_fields[${index}].field_attributes.options[${indexs}].remark`,
                                                                                                "Remark"
                                                                                              );
                                                                                            }
                                                                                          }
                                                                                          const newValue =
                                                                                            event
                                                                                              .target
                                                                                              .checked
                                                                                              ? "Upload"
                                                                                              : "";
                                                                                          field.onChange(
                                                                                            {
                                                                                              target:
                                                                                              {
                                                                                                name: field.name,
                                                                                                value:
                                                                                                  newValue,
                                                                                              },
                                                                                            }
                                                                                          );
                                                                                        }
                                                                                      }}
                                                                                    />
                                                                                  }
                                                                                />
                                                                              </FormGroup>
                                                                            )}
                                                                          </Field>
                                                                          <div
                                                                            style={{
                                                                              width:
                                                                                "170px",
                                                                            }}
                                                                          >
                                                                            <AntTextField
                                                                              label=""
                                                                              suffix={
                                                                                details.image_upload ? (
                                                                                  <Tooltip title="Optional custom text for Upload">
                                                                                    <InfoCircleOutlined
                                                                                      style={{
                                                                                        color:
                                                                                          "rgba(0,0,0,.45)",
                                                                                      }}
                                                                                    />
                                                                                  </Tooltip>
                                                                                ) : (
                                                                                  ""
                                                                                )
                                                                              }
                                                                              disable={
                                                                                details.image_upload ===
                                                                                  "" ||
                                                                                  detail?.disabled
                                                                                  ? true
                                                                                  : false
                                                                              }
                                                                              name={`form_fields[${index}].field_attributes.options[${indexs}].uploadlabel`}
                                                                              id={
                                                                                "Form_Add_Template-Question-" +
                                                                                index +
                                                                                "field_attributes.options" +
                                                                                indexs +
                                                                                "uploadlabel"
                                                                              }
                                                                            />
                                                                          </div>
                                                                        </div>
                                                                        {errors?.form_fields && (
                                                                          <Typography
                                                                            fontSize={
                                                                              10
                                                                            }
                                                                            color="red"
                                                                          >
                                                                            {
                                                                              errors
                                                                                ?.form_fields?.[
                                                                                index
                                                                              ]
                                                                                ?.field_attributes
                                                                                ?.options?.[
                                                                                indexs
                                                                              ]
                                                                                ?.upload
                                                                            }
                                                                          </Typography>
                                                                        )}

                                                                      </div>
                                                                      {details.image_upload && (
                                                                        <>
                                                                          <div>
                                                                            <UploadComponent
                                                                              name={`form_fields[${index}].field_attributes.options[${indexs}].upload`}
                                                                              setFieldValue={
                                                                                setFieldValue
                                                                              }
                                                                              remark={`form_fields[${index}].field_attributes.options[${indexs}].remark`}
                                                                              details={
                                                                                details
                                                                              }
                                                                              values={
                                                                                details.upload
                                                                              }
                                                                              disabled={
                                                                                detail?.disabled
                                                                                  ? true
                                                                                  : false
                                                                              }
                                                                            />
                                                                          </div>
                                                                          &nbsp;
                                                                          <div
                                                                            style={{
                                                                              display:
                                                                                "flex",
                                                                              alignItems:
                                                                                "center",
                                                                              gap: "10px",
                                                                            }}
                                                                          >
                                                                            <Typography>
                                                                              No
                                                                              of
                                                                              uploads
                                                                              allowed
                                                                            </Typography>
                                                                            <Field
                                                                              name={`form_fields[${index}].field_attributes.options[${indexs}].no_upload`}
                                                                            >
                                                                              {({
                                                                                field,
                                                                              }) => (
                                                                                <FormControl
                                                                                  style={{
                                                                                    width: 60,
                                                                                  }}
                                                                                >
                                                                                  <Select
                                                                                    {...field}
                                                                                    size="small"
                                                                                    inputProps={{
                                                                                      readOnly:
                                                                                        detail?.disabled
                                                                                          ? true
                                                                                          : false
                                                                                    }}
                                                                                    label=""
                                                                                    value={
                                                                                      field.value
                                                                                    }
                                                                                    onChange={(
                                                                                      event
                                                                                    ) => {
                                                                                      field.onChange(
                                                                                        event
                                                                                      );
                                                                                    }}
                                                                                  >
                                                                                    <MenuItem
                                                                                      key={
                                                                                        1
                                                                                      }
                                                                                      value={
                                                                                        1
                                                                                      }
                                                                                    >
                                                                                      1
                                                                                    </MenuItem>
                                                                                    <MenuItem
                                                                                      key={
                                                                                        2
                                                                                      }
                                                                                      value={
                                                                                        2
                                                                                      }
                                                                                    >
                                                                                      2
                                                                                    </MenuItem>
                                                                                    <MenuItem
                                                                                      key={
                                                                                        3
                                                                                      }
                                                                                      value={
                                                                                        3
                                                                                      }
                                                                                    >
                                                                                      3
                                                                                    </MenuItem>
                                                                                  </Select>
                                                                                </FormControl>
                                                                              )}
                                                                            </Field>
                                                                          </div>
                                                                        </>
                                                                      )}
                                                                      &nbsp;
                                                                    </>
                                                                  )}
                                                                {detail
                                                                  .field_attributes
                                                                  ?.options
                                                                  .length > 1 &&
                                                                  !detail.field_attributes?.field_type.includes(
                                                                    "Yes/No Question"
                                                                  ) && (
                                                                    <>
                                                                      {detail.disabled ===
                                                                        undefined && (
                                                                          <IconButton
                                                                            id={
                                                                              "Form_Add_Template-Question" +
                                                                              index +
                                                                              "-option" +
                                                                              indexs +
                                                                              "option_remove"
                                                                            }
                                                                            style={{ marginTop: "-2%" }}
                                                                            onClick={() =>
                                                                              remove(
                                                                                indexs
                                                                              )
                                                                            }
                                                                          >
                                                                            <Close />
                                                                          </IconButton>
                                                                        )}
                                                                    </>
                                                                  )}
                                                              </div>
                                                            )
                                                          )}
                                                          <div
                                                            style={{
                                                              marginLeft: "-2%",
                                                            }}
                                                          >
                                                            <div>
                                                              {detail
                                                                .field_attributes
                                                                ?.field_type ===
                                                                "Advanced Yes/No Question" && (
                                                                  <div
                                                                    style={{
                                                                      width:
                                                                        "220px",
                                                                    }}
                                                                  >
                                                                    <AntTextField
                                                                      label=""
                                                                      suffix={
                                                                        detail
                                                                          .field_attributes
                                                                          .asset_type ? (
                                                                          <Tooltip title="Optional custom text for Asset Question">
                                                                            <InfoCircleOutlined
                                                                              style={{
                                                                                color:
                                                                                  "rgba(0,0,0,.45)",
                                                                              }}
                                                                            />
                                                                          </Tooltip>
                                                                        ) : (
                                                                          ""
                                                                        )
                                                                      }
                                                                      disable={
                                                                        detail
                                                                          .field_attributes
                                                                          .asset_type ===
                                                                          "" ||
                                                                          detail?.disabled
                                                                          ? true
                                                                          : false
                                                                      }
                                                                      name={`form_fields[${index}].field_attributes.asset_label`}
                                                                      id={
                                                                        "Form_Add_Template-Question-" +
                                                                        index +
                                                                        "asset_label"
                                                                      }
                                                                    />
                                                                  </div>
                                                                )}
                                                            </div>
                                                            <div>
                                                              {detail
                                                                .field_attributes
                                                                ?.field_type ===
                                                                "Advanced Yes/No Question" && (
                                                                  <div
                                                                    style={{
                                                                      width:
                                                                        "220px",
                                                                      marginBottom:
                                                                        "10px",
                                                                    }}
                                                                  >
                                                                    <MyAutocomplete
                                                                      name={`form_fields[${index}].field_attributes.asset_type_id`}
                                                                      label="Asset Type"
                                                                      options={
                                                                        Asset_type
                                                                      }
                                                                      title={
                                                                        "Asset Type"
                                                                      }
                                                                      size="small"
                                                                      getOptionLabel={(
                                                                        option
                                                                      ) =>
                                                                        option.assert_type
                                                                      }
                                                                      disable={detail?.disabled
                                                                        ? true
                                                                        : false}
                                                                    />
                                                                  </div>
                                                                )}
                                                            
                                                            </div>
                                                          </div>
                                                          {!detail.field_attributes?.field_type.includes(
                                                            "Yes/No Question"
                                                          ) &&
                                                            detail.disabled ===
                                                            undefined && (
                                                              <Button
                                                                id={
                                                                  "Form_Add_Template-Question" +
                                                                  index +
                                                                  "-option_add"
                                                                }
                                                                onClick={() => {
                                                                  push({
                                                                    option:
                                                                      "No",
                                                                    uniqueId:
                                                                      uuidv4(),
                                                                    document:
                                                                      "",
                                                                    label: "Remarks",
                                                                    remark: "Remark",
                                                                    type: "Optional",
                                                                  });
                                                                }}
                                                                variant="contained"
                                                              >
                                                                Add Option
                                                              </Button>
                                                            )}
                                                        </div>
                                                      )}
                                                    </FieldArray>
                                                  ) : (
                                                    ""
                                                  )}
                                                </div>
                                              </div>
                                              &nbsp;
                                              {detail.field_attributes
                                                ?.field_type ===
                                                "ShortAnswer" ||
                                                detail.field_attributes
                                                  ?.field_type === "Numeric" ? (
                                                <div
                                                  style={{
                                                    display: "flex",
                                                    gap: "10px",
                                                    flexWrap: "wrap",
                                                    marginLeft: "3%",
                                                  }}
                                                >
                                                  <Field
                                                    name={`form_fields[${index}].field_attributes.validations.type`}
                                                  >
                                                    {({ field }) => (
                                                      <FormControl
                                                        fullWidth
                                                        style={{ flex: detail.field_attributes.validations.type !== "Normal text" ? 1 : 0.5 }}
                                                      >
                                                        <Select
                                                          labelId="demo-simple-select-label"
                                                          inputProps={{
                                                            readOnly:
                                                              detail?.disabled
                                                                ? true
                                                                : false,
                                                          }}
                                                          id={
                                                            "Form_Add_Template-Question" +
                                                            index +
                                                            "-Validation-type"
                                                          }
                                                          size="small"
                                                          {...field}
                                                          onChange={(event) => {
                                                            field.onChange(
                                                              event
                                                            );
                                                            if (
                                                              event.target
                                                                .value ===
                                                              "Special characters"
                                                            ) {
                                                              setFieldValue(
                                                                `form_fields[${index}].field_attributes.validations.value`,
                                                                "Pan No"
                                                              );
                                                              setFieldValue(
                                                                `form_fields[${index}].field_attributes.validations.regex`,
                                                                "^[A-Z]{5}[0-9]{4}[A-Z]$"
                                                              );
                                                            }
                                                            if (
                                                              event.target
                                                                .value ===
                                                              "Numeric"
                                                            ) {
                                                              setFieldValue(
                                                                `form_fields[${index}].field_attributes.validations.value`,
                                                                "Min"
                                                              );
                                                            }
                                                            if (
                                                              event.target
                                                                .value ===
                                                              "Regex"
                                                            ) {
                                                              setFieldValue(
                                                                `form_fields[${index}].field_attributes.validations.regex`,
                                                                ""
                                                              );
                                                            }
                                                          }}
                                                        >
                                                          {detail
                                                            .field_attributes
                                                            ?.field_type ===
                                                            "ShortAnswer" && [
                                                              <MenuItem
                                                                key="Normal text"
                                                                value="Normal text"
                                                              >
                                                                Normal Text
                                                              </MenuItem>,
                                                              <MenuItem
                                                                key="Special characters"
                                                                value="Special characters"
                                                              >
                                                                Special Text
                                                              </MenuItem>,
                                                              <MenuItem
                                                                key="Numeric"
                                                                value="Numeric"
                                                              >
                                                                Numeric
                                                              </MenuItem>,
                                                              <MenuItem
                                                                key="regex"
                                                                value="Regex"
                                                              >
                                                                Regex
                                                              </MenuItem>,
                                                            ]}
                                                          {detail
                                                            .field_attributes
                                                            ?.field_type ===
                                                            "Numeric" && [
                                                              <MenuItem
                                                                key="Numeric"
                                                                value="Numeric"
                                                              >
                                                                Numeric
                                                              </MenuItem>,
                                                              <MenuItem
                                                                key="Regex"
                                                                value="Regex"
                                                              >
                                                                Regex
                                                              </MenuItem>,
                                                            ]}
                                                        </Select>
                                                      </FormControl>
                                                    )}
                                                  </Field>
                                                  {detail.field_attributes
                                                    .validations?.type !==
                                                    "Regex" && detail.field_attributes.validations.type !== "Normal text" &&
                                                    (detail.field_attributes
                                                      ?.field_type ===
                                                      "Numeric" ||
                                                      detail.field_attributes
                                                        ?.field_type ===
                                                      "ShortAnswer") && (
                                                      <Field
                                                        name={`form_fields[${index}].field_attributes.validations.value`}
                                                      >
                                                        {({ field }) => (
                                                          <FormControl
                                                            fullWidth
                                                            style={{ flex: 1 }}
                                                          >
                                                            <Select
                                                              labelId="demo-simple-select-label"
                                                              id={
                                                                "Form_Add_Template-Question" +
                                                                index +
                                                                "-Validation_value"
                                                              }
                                                              size="small"
                                                              inputProps={{
                                                                readOnly:
                                                                  detail?.disabled
                                                                    ? true
                                                                    : false,
                                                              }}
                                                              {...field}
                                                              onChange={(
                                                                event
                                                              ) => {
                                                                field.onChange(
                                                                  event
                                                                );
                                                                if (
                                                                  event.target
                                                                    .value ===
                                                                  "Pan No"
                                                                ) {
                                                                  setFieldValue(
                                                                    `form_fields[${index}].field_attributes.validations.regex`,
                                                                    "^[A-Z]{5}[0-9]{4}[A-Z]$"
                                                                  );
                                                                }
                                                                if (
                                                                  event.target
                                                                    .value ===
                                                                  "Aadhar No"
                                                                ) {
                                                                  setFieldValue(
                                                                    `form_fields[${index}].field_attributes.validations.regex`,
                                                                    "^d{12}$"
                                                                  );
                                                                }
                                                                if (
                                                                  event.target
                                                                    .value ===
                                                                  "GST No"
                                                                ) {
                                                                  setFieldValue(
                                                                    `form_fields[${index}].field_attributes.validations.regex`,
                                                                    "^d{2}[A-Z]{5}d{4}[A-Z]{1}d{1}[Z]{1}[A-Zd]{1}$"
                                                                  );
                                                                }
                                                                if (
                                                                  event.target
                                                                    .value ===
                                                                  "Pincode"
                                                                ) {
                                                                  setFieldValue(
                                                                    `form_fields[${index}].field_attributes.validations.regex`,
                                                                    "^[1-9][0-9]{5}$"
                                                                  );
                                                                }
                                                                if (
                                                                  event.target
                                                                    .value ===
                                                                  "Email"
                                                                ) {
                                                                  setFieldValue(
                                                                    `form_fields[${index}].field_attributes.validations.regex`,
                                                                    "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
                                                                  );
                                                                }
                                                                if (
                                                                  event.target
                                                                    .value ===
                                                                  "URL"
                                                                ) {
                                                                  setFieldValue(
                                                                    `form_fields[${index}].field_attributes.validations.regex`,
                                                                    "^(http|https)://[w-]+(.[w-]+)+([w-.,@?^=%&:/~+#]*[w-@?^=%&/~+#])?$"
                                                                  );
                                                                }
                                                                if (
                                                                  event.target
                                                                    .value ===
                                                                  "Phone No"
                                                                ) {
                                                                  setFieldValue(
                                                                    `form_fields[${index}].field_attributes.validations.regex`,
                                                                    "^\d{1,3}[-.\s]?(\d{1,3})?[-.\s]?\d{1,4}[-.\s]?\d{1,4}$"
                                                                  );
                                                                }
                                                                if (
                                                                  event.target
                                                                    .value ===
                                                                  "IFSC Code"
                                                                ) {
                                                                  setFieldValue(
                                                                    `form_fields[${index}].field_attributes.validations.regex`,
                                                                    "^[A-Z]{4}0[A-Z0-9]{6}$"
                                                                  );
                                                                }
                                                                if (
                                                                  event.target
                                                                    .value ===
                                                                  "Driving License No"
                                                                ) {
                                                                  setFieldValue(
                                                                    `form_fields[${index}].field_attributes.validations.regex`,
                                                                    "^[A-Z0-9]{1,20}$"
                                                                  );
                                                                }
                                                                if (
                                                                  event.target
                                                                    .value ===
                                                                  "Min"
                                                                ) {
                                                                  setFieldValue(
                                                                    `form_fields[${index}].field_attributes.validations.regex`,
                                                                    "^d{5,}$"
                                                                  );
                                                                }
                                                                if (
                                                                  event.target
                                                                    .value ===
                                                                  "Max"
                                                                ) {
                                                                  setFieldValue(
                                                                    `form_fields[${index}].field_attributes.validations.regex`,
                                                                    "^d{1,5}$"
                                                                  );
                                                                }
                                                                if (
                                                                  event.target
                                                                    .value ===
                                                                  "Min-Max"
                                                                ) {
                                                                  setFieldValue(
                                                                    `form_fields[${index}].field_attributes.validations.regex`,
                                                                    "^.{5,8}$"
                                                                  );
                                                                }
                                                                if (
                                                                  event.target
                                                                    .value ===
                                                                  "Fixed"
                                                                ) {
                                                                  setFieldValue(
                                                                    `form_fields[${index}].field_attributes.validations.regex`,
                                                                    "^d{5}$"
                                                                  );
                                                                }
                                                              }}
                                                            >
                                                              {detail
                                                                .field_attributes
                                                                ?.validations
                                                                ?.type ===
                                                                "Special characters" && [
                                                                  <MenuItem
                                                                    key="Pan No"
                                                                    value="Pan No"
                                                                  >
                                                                    PAN No
                                                                  </MenuItem>,
                                                                  <MenuItem
                                                                    key="Aadhar No"
                                                                    value="Aadhar No"
                                                                  >
                                                                    Aadhar No
                                                                  </MenuItem>,
                                                                  <MenuItem
                                                                    key="GST No"
                                                                    value="GST No"
                                                                  >
                                                                    GST No
                                                                  </MenuItem>,
                                                                  <MenuItem
                                                                    key="Pincode"
                                                                    value="Pincode"
                                                                  >
                                                                    Pincode
                                                                  </MenuItem>,
                                                                  <MenuItem
                                                                    key="Email"
                                                                    value="Email"
                                                                  >
                                                                    Email
                                                                  </MenuItem>,
                                                                  <MenuItem
                                                                    key="URL"
                                                                    value="URL"
                                                                  >
                                                                    URL
                                                                  </MenuItem>,
                                                                  <MenuItem
                                                                    key="Phone No"
                                                                    value="Phone No"
                                                                  >
                                                                    Phone No
                                                                  </MenuItem>,
                                                                  <MenuItem
                                                                    key="IFSC Code"
                                                                    value="IFSC Code"
                                                                  >
                                                                    IFSC Code
                                                                  </MenuItem>,
                                                                  <MenuItem
                                                                    key="Driving License No"
                                                                    value="Driving License No"
                                                                  >
                                                                    Driving
                                                                    License No
                                                                  </MenuItem>,
                                                                ]}
                                                              {detail
                                                                .field_attributes
                                                                ?.validations
                                                                ?.type ===
                                                                "Numeric" && [
                                                                  <MenuItem
                                                                    key="Min"
                                                                    value="Min"
                                                                  >
                                                                    Min
                                                                  </MenuItem>,
                                                                  <MenuItem
                                                                    key="Max"
                                                                    value="Max"
                                                                  >
                                                                    Max
                                                                  </MenuItem>,
                                                                  <MenuItem
                                                                    key="Min-Max"
                                                                    value="Min-Max"
                                                                  >
                                                                    Min-Max
                                                                  </MenuItem>,
                                                                  <MenuItem
                                                                    key="Fixed"
                                                                    value="Fixed"
                                                                  >
                                                                    Fixed
                                                                  </MenuItem>,
                                                                ]}
                                                            </Select>
                                                          </FormControl>
                                                        )}
                                                      </Field>
                                                    )}
                                                  {detail.field_attributes
                                                    ?.validations?.type ===
                                                    "Numeric" && (
                                                      <div style={{ flex: 1 }}>
                                                        <MyTextField
                                                          name={`form_fields[${index}].field_attributes.validations.min`}
                                                          id={
                                                            "Form_Add_Template-Question" +
                                                            index +
                                                            "-Validation_regex"
                                                          }
                                                          label={
                                                            detail
                                                              .field_attributes
                                                              .validations
                                                              .value === "Min-Max"
                                                              ? "Min"
                                                              : detail
                                                                .field_attributes
                                                                .validations
                                                                .value
                                                          }
                                                          disable={
                                                            detail?.disabled
                                                              ? true
                                                              : false
                                                          }
                                                          setFieldValue={
                                                            setFieldValue
                                                          }
                                                          detail={
                                                            detail
                                                              .field_attributes
                                                              .validations
                                                          }
                                                          index={index}
                                                        />
                                                      </div>
                                                    )}
                                                  {detail.field_attributes
                                                    ?.validations?.value ===
                                                    "Min-Max" &&
                                                    detail.field_attributes
                                                      .validations?.type ===
                                                    "Numeric" && (
                                                      <div style={{ flex: 1 }}>
                                                        <MyTextField
                                                          name={`form_fields[${index}].field_attributes.validations.max`}
                                                          id={
                                                            "Form_Add_Template-Question" +
                                                            index +
                                                            "-Validation_regex"
                                                          }
                                                          label={"Max"}
                                                          disable={
                                                            detail?.disabled
                                                              ? true
                                                              : false
                                                          }
                                                          setFieldValue={
                                                            setFieldValue
                                                          }
                                                          detail={
                                                            detail
                                                              .field_attributes
                                                              .validations
                                                          }
                                                          index={index}
                                                        />
                                                      </div>
                                                    )}
                                                  {detail.field_attributes
                                                    ?.validations?.type ===
                                                    "Regex" && (
                                                      <div style={{ flex: 1 }}>
                                                        <MyTextField
                                                          name={`form_fields[${index}].field_attributes.validations.regex`}
                                                          id={
                                                            "Form_Add_Template-Question" +
                                                            index +
                                                            "-Validation_regex"
                                                          }
                                                          label={"Pattern"}
                                                          disable={
                                                            detail?.disabled
                                                              ? true
                                                              : false
                                                          }
                                                        />
                                                      </div>
                                                    )}
                                                  {detail.field_attributes
                                                    ?.validations?.value !==
                                                    "" && detail.field_attributes.validations.type !== "Normal text" &&
                                                    detail.field_attributes
                                                      ?.validations?.method !==
                                                    "Regex" && (
                                                      <div style={{ flex: 1 }}>
                                                        <MyTextField
                                                          name={`form_fields[${index}].field_attributes.validations.errorText`}
                                                          id={
                                                            "Form_Add_Template-Question" +
                                                            index +
                                                            "-Validation_errorText"
                                                          }
                                                          label="Custom error message"
                                                          disable={
                                                            detail?.disabled
                                                              ? true
                                                              : false
                                                          }
                                                        />
                                                      </div>
                                                    )}
                                                  {detail.field_attributes
                                                    ?.validations?.method ===
                                                    "Regex" && detail.field_attributes.validations.type !== "Normal text" && (
                                                      <div style={{ flex: 1 }}>
                                                        <MyTextField
                                                          name={`form_fields[${index}].field_attributes.validations.errorText`}
                                                          id={
                                                            "Form_Add_Template-Question" +
                                                            index +
                                                            "-Validation_errorText"
                                                          }
                                                          label="Custom error message"
                                                          disable={
                                                            detail?.disabled
                                                              ? true
                                                              : false
                                                          }
                                                        />
                                                      </div>
                                                    )}
                                                </div>
                                              ) : (
                                                ""
                                              )}
                                              &nbsp;
                                              {errors?.form_fields && (
                                                <Typography
                                                  fontSize={
                                                    10
                                                  }
                                                  color="red"
                                                >
                                                  {
                                                    errors
                                                      ?.form_fields?.[index]?.field_attributes?.validations
                                                      ?.allowed_file_types
                                                  }
                                                </Typography>
                                              )}
                                              {detail.field_attributes
                                                ?.field_type ===
                                                "ImageUpload" ? (
                                                <UploadComponent
                                                  name={`form_fields[${index}].field_attributes.validations.allowed_file_types`}
                                                  setFieldValue={
                                                    setFieldValue
                                                  }
                                                  values={
                                                    detail.field_attributes.validations.allowed_file_types
                                                  }
                                                  disabled={
                                                    detail?.disabled
                                                      ? true
                                                      : false
                                                  }
                                                />
                                              ) : (
                                                ""
                                              )}
                                              {detail.field_attributes
                                                ?.field_type ===
                                                "Linear scale" && (
                                                  <div
                                                    style={{
                                                      display: "flex",
                                                      gap: "15px",
                                                      marginLeft: "3%",
                                                    }}
                                                  >
                                                    <div>
                                                      <Field
                                                        name={`form_fields[${index}].field_attributes.Linearstart`}
                                                      >
                                                        {({ field }) => (
                                                          <TextField
                                                            id="Form_Add_Template-type"
                                                            select
                                                            size="small"
                                                            fullWidth
                                                            label=""
                                                            value={field.value}
                                                            onChange={(event) =>
                                                              setFieldValue(
                                                                `form_fields[${index}].field_attributes.Linearstart`,
                                                                event.target.value
                                                              )
                                                            }
                                                          >
                                                            {LINEARSCALE.map(
                                                              (item) => (
                                                                <MenuItem
                                                                  key={item}
                                                                  value={item}
                                                                >
                                                                  {item}
                                                                </MenuItem>
                                                              )
                                                            )}
                                                          </TextField>
                                                        )}
                                                      </Field>
                                                    </div>
                                                    <div
                                                      style={{
                                                        marginTop: "0.7%",
                                                      }}
                                                    >
                                                      <Typography h2>
                                                        to
                                                      </Typography>
                                                    </div>
                                                    <div>
                                                      <Field
                                                        name={`form_fields[${index}].field_attributes.Linearend`}
                                                      >
                                                        {({ field }) => (
                                                          <TextField
                                                            id="Form_Add_Template-type"
                                                            select
                                                            size="small"
                                                            fullWidth
                                                            label=""
                                                            value={field.value}
                                                            onChange={(event) =>
                                                              setFieldValue(
                                                                `form_fields[${index}].field_attributes.Linearend`,
                                                                event.target.value
                                                              )
                                                            }
                                                          >
                                                            {LINEARSCALE1.map(
                                                              (item) => (
                                                                <MenuItem
                                                                  key={item}
                                                                  value={item}
                                                                >
                                                                  {item}
                                                                </MenuItem>
                                                              )
                                                            )}
                                                          </TextField>
                                                        )}
                                                      </Field>
                                                    </div>
                                                  </div>
                                                )}
                                              &nbsp;
                                              {detail.field_attributes
                                                ?.field_type ===
                                                "Linear scale" && (
                                                  <>
                                                    <div
                                                      style={{
                                                        display: "flex",
                                                        gap: "2px",
                                                        marginLeft: "3%",
                                                      }}
                                                    >
                                                      <div
                                                        style={{
                                                          marginTop: "0.8%",
                                                          width: "25px",
                                                        }}
                                                      >
                                                        <Typography h2>
                                                          {
                                                            detail
                                                              ?.field_attributes
                                                              ?.Linearstart
                                                          }
                                                        </Typography>
                                                      </div>
                                                      <div
                                                        style={{ width: "220px" }}
                                                      >
                                                        <MyTextField
                                                          label="Label (optional)"
                                                          disable={
                                                            detail?.disabled
                                                              ? true
                                                              : false
                                                          }
                                                          name={`form_fields[${index}].field_attributes.Linearstart_label`}
                                                          id={
                                                            "Form_Add_Template-Question-" +
                                                            index +
                                                            "Linearstart_label"
                                                          }
                                                        />
                                                      </div>
                                                    </div>
                                                    &nbsp;
                                                    <div
                                                      style={{
                                                        display: "flex",
                                                        gap: "2px",
                                                        marginLeft: "3%",
                                                      }}
                                                    >
                                                      <div
                                                        style={{
                                                          marginTop: "0.8%",
                                                          width: "25px",
                                                        }}
                                                      >
                                                        <Typography h2>
                                                          {
                                                            detail
                                                              ?.field_attributes
                                                              ?.Linearend
                                                          }
                                                        </Typography>
                                                      </div>
                                                      <div
                                                        style={{ width: "220px" }}
                                                      >
                                                        <MyTextField
                                                          label="Label (optional)"
                                                          disable={
                                                            detail?.disabled
                                                              ? true
                                                              : false
                                                          }
                                                          name={`form_fields[${index}].field_attributes.Linearend_label`}
                                                          id={
                                                            "Form_Add_Template-Question-" +
                                                            index +
                                                            "Linearstart_label"
                                                          }
                                                        />
                                                      </div>
                                                    </div>
                                                  </>
                                                )}
                                              &nbsp;
                                              <Divider
                                                style={{ margin: "1vh" }}
                                              />
                                              <div
                                                style={{
                                                  display: "flex",
                                                  flexWrap: "wrap",
                                                }}
                                              >
                                                <div
                                                  style={{ marginLeft: "2%" }}
                                                >
                                                  <TextField
                                                    value={
                                                      detail.field_attributes
                                                        ?.field_type
                                                    }
                                                    variant="standard"
                                                    inputProps={{
                                                      readOnly: true,
                                                    }}
                                                  />
                                                </div>
                                                <div
                                                  style={{
                                                    marginRight: "0",
                                                    marginLeft: "auto",
                                                  }}
                                                >
                                                  {detail.field_attributes
                                                    ?.field_type !==
                                                    "Heading" &&
                                                    detail.field_attributes
                                                      ?.field_type !==
                                                    "Subheading" ? (
                                                    <Field
                                                      name={`form_fields[${index}].is_required`}
                                                    >
                                                      {({ field, form }) => (
                                                        <FormControlLabel
                                                          control={
                                                            <Switch
                                                              color="primary"
                                                              id={
                                                                "Form_Add_Template-Question" +
                                                                index +
                                                                "-is_required"
                                                              }
                                                              checked={
                                                                field.value
                                                              }
                                                              {...field}
                                                            />
                                                          }
                                                          label="Required"
                                                        />
                                                      )}
                                                    </Field>
                                                  ) : (
                                                    ""
                                                  )}
                                                  <Tooltip title="Duplicate">
                                                    <IconButton
                                                      id={
                                                        "Form_Add_Template-Question" +
                                                        index +
                                                        "-Duplicate"
                                                      }
                                                      onClick={() => {
                                                        const lastOption =
                                                          values.form_fields[
                                                          index
                                                          ];
                                                        const clonedOption = {
                                                          ...lastOption,
                                                          unique_id: uuidv4(),
                                                          disabled: false,
                                                          field_attributes: {
                                                            ...lastOption.field_attributes,
                                                            options:
                                                              lastOption.field_attributes.options.map(
                                                                (option) => ({
                                                                  ...option,
                                                                  uniqueId:
                                                                    uuidv4(),
                                                                })
                                                              ),
                                                          },
                                                        };
                                                        push(clonedOption);
                                                      }}
                                                    >
                                                      <ContentCopyIcon />
                                                    </IconButton>
                                                  </Tooltip>
                                                  {values?.form_fields.length >
                                                    1 && (
                                                      <Tooltip title="Delete">
                                                        <IconButton
                                                          id={
                                                            "Form_Add_Template-Question" +
                                                            index +
                                                            "-Delete"
                                                          }
                                                          onClick={() => {
                                                            remove(index);
                                                          }}
                                                        >
                                                          <DeleteIcon />
                                                        </IconButton>
                                                      </Tooltip>
                                                    )}
                                                </div>
                                              </div>
                                              <br />
                                            </div>
                                          </Paper>
                                        </div>
                                      )}
                                    </Draggable>
                                  );
                                })}
                                <Stack
                                  direction="row"
                                  spacing={4}
                                  justifyContent="flex-end"
                                  style={{ padding: 10, right: "0%" }}
                                >
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    id="Form_Add_Template-add"
                                    onClick={() =>
                                      push({
                                        title: "",
                                        unique_id: uuidv4(),
                                        form_order: 0,
                                        description: "",
                                        form_type_id: 1,
                                        is_required: false,
                                        report_title: "",
                                        validation: true,
                                        field_attributes: {
                                          options: [
                                            {
                                              option: "Yes",
                                              uniqueId: uuidv4(),
                                              photo: [],
                                              video: [],
                                              document: [],
                                              remark: "Remarks",
                                              label: "Remark",
                                              type: "Optional",
                                            },
                                            {
                                              option: "No",
                                              uniqueId: uuidv4(),
                                              remark: "Remarks",
                                              photo: [],
                                              video: [],
                                              document: [],
                                              label: "Remark",
                                              type: "Optional",
                                            },
                                          ],
                                          complaints: "Yes",
                                          asset_type_id: null,
                                          asset_type: "",
                                          asset_label: "Asset Question",
                                          field_type: "ShortAnswer",
                                          Linearstart: 0,
                                          Linearend: 2,
                                          Linearstart_label: "",
                                          Linearend_label: "",
                                          allowed_file_types: [],
                                          validations: {
                                            regex: "^[A-Z]{5}[0-9]{4}[A-Z]$",
                                            value: "Pan No",
                                            method: "Regex",
                                            errorText: "",
                                            min: "",
                                            max: "",
                                            type: "Special characters",
                                            allowed_file_types: {
                                              photo: ["jpeg"],
                                              video: [],
                                              document: [],
                                            },
                                          },
                                        },
                                      })
                                    }
                                  >
                                    Add
                                  </Button>
                                  <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                  >
                                    Submit
                                  </Button>
                                </Stack>
                              </div>
                            )}
                          </Droppable>
                        )}
                      </FieldArray>
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </form>
          )}
        </Formik>
        <Backdrop loader={Loader} />
        <Snackbar open={Boolean(success)}>
          <Alert severity="success">{success}</Alert>
        </Snackbar>
        <Snackbar open={Boolean(failure)}>
          <Alert severity="error">{failure}</Alert>
        </Snackbar>
      </div>
    </div>
  );
};
export default Template;
