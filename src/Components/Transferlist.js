{
  /*File: Forms Template.js
   Objective: 
   The objective of the page TransferList component is to create a UI component that allows users to transfer items between two lists using checkboxes.
   It provides a visually appealing interface for selecting and moving items from one list to another.
   
   Here are the more detailed objectives of the TransferList component:

   Flexibility and Customization: 
   The component accepts leftdata and rightdata as props, representing the initial items in the left and right lists, respectively.
   It also receives a values prop, which specifies the field name to be displayed as the primary text for each item in the lists.
   This flexibility allows the component to be used with different sets of data and customize the displayed information based on the application's needs.
  
   Interactive Checkbox Functionality: 
   The component renders checkboxes for each item in the lists, allowing users to select one or more items.
   It keeps track of the checked items using the checked state.
   Clicking on an item's checkbox triggers the handleToggle function, which toggles the checked state of the corresponding item.

   Transfer of Items: 
   The component provides buttons labeled "Assign" and "Deassign" to move the selected items between the left and right lists. 
   Clicking the "Assign" button (handleCheckedRight function) adds the checked items from the left list to the right list,
   while clicking the "Deassign" button (handleCheckedLeft function) moves the checked items from the right list back to the left list. 
   The items are updated in the respective state variables (left and right), and the checked items are removed from the checked state.

   Dynamic List Updates: 
   The component listens for changes in the leftdata and rightdata props and updates the corresponding lists accordingly. 
   If the parent component updates the leftdata or rightdata prop, the component's state variables left and right are updated to reflect the changes. 
   This enables the component to respond to changes in the underlying data and keep the UI in sync.

   Parent Component Integration:
    The component provides a way to communicate the items on the right side back to the parent component through the data prop. 
    When the items on the right side change, the component triggers the data prop function, passing the updated items as an argument. 
    This allows the parent component to access and utilize the selected items for further processing or updating the application state.

   Responsive and Aesthetic UI: 
   The component utilizes Material-UI components, such as Card, List, Button, and Checkbox, to create a visually appealing UI. 
   It organizes the lists and buttons in a grid layout using Grid components and applies responsive styles to ensure proper alignment 
   and spacing on different screen sizes.

By achieving these objectives, the TransferList component provides a user-friendly and interactive way for users to select and transfer items between two lists. 
It promotes reusability, customization, and integration with parent components, enhancing the overall development experience when implementing similar functionality in React applications

*/
}
// Import React Component Hooks
import React, { useEffect, useState } from "react";
// Mui component hooks
import {
  Paper,
  Grid,
  List,
  Card,
  CardHeader,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Button,
  Divider,
  TextField,
} from "@mui/material";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Form } from "antd";

// Helper function to get items in 'a' that are not present in 'b'
function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

// Helper function to get items that are common to both 'a' and 'b'
function intersection(a, b) {
  // Check if 'a' and 'b' are valid arrays before proceeding
  if (!Array.isArray(a) || !Array.isArray(b)) {
    return [];
  }

  return a.filter((value) => b.indexOf(value) !== -1);
}


// Helper function to get a union of 'a' and 'b'
function union(a, b) {
  return [...a, ...not(b, a)];
}

