import React, { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
const UploadComponent = (props) => {
  const formats = [
    { category: "photo", format: "jpeg" },
    { category: "photo", format: "png" },
    { category: "photo", format: "gif" },
    { category: "video", format: "mp4" },
    { category: "video", format: "mkv" },
    { category: "document", format: "pdf" },
    // { category: "document", format: "xlsx" },
    { category: "document", format: "docx" },
    { category: "document", format: "csv" },
  ];

  const [selectedFormats, setSelectedFormats] = useState(props.values);
  const handleFormatChange = (event) => {
    if (!props.disabled) {
      const { name, value, checked } = event.target;

      setSelectedFormats((prevFormats) => {
        let updatedFormats = { ...prevFormats };

        updatedFormats = {
          ...updatedFormats,
          [name]: checked
            ? [...updatedFormats[name], value]
            : updatedFormats[name].filter((format) => format !== value),
        };
        return updatedFormats;
      });
    }
  };
  useEffect(() => {
    props.setFieldValue(props.name, selectedFormats);
  }, [selectedFormats]);
  // Create a set of unique categories
  const uniqueCategories = Array.from(
    new Set(formats.map((item) => item.category))
  );

  return (
    <Paper elevation={4} style={{ width: "215px" }}>
      {uniqueCategories.map((category) => (
        <div key={category} style={{ margin: "1vh" }}>
          <Typography>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Typography>
          <FormGroup row>
            {formats
              .filter((item) => item.category === category)
              .map(({ format }) => (
                <FormControlLabel
                  key={format}
                  size="small"
                  control={
                    <Checkbox
                      size="small"
                      name={category}
                      value={format}
                      checked={
                        selectedFormats
                          ? selectedFormats[category]?.includes(format)
                          : ""
                      }
                      onChange={handleFormatChange}
                    />
                  }
                  style={{
                    display: "flex",
                    marginRight: "5px", // Adjust the value to control the gap between the checkbox and label
                  }}
                  label={
                    <Typography variant="body2" style={{ fontSize: "14px" }}>
                      {format.toUpperCase()}
                    </Typography>
                  }
                />
              ))}
          </FormGroup>
        </div>
      ))}
    </Paper>
  );
};

export default UploadComponent;
