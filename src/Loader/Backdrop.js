{
  /**File: Backdrop.js
   Objective: 
 * Backdrops component displays a circular progress loader with a backdrop.
 * It is used to indicate loading or processing state when the loader prop is true.
 * @param {Object} props - Component props
 * @param {boolean} props.loader - A boolean flag to control the visibility of the backdrop and loader.
 * @returns {JSX.Element} - A JSX element representing the Backdrop component with a circular progress loader.
 
Initiated By: Rajesh  A on 19th July 2023
Modification History
--------------------------------------------------------------------------------------------------------------------
DATE     |   AUTHOR   |  ModifiCation Request No.                  |      Remarks / Details of Changes
--------------------------------------------------------------------------------------------------------------------
19-July-2023  Rajesh                                                            Initial creation
--------------------------------------------------------------------------------------------------------------------
*/
}
// Import React Hook
import React from 'react';
// Import Mui Hooks
import { Backdrop, CircularProgress } from '@mui/material';
const Backdrops = (props) => {
  return (
    // Backdrop component to create an overlay with a dark background
    <Backdrop
      // Styling for the backdrop: white text color and a higher z-index to be above other elements
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1 }}
      // Control the visibility of the backdrop based on the loader prop value
      open={props.loader}
    >
      {/* Circular progress loader displayed on the backdrop */}
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

// Use React.memo to optimize rendering by memorizing the component if props haven't changed
export default React.memo(Backdrops);
