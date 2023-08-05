{
  /*File: AGgrid.js
   Objective: The objective of the page is to create a reusable Grid component that displays 
   data in a tabular format using the Ag-Grid library.
  The Grid component expects certain props to be passed to it, including AGData (the data to be displayed), 
  AgColumnData (the column definitions), onGridReady (a callback function for the grid ready event), 
  rowSelection (the mode of row selection), and onFilterChanged (a callback function for filter changes).
  The Page component serves as an example usage of the Grid component. 
  It demonstrates how to fetch the necessary data and column definitions, handle the grid ready event, and handle filter changes. 
  The fetched data is then passed as props to the Grid component for rendering.
  By separating the Grid component from the Page component, it promotes reusability, 
  making it easier to use the same grid component in different parts of the application with different data and configurations..
  
*/
}
import React from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
// Default column definitions for the grid
const defColumnDefs = {
  sortable: true,
  resizable: true,
  wrapHeaderText: true,
  autoHeaderHeight: true,
  autoHeaderWidth: true,
  lockVisible: true,
  filter: true,
  floatingFilter: true,
  enableBrowserTooltips: false,
  minWidth: 121,
};

// Grid component
const Grid = ({
  AGData,
  AgColumnData,
  onGridReady,
  rowSelection,
  onFilterChanged,
  headerHeight
}) => {
  return (
    <>
      {/* Render the AgGridReact component */}
      <AgGridReact
        headerCheckboxSelection={true} // Enable checkbox selection in the header
        headerCheckboxSelectionFilteredOnly={true} // Enable checkbox selection only for filtered rows in the header
        checkboxSelection={true} // Enable checkbox selection for each row
        onFilterChanged={onFilterChanged} // Callback function for filter changes
        rowSelection={rowSelection} // Set the row selection mode
        rowData={AGData} // Set the data for the grid
        columnDefs={AgColumnData} // Set the column definitions for the grid
        defaultColDef={defColumnDefs} // Set the default column definitions for the grid
        pagination={true} // Enable pagination
        onGridReady={onGridReady} // Callback function for grid ready event
        paginationPageSize={20} // Set the number of rows per page in pagination
        headerHeight={headerHeight} // Set the height of the header
      />
    </>
  );
};
export default Grid;
