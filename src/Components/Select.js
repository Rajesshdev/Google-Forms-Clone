
// Import React Hooks
import React, { useEffect, useState } from "react";
// Import uuid form Id Generator
import { v4 as uuidv4 } from "uuid";
// Import Mui component Hooks
import {
  Select,
  MenuItem,
  TextField,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
// Import Mui icons
import {
  ShortText,
  Notes,
  RadioButtonChecked,
  CheckBoxOutlined,
  ArrowDropDownCircleOutlined,
  BackupOutlined,
  Event,
  Schedule,
  Toc,
  Subject,
  LinearScale,
  Apps,
} from "@material-ui/icons";
import Checklist from "@mui/icons-material/Checklist";
// Import React Icons
import { TiSortNumerically } from "react-icons/ti";
import { GoChecklist } from "react-icons/go";
import { VscChecklist } from "react-icons/vsc";
import { TbGridDots } from "react-icons/tb";
/*Function Initialization */
const CustomSelect = (props) => {
  // State variable to hold the selected value
  const [selct, setSelect] = useState(props.values);

  // useEffect hook to listen for changes in the selected value and invoke props.onChanges if it exists
  useEffect(() => {
    if (props?.onChanges) {
      props?.onChanges(selct);
      props.setFieldValue(props.name3, "")
      if (selct === "Yes/No Question" || selct === "Advanced Yes/No Question") {
        props.setFieldValue(props.name, "Yes");
        if (!props.disable) {
          props.setFieldValue(props.options, [
            {
              option: "Yes",
              uniqueId: uuidv4(),
              no_upload: 1,
              upload: {
                photo: [],
                video: [],
                document: [],
              },
              image_upload: "",
              remark: "Remark",
              label: "Remarks",
              type: "Optional",
              uploadlabel: "Upload",
            },
            {
              option: "No",
              uniqueId: uuidv4(),
              no_upload: 1,
              remark: "Remark",
              image_upload: "",
              uploadlabel: "Upload",
              upload: {
                photo: [],
                video: [],
                document: [],
              },
              label: "Remarks",
              type: "Optional",
            },
         
          ]);
        }
      }
    }
    if (selct === "Numeric") {
      props.setFieldValue(props.name1, "Numeric");
      props.setFieldValue(props.name3, "Regex")
      props.setFieldValue(props.name2, "Min");
    }
    if (selct === "ShortAnswer") {
      props.setFieldValue(props.name1, "Special characters");
      props.setFieldValue(props.name2, "Pan No");
      props.setFieldValue(props.name3, "Regex")
    }
    if(selct!=="ImageUpload"){
      props.setFieldValue(props.name4,   {
        photo: ["jpeg"],
        video: [],
        document: [],
      })
    }
  }, [selct]);

  // useEffect hook to update the selected value when props.values changes
  useEffect(() => {
    setSelect(props.values);
  }, [props]);
  return (
    <TextField
      select
      id={props.id}
      inputProps={{ readOnly: props.disable }}
      size="small"
      value={selct}
      onChange={(e) => setSelect(e.target.value)}
      fullWidth
    >
      {/* MenuItems representing different options */}
      <MenuItem value="ShortAnswer">
        {/* Icon and label for Short Answer */}
        <div style={{ display: "flex" }}>
          <ListItemIcon>
            <ShortText />
          </ListItemIcon>
          <ListItemText
            style={{ marginTop: "0%", marginLeft: "-1%" }}
            primary="Short Answer"
          />
        </div>
      </MenuItem>
      <MenuItem value="LongAnswer">
        {/* Icon and label for Long Answer */}
        <div style={{ display: "flex" }}>
          <ListItemIcon>
            <Notes />
          </ListItemIcon>
          <ListItemText
            style={{ marginTop: "0%", marginLeft: "-1%" }}
            primary="Long Answer"
          />
        </div>
      </MenuItem>
      <MenuItem value="Numeric">
        {/* Icon and label for Numeric */}
        <div style={{ display: "flex" }}>
          <ListItemIcon>
            <TiSortNumerically />
          </ListItemIcon>
          <ListItemText
            style={{ marginTop: "0%", marginLeft: "-1%" }}
            primary="Numeric"
          />
        </div>
      </MenuItem>
      {/* Divider separating the options */}
      <Divider variant="middle" style={{ margin: "1vh" }} />
      <MenuItem value="Heading">
        {/* Icon and label for Heading */}
        <div style={{ display: "flex" }}>
          <ListItemIcon>
            <Toc />
          </ListItemIcon>
          <ListItemText
            style={{ marginTop: "0%", marginLeft: "-1%" }}
            primary="Heading"
          />
        </div>
      </MenuItem>
      <MenuItem value="Subheading">
        {/* Icon and label for Subheading */}
        <div style={{ display: "flex" }}>
          <ListItemIcon>
            <Subject />
          </ListItemIcon>
          <ListItemText
            style={{ marginTop: "0%", marginLeft: "-1%" }}
            primary="Sub Heading"
          />
        </div>
      </MenuItem>
      {/* Divider separating the options */}
      <Divider variant="middle" style={{ margin: "1vh" }} />
      <MenuItem value="Checkbox">
        {/* Icon and label for Checkbox */}
        <div style={{ display: "flex" }}>
          <ListItemIcon>
            <CheckBoxOutlined />
          </ListItemIcon>
          <ListItemText
            style={{ marginTop: "0%", marginLeft: "-1%" }}
            primary="Checkbox"
          />
        </div>
      </MenuItem>
      <MenuItem value="RadioButton">
        {/* Icon and label for Radio Button */}
        <div style={{ display: "flex" }}>
          <ListItemIcon>
            <RadioButtonChecked />
          </ListItemIcon>
          <ListItemText
            style={{ marginTop: "0%", marginLeft: "-1%" }}
            primary="Radio Button"
          />
        </div>
      </MenuItem>
      <MenuItem value="Dropdown">
        {/* Icon and label for Dropdown */}
        <div style={{ display: "flex" }}>
          <ListItemIcon>
            <ArrowDropDownCircleOutlined />
          </ListItemIcon>
          <ListItemText
            style={{ marginTop: "0%", marginLeft: "-1%" }}
            primary="Dropdown"
          />
        </div>
      </MenuItem>
      <MenuItem value="Yes/No Question">
        {/* Icon and label for Radio Buttons */}
        <div style={{ display: "flex" }}>
          <ListItemIcon>
            <GoChecklist
              style={{ fontSize: "20px", fontWeight: 600, marginLeft: "7%" }}
            />
          </ListItemIcon>
          <ListItemText
            style={{ marginTop: "0%", marginLeft: "-1%" }}
            primary="Yes/No Question"
          />
        </div>
      </MenuItem>
      {/* Divider separating the options */}
      <Divider variant="middle" style={{ margin: "1vh" }} />
      <MenuItem value="Linear scale">
        {/* Icon and label for Checkbox */}
        <div style={{ display: "flex" }}>
          <ListItemIcon>
            <LinearScale />
          </ListItemIcon>
          <ListItemText
            style={{ marginTop: "0%", marginLeft: "-1%" }}
            primary="Linear scale"
          />
        </div>
      </MenuItem>
      <MenuItem value="Multiple choice grid">
        {/* Icon and label for Checkbox */}
        <div style={{ display: "flex" }}>
          <ListItemIcon>
            <TbGridDots
              style={{ fontSize: "22px", fontWeight: 600, marginLeft: "3%" }}
            />
          </ListItemIcon>
          <ListItemText
            style={{ marginTop: "0%", marginLeft: "-1%" }}
            primary="Multiple choice grid"
          />
        </div>
      </MenuItem>
      <MenuItem value="Checkbox grid">
        {/* Icon and label for Checkbox */}
        <div style={{ display: "flex" }}>
          <ListItemIcon>
            <Apps />
          </ListItemIcon>
          <ListItemText
            style={{ marginTop: "0%", marginLeft: "-1%" }}
            primary="Checkbox gird"
          />
        </div>
      </MenuItem>
      {/* Divider separating the options */}
      <Divider variant="middle" style={{ margin: "1vh" }} />
      <MenuItem value="DateTime">
        {/* Icon and label for Date Time */}

        <div style={{ display: "flex" }}>
          <ListItemIcon>
            <Event />
          </ListItemIcon>
          <ListItemText
            style={{ marginTop: "0%", marginLeft: "-1%" }}
            primary="Date Time"
          />
        </div>
      </MenuItem>
      <MenuItem value="DateOnly">
        {/* Icon and label for Date */}
        <div style={{ display: "flex" }}>
          <ListItemIcon>
            <Event />
          </ListItemIcon>
          <ListItemText
            style={{ marginTop: "0%", marginLeft: "-1%" }}
            primary="Date"
          />
        </div>
      </MenuItem>
      <MenuItem value="Time">
        {/* Icon and label for Time */}
        <div style={{ display: "flex" }}>
          <ListItemIcon>
            <Schedule />
          </ListItemIcon>
          <ListItemText
            style={{ marginTop: "0%", marginLeft: "-1%" }}
            primary="Time"
          />
        </div>
      </MenuItem>
      {/* Divider separating the options */}
      <Divider variant="middle" style={{ margin: "1vh" }} />
      <MenuItem value="ImageUpload">
        {/* Icon and label for File Upload */}
        <div style={{ display: "flex" }}>
          <ListItemIcon>
            <BackupOutlined />
          </ListItemIcon>
          <ListItemText
            style={{ marginTop: "0%", marginLeft: "-1%" }}
            primary="File Upload"
          />
        </div>
      </MenuItem>
    </TextField>
  );
};
export default CustomSelect;
