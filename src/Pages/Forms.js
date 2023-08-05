
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
            onFilterChanged={""}
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