// TransferList component
export default function TransferList({ leftdata, rightdata, values, data, values1 }) {
  const [checked, setChecked] = useState([]); // Store the checked items
  const [left, setLeft] = useState(leftdata); // Store the items on the left side
  const [right, setRight] = useState(rightdata); // Store the items on the right side
  const leftChecked = intersection(checked, left); // Get the checked items on the left side
  const rightChecked = intersection(checked, right); // Get the checked items on the right side

  useEffect(() => {
    data(right); // Update the parent component with the items on the right side
  }, [right]);

  useEffect(() => {
    setLeft(leftdata); // Update the items on the left side
  }, [leftdata]);

  useEffect(() => {
    setRight(rightdata); // Update the items on the right side
  }, [rightdata]);

  // Toggle the checked state of an item
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value); // Add the item to checked items if it's not already checked
    } else {
      newChecked.splice(currentIndex, 1); // Remove the item from checked items if it's already checked
    }
    setChecked(newChecked);
  };

  // Get the number of checked items in a list
  const numberOfChecked = (items) => intersection(checked, items).length;

  // Toggle the checked state of all items in a list
  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items)); // Uncheck all items if all are already checked
    } else {
      setChecked(union(checked, items)); // Check all items if some or none are checked
    }
  };

  // Move checked items from left to right
  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked)); // Add checked items to the right side
    setLeft(not(left, leftChecked)); // Remove checked items from the left side
    setChecked(not(checked, leftChecked)); // Remove checked items from the checked list
  };

  // Move checked items from right to left
  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked)); // Add checked items to the left side
    setRight(not(right, rightChecked)); // Remove checked items from the right side
    setChecked(not(checked, rightChecked)); // Remove checked items from the checked list
  };

  // Render a custom list with checkboxes and search
  const customList = (title, items, text) => {
    const [searchValue, setSearchValue] = useState(""); // Store the search input value

    // Filter items based on the search value
    const filteredItems = items?.filter((value) =>
      value[values]?.toLowerCase()?.includes(searchValue?.toLowerCase()) ||
      value[values1].toLowerCase()?.includes(searchValue?.toLowerCase())
    );


    return (
      <Card component={Paper} elevation={9}>
        <CardHeader
          sx={{ px: 2, py: 1 }}
          avatar={
            <Checkbox
              onClick={handleToggleAll(filteredItems)}
              checked={
                numberOfChecked(filteredItems) === filteredItems?.length &&
                filteredItems?.length !== 0
              }
              indeterminate={
                numberOfChecked(filteredItems) !== filteredItems?.length &&
                numberOfChecked(filteredItems) !== 0
              }
              disabled={filteredItems?.length === 0}
              inputProps={{
                "aria-label": "all items selected",
              }}
            />
          }
          title={title}
          subheader={
            text === "Right"
              ? `${filteredItems?.length} Chosen`
              : `${numberOfChecked(filteredItems)}/${filteredItems?.length
              } selected`
          }
        />
        <Divider />
        <div style={{ margin: "1vh" }}>
          <Input
            // Set the input type based on the type prop value
            type={"search"}
            // Set the disabled prop based on the dis prop value
            size="large"
            // Set the style prop to customize the input's color and placeholder color
            style={{ color: "black", "::placeholder": { color: "black" } }}
            // Set the placeholder prop to display the label as a placeholder
            placeholder="Search"
            // Set the value prop to the field value
            value={searchValue}
            // Set the onChange prop to handle changes in the input value
            onChange={(e) => setSearchValue(e.target.value)}
            prefix={<SearchOutlined />}
          />
        </div>

        <List
          sx={{
            height: 300,
            bgcolor: "background.paper",
            overflow: "auto",
          }}
          dense
          component="div"
          role="list"
        >
          {filteredItems?.map((value) => {
            const labelId = `transfer-list-all-item-${value}-label`;
            return (
              <ListItem
                key={value}
                role="listitem"
                onClick={handleToggle(value)}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{
                      "aria-labelledby": labelId,
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  id={labelId}
                  primary={values1 && value[values1]!==" " ? value[values] + " - " + value[values1] : value[values]}
                />
              </ListItem>
            );
          })}
        </List>
      </Card>
    );
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", alignItems: "center" }}>
      <div style={{ width: "280px" }}>{customList("Select All", left)}</div>
      <div style={{ alignItems: "center" }}>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="contained"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            Assign &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="contained"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt; Deassign
          </Button>
        </Grid>
        <div>
        </div>
      </div>
      <div style={{ width: "280px" }}>{customList("Select All", right, "Right")}</div>
    </div>
  );
}
