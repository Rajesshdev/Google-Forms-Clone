
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
