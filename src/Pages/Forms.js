{
  /*File: Forms.js
   Objective: 
   The objective of this page Forms component is to create a form management page that allows users to view and interact with a grid-based representation of form data.
   Users can add new forms, edit existing forms, and delete selected forms. The component utilizes various libraries and hooks, 
   such as React Router, Ant Design, and React Snackbar, to implement the desired functionality.

   Here are the more detailed objectives of the Forms component:

   Import Dependencies: 
   The component imports the necessary dependencies, including the useHistory hook from the React Router library and the liveApi function.

   Set State Variables: 
   The component initializes state variables using the useState hook. 
   It defines AGData to store the form data, success to display success messages, and failure to display error messages.

   Grid Initialization: 
   The component defines the onGridReady function, which is called when the grid is ready.
   It sets the gridApi variable to the API instance provided by the grid.

   Fetch Form Data: 
   The GetForm function fetches the form data from the server using the liveapi function. 
   It sets the retrieved form data to the AGData state variable.

   Edit Functionality: 
   The Edit function is called when the Edit button is clicked. 
   It retrieves the selected row(s) from the grid using the gridApi.selectionService.getSelectedRows() method. 
   It then redirects the user to the edit page of the selected form by updating the URL using the history.push method.

   Fetch Data on Mount: 
   The component uses the useEffect hook to call the GetForm function when the component mounts. 
   This ensures that the form data is fetched and stored in the AGData state variable.

   Defining utility functions: 
   The code defines several utility functions such as handleClose (to handle closing the popup), and allow (to allow certain actions).

   Render User Interface: 
   The component renders the user interface elements using JSX syntax. 
   It uses the Ant Design components, such as AppBar, Toolbar, and Button, to create the header with buttons for adding, editing, and deleting forms. 
   The AgGrid component is used to display the grid with the form data. 
   The component also includes Snackbar components to display success and failure messages.

   Interact with Grid: 
   The Forms component interacts with the AgGrid component by passing the AGData state variable as a prop to display the form data. 
   It also passes the AgColumnData prop to configure the column headers and data mapping. 
   The onGridReady function is provided as a prop to set up the grid API instance and enable row selection.

   Handle User Actions:
   The component handles user actions, such as clicking the Add button to navigate to the form addition page and clicking the Edit button to trigger the Edit function. 
   However, the code for the Delete functionality is commented out and not included in the provided code snippet.

   Display Messages: 
   The component displays success and failure messages using the Snackbar component from the React Snackbar library.
   When the success or failure state variables have a value, the corresponding message is shown to the user.

By achieving these objectives, the Forms component provides a functional and interactive form management page. 
It allows users to view, add, and edit form data in a grid-based layout. 
The component communicates with server APIs to fetch and update form data, and it utilizes various libraries and components to enhance the user experience
*/
}
// Import React Hooks
import React, { useState, useEffect } from "react";
// Import Router Hook
import { useHistory } from "react-router-dom";
// Import Mui components
import {
  Typography,
  AppBar,
  Toolbar,
  Box,
  Grid,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
// Import Mui icons
import AddBoxRoundedIcon from "@material-ui/icons/AddBoxRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import DownloadIcon from "@mui/icons-material/Download";
// Import Service Hook
import { liveApi } from "../service/Service";
// Import Custom Hook Components
import AgGrid from "../Components/AGgrid";
import Alertpopup from "../Components/Alert";
// Import Constants
import { FAILURE, Template } from "../Constants/Constant";
// Import Css
import "../Css/ag.css";
// Define GridApi
let gridApi;
/*Function Initialization */
const Forms = () => {
  // Import the useHistory function from the React Router library
  const history = useHistory();
  // Call the liveApi function to get an instance of the live API
  const liveapi = liveApi();
  // Create a state variable called AGData and a function to update it (setAGData)
  const [AGData, setAGData] = useState([]);
  // Create a state variable called success and a function to update it (setSuccess)
  const [success, setSuccess] = useState("");
  // Create a state variable called failure and a function to update it (setFailure)
  const [failure, setFailure] = useState("");
  // Initialize state variables
  // State variable to manage the open state of a popup
  const [open2, setOpen2] = useState(false);
  // State variable to store popup data
  const [popupdata, setPopupdata] = useState();
  // State variable to store additional popup data
  const [popupdata1, setPopupdata1] = useState();

  // Function to handle closing the popup
  const handleClose = () => {
    setOpen2(false); // Set open2 state to false, closing the popup
    setPopupdata1(); // Reset the value of popupdata1 (to undefined or null)
  };

  // Function to allow some action
  const allow = (props) => {
    setOpen2(false); // Set open2 state to false, closing the popup
    setPopupdata1(); // Reset the value of popupdata1 (to undefined or null)
  };

  // This function is called when the grid is ready
  const onGridReady = (params) => {
    gridApi = params.api;
  };
  // This function fetches the form data
  const GetForm = () => {
    liveapi
      .get("/ipss-forms/?results_per_page=1000")
      .then((res) => {
        // Set the retrieved form data to AGData state
        setAGData(res.data.results);
        setFailure('')
      })
      .catch((err) => {
        console.log("error", err);
        setFailure(FAILURE)
      });
  };
  // This function is called when the Edit button is clicked
  const Edit = () => {
    // Get the selected rows from the grid
    const selectedRows = gridApi.selectionService.getSelectedRows();

    // Check if no rows are selected
    if (selectedRows === undefined || selectedRows.length === 0) {
      setOpen2(true); // Set open2 state to true, indicating that the popup should be opened
      setPopupdata("No Row is Selected, Please Select a Row"); // Set the popup data with an appropriate message
    }
    // Check if more than one row is selected
    else if (selectedRows.length > 1) {
      setOpen2(true); // Set open2 state to true, indicating that the popup should be opened
      setPopupdata("More than One Row is Selected, Please Select Only One Row"); // Set the popup data with an appropriate message
    }
    // If only one row is selected
    else {
      // Redirect to the edit page with the selected form ID
      history.push("/assets/forms/edit/"+1);
    }
  };

  // This function is called when the Add button is clicked
  const Add = () => {
    const selectedRows = gridApi.selectionService.getSelectedRows();

    // Check if any rows are selected
    if (selectedRows.length > 0) {
      setOpen2(true); // Set open2 state to true, indicating that the popup should be opened
      setPopupdata("Unselect the Checkbox"); // Set the popup data with an appropriate message
    }
    // If no rows are selected
    else {
      history.push("/assets/forms/add"); // Redirect to the add page
    }
  };

  // // Call GetForm function when the component mounts
  // useEffect(() => {
  //   GetForm();
  // }, []);
  var FormPermission= ["add", "edit", "delete"];
  const Data=localStorage.getItem("data");
  useEffect(() => {
    if(Data){
      setAGData([JSON.parse(Data)]);
    }
  },[Data]);
  //
  return (
    <div
      className="ag-theme-alpine"
      style={{
        height: "70vh",
        marginLeft: 25,
        marginRight: 25,
        marginTop: 15,
      }}
    >
      {/* Grid component */}
      <Grid style={{ height: "100%" }}>
        {/* AppBar component */}
        <AppBar position="static" class="appbar">
          <Toolbar>
            <Box display="flex" flexGrow={1}>
              <Typography variant="h6" style={{ fontWeight: 'bolder' }}>Digital Forms</Typography>
            </Box>
            <Grid style={{ marginRight: "0", marginLeft: "auto" }}>
              {/* Add button */}
              {FormPermission?.includes("add") && (
                <div class="tooltip">
                  <Button
                    varient="text"
                    className="Grid_Button"
                    id="Form_Add-Button"
                    onClick={Add}
                  >
                    <AddBoxRoundedIcon className="color" />
                  </Button>
                  <span class="tooltiptext">Add</span>
                </div>)}
              {/* Edit button */}
              {FormPermission?.includes("edit") && (
                <div class="tooltip">
                  <Button varient="text" className="Grid_Button"
                    id="Form_Edit-Button"
                    onClick={() => Edit()}>
                    <EditRoundedIcon className="color" />
                  </Button>
                  <span class="tooltiptext">Edit </span>
                </div>
              )}          
            </Grid>
          </Toolbar>
        </AppBar>
        <br />
        <div style={{ height: 500 }}>
          {/* AgGrid component */}
          <AgGrid
            AGData={AGData} // Pass AGData as a prop to AgGrid component
            AgColumnData={Template} // Pass AgColumnData as a prop to AgGrid component
            onGridReady={onGridReady} // Pass onGridReady function as a prop to AgGrid component
            rowSelection="single" // Set rowSelection prop of AgGrid component to "single"
            headerHeight={55}
          />
        </div>
        {/* Snackbar for success message */}
        <Snackbar open={Boolean(success)}>
          <Alert severity="success">{success}</Alert>
        </Snackbar>
        {/* Snackbar for failure message */}
        <Snackbar open={Boolean(failure)}>
          <Alert severity="error">{failure}</Alert>
        </Snackbar>
        {/* Render the Alertpopup component */}
        <Alertpopup
          open={open2} // Prop to control whether the Alertpopup component is open or closed. Uses the value of the open2 state variable.
          close={handleClose} // Prop that holds the function to be called when the user wants to close the Alertpopup. Uses the handleClose function.
          allow={allow} // Prop that holds the function to be called when the user wants to allow or perform a certain action. Uses the allow function.
          data={popupdata} // Prop that holds the data to be displayed within the Alertpopup component. Uses the value of the popupdata state variable.
          data1={popupdata1} // Prop that holds additional data to be displayed within the Alertpopup component. Uses the value of the popupdata1 state variable.
        />

      </Grid>
    </div>
  );
};
export default Forms;