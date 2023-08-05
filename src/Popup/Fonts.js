
// Import React Hooks
import React, { useEffect, useState } from "react";
// Import FontAwesome Hooks
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
// Import Mui Component Hooks
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  Avatar,
  Tooltip,
} from "@mui/material";
// Import Mui icons
import ControlPointIcon from "@mui/icons-material/ControlPoint";
// Import Font Awesome Css
import "@fortawesome/fontawesome-svg-core/styles.css";
// Import Font Awesome Icons
import { fas } from "@fortawesome/free-solid-svg-icons";
// Add All icons To Library
library.add(fas);

const IconSelector = ({ FontsChange, value }) => {
  // State for managing dialog visibility, selected icon, and search query
  const [open, setOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(value);
  const [searchQuery, setSearchQuery] = useState("");
  // Function to open the dialog
  const handleOpenDialog = () => {
    setOpen(true);
  };

  // Function to close the dialog
  const handleCloseDialog = () => {
    setOpen(false);
  };

  // Function to handle icon selection
  const handleIconSelect = (iconName) => {
    setSelectedIcon(iconName);
    handleCloseDialog();
  };

  // Function to handle search query change
  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter the available icons based on the search query
  const filteredIcons = Object.keys(library.definitions.fas).filter(
    (iconName) => iconName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Call the FontsChange callback when the selectedIcon changes
  useEffect(() => {
    if (FontsChange) {
      FontsChange(selectedIcon);
    }
  }, [selectedIcon]);
  useEffect(() => {
    if (value) {
      setSelectedIcon(value);
    }
  }, [value]);
  return (
    <div>
      {selectedIcon ? (
        // Display the selected icon as an Avatar
        <IconButton
          id="Form_Select-Icon_Button"
          onClick={handleOpenDialog}
          style={{ marginLeft: "-20%",marginTop:"35%" }}
          >
          <Avatar style={{ width: "50px", height: "50px" }}>
            <FontAwesomeIcon
              style={{
                width: "30px",
                height: "30px",
              }} 
              icon={selectedIcon}
            />
          </Avatar>
        </IconButton>
      ) : (
        // Display a default avatar (ControlPointIcon) as an IconButton
        <Tooltip title="Add Icon">
          <IconButton
            onClick={handleOpenDialog}
            id="Form_Select-Icon_Button"
            style={{ marginLeft: "-20%",marginTop:"35%" }}
            >
            <Avatar style={{ width: "50px", height: "50px" }}>
              <ControlPointIcon style={{ fontSize: "40px" }} />
            </Avatar>
          </IconButton>
        </Tooltip>
      )}

      <Dialog open={open} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>
          <TextField
            label="Search Icon"
            id="Form_Search-Icon_Button"
            value={searchQuery}
            size="small"
            onChange={handleSearchQueryChange}
            fullWidth
          />
        </DialogTitle>
        <DialogContent>
          {/* Display the filtered icons as IconButtons */}
          {filteredIcons.map((iconName, index) => (
            <IconButton
              key={iconName}
              onClick={() => handleIconSelect(iconName)}
            >
              <FontAwesomeIcon
                id={`Form_Search-Icon_Button${index}`}
                icon={iconName}
              />
            </IconButton>
          ))}
        </DialogContent>
        <DialogActions>
          {/* Cancel button to close the dialog */}
          <Button
            onClick={handleCloseDialog}
            color="primary"
            id="Form_Icon-Cancel_Button"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default IconSelector;
