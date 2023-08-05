{
  /*File: Excel.js
   Objective: The objective of the page defines exports data to an Excel file using the XLSX library.
   The Excel function takes several parameters: rowData3, rowData, title, and Column. Here's an explanation of the code:
    It imports the moment library to get the current date in the desired format.
    The function determines the data to be used for Excel export. If rowData3 has elements,
    it assigns rowData3 to the data variable; otherwise, it assigns rowData.
    It then maps over the data array and merges each object's asset_attributes property with the rest of the properties using the spread operator.
    A new workbook is created using XLSX.utils.book_new().
    A new worksheet (ws) is created using XLSX.utils.json_to_sheet(data, { origin: "A1" }).
    The origin option specifies the starting cell for the data.
    The column names are added as a row at the beginning of the worksheet using XLSX.utils.sheet_add_aoa(ws, [Column], { origin: "A1" }).
    The Column parameter is expected to be an array containing the column names.
    The worksheet is appended to the workbook using XLSX.utils.book_append_sheet(workbook, ws, "SheetName").
    You can replace "SheetName" with the desired name for the worksheet.
    
    Finally, the Excel file is generated and downloaded using XLSX.writeFile(workbook, title + "-" + newdate + ".xlsx").
    The file name will be constructed based on the title parameter and the current date.
    The Excel function can be exported and used in other parts of the code to generate and download Excel files based on the provided data and column names
*/
}
// Import React
import React from "react";
// Import sheetjs-style Component Hook
import XLSX from "sheetjs-style";
// Import Moment Component Hook
import moment from "moment-timezone";
// Define the Excel component Function
const Excel = (rowData3, rowData, title, Column) => {
  // Get the current date in the desired format
  let newdate = moment(new Date()).format("DD-MMM-YYYY");

  // Determine the data to be used for Excel export
  var data = rowData3.length > 0 ? rowData3 : rowData; // Assigns the value of `rowData3` to `data` if it has a length greater than 0, otherwise assigns `rowData`
  data = data.map((asset) => ({
    // Maps each item in `data` array and creates a new object
    ...asset, // Spreads the properties of the `asset` object into the new object
    ...asset.asset_attributes, // Spreads the properties of the `asset_attributes` object (inside `asset`) into the new object
  }));
  for (let i = 0; i < data.length; i++) {
    // Iterates over each item in the `data` array
    data[i].x = data[i].over_speed; // Assigns the value of `over_speed` property to the `x` property of each item
  }
  data = data.map(
    ({
      // Maps each item in `data` array and creates a new object, excluding specific properties
      asset_attributes, // Ignores the `asset_attributes` property
      ipss_asset_id, // Ignores the `ipss_asset_id` property
      parent_id, // Ignores the `parent_id` property
      description, // Ignores the `description` property
      asset_type, // Ignores the `asset_type` property
      asset_role, // Ignores the `asset_role` property
      over_speed, // Ignores the `over_speed` property
      ...rest // Rest operator to capture all remaining properties into `rest`
    }) => rest
  ); // Assigns the new object (excluding the specified properties) to `data`

  // Create a new workbook
  var workbook = XLSX.utils.book_new();

  // Create a new worksheet
  var ws = XLSX.utils.json_to_sheet(data, { origin: "A1" });

  // Adding the column names as a row at the beginning
  XLSX.utils.sheet_add_aoa(ws, [Column], { origin: "A1" });

  // Append the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, ws, "SheetName");

  // Generate the Excel file and download it
  XLSX.writeFile(workbook, title + "-" + newdate + ".xlsx");
};
export default Excel;
