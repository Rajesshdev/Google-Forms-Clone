{
  /*File: Constant.js
   Objective: 
   The objective of the page is defining constants and an array of objects for a specific purpose.
   Here's the objective or purpose of the code:
   Constants:
    DELETE_SUCCESS: Represents a success message to be displayed when data is deleted successfully.
    SAVE_SUCCESS: Represents a success message to be displayed when data is saved successfully.
    FAILURE: Represents an error message to be displayed when there is an issue in the system.
    CONFLICT: Represents a message to be displayed when there is a conflict or duplication of data.
    TIME_OUT: Represents a timeout duration in milliseconds (2 seconds) for certain operations.
    PARENT Array: Represents a list of parent options for a select dropdown or similar input field. In this case, it contains a single option, "User". 
    It suggests that the code is related to a feature where the user needs to select a parent entity, and "User" is one of the available options.
    Template Array: Represents the configuration for a table or grid template. Each object within the array defines a column with the following properties:
    field: Represents the key or identifier for the corresponding data field in the table or grid.
    headerName: Represents the display name or label for the column header.
    width: Represents the width of the column in pixels or other units.
  
    The objective of this code snippet appears to be providing reusable constants for success/failure messages, 
    defining a list of parent options, and specifying the configuration for a table or grid template.
    The code can be utilized in a larger application to handle success/failure messages, populate dropdown/select fields, and structure the layout of a table or grid component.

*/
}
export const DELETE_SUCCESS = "Data deleted Successfully!";
export const SAVE_SUCCESS = "Data saved Successfully!";
export const FAILURE = "Facing some issue in system. please try again!";
export const CONFLICT = "Data is Already Exists!";
export const TIME_OUT = 2000;
export const PARENT = ["User","Form"];
export const Template = [
  {
    field: "title",
    headerName: "Title",
    width: 350,
    headerCheckboxSelection: true,
    headerCheckboxSelectionFilteredOnly: true,
    checkboxSelection: true,
  },
  {
    field: "description",
    width: 350,
    headerName: "Description",
  },
];
export   const FORMATS = [
  { category: 'photo', format: 'jpeg' },
  { category: 'photo', format: 'png' },
  { category: 'photo', format: 'gif' },
  { category: 'photo', format: 'svg' },
  { category: 'video', format: 'mp4' },
  { category: 'video', format: 'mkv' },
  { category: 'document', format: 'pdf' },
  { category: 'document', format: 'xlsx' },
  { category: 'document', format: 'docx' },
  { category: 'document', format: 'csv' },

];
export const LINEARSCALE=[0,1]
export const LINEARSCALE1=[2,3,4,5,6,7,8,9,10]
