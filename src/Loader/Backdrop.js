
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
