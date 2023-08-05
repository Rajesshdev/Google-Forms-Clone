{
  /*File: Alert.js
   Objective: The objective of the provided code is to create a reusable Alertpopup component that displays a dialog box with customizable content. 
    The component expects several props to be passed to it, including open (a boolean indicating whether the dialog is open), 
    close (a function to handle the close event of the dialog), data (the main data/content to be displayed),
    data1 (an optional second data/content to be displayed), and allow (a function to be triggered when the user selects the "Yes" option).
    
    The Alertpopup component utilizes the Material-UI Dialog component to create the dialog box. The open prop controls the visibility of the dialog,
    and the onClose prop specifies the function to be called when the dialog is closed.
    
    Inside the dialog, the main data (data) and the optional second data (data1) are conditionally displayed based on their existence and content. 
    The content is styled using CSS-in-JS in the style prop of a div element.

    The dialog actions section provides buttons based on the presence of the second data. 
    If data1 is defined, two buttons are displayed: "No" to close the dialog and "Yes" to trigger the allow function. 
    If data1 is not defined, only an "OK" button is displayed to close the dialog.

    Overall, the Alertpopup component offers a flexible way to display customizable dialogs with different content and actions, making it suitable for various use cases in an application

*/
}
import React from "react";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";

const Alertpopup = ({ open, close, data, data1, allow }) => {
  return (
    <>
      {/* Dialog component */}
      <Dialog
        open={open} // Set the open state of the dialog
        onClose={close} // Set the close function to handle dialog close event
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* Dialog content */}
        <DialogContent>
          <div
            style={{
              fontFamily: "sans-serif",
              display: "flex",
              flexDirection: "column",
              fontSize: "17px",
            }}
          >
            {/* Display the data if it is defined */}
            {data != undefined && <>{data}</>}

            {/* Display the second data if it is defined and not an empty string */}
            {data1 != undefined && data1 != "" && <>{data1}</>}
          </div>
        </DialogContent>

        {/* Dialog actions */}
        <DialogActions>
          {/* If the second data is defined */}
          {data1 != undefined ? (
            <>
              {/* Button to close the dialog */}
              <Button onClick={close}>No</Button>
              {/* Button to trigger the allow function */}
              <Button
                color="primary"
                variant="contained"
                onClick={allow}
                autoFocus
              >
                Yes
              </Button>
            </>
          ) : (
            <>
              {/* If the second data is not defined, show a single OK button */}
              <Button onClick={close}>OK</Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Alertpopup;
