
import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { liveApi } from "../../service/Service";
import { Button } from "@material-ui/core";
import { createStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alertpopup from "./Alert";
const DocumentUploader = ({ title, onVideoUploaded }) => {
  const fileChoose1 = useRef(null); // Create a reference to access the file input element
  const [loading, setLoading] = useState(false); // State variable for tracking loading state
  const [stage, setStage] = useState("init"); // State variable for tracking the stage of file upload
  const [fileErrors, setFileErrors] = useState([]); // State variable for storing file upload errors
  const api = liveApi(); // Call a function to get an API instance
  const [success, setSuccess] = useState(false); // State variable for tracking success state
  const [open, setOpen] = useState(false); // State variable for controlling the visibility of a popup
  const [popupdata, setPopupdata] = useState(
    " Invalid file format. Only “pdf and images” formats allowed"
  ); // State variable for storing popup data
  const [popupdata1, setPopupdata1] = useState(); // State variable for storing additional popup data

  const handleClose = () => {
    setOpen(false); // Close the popup
    setPopupdata1(); // Clear additional popup data
    setFileErrors([]); // Clear file upload errors
  };

  const allow = () => {
    setOpen(false); // Close the popup
    setPopupdata1(); // Clear additional popup data
    setFileErrors([]); // Clear file upload errors
  };

  const useStyles = makeStyles(() =>
    createStyles({
      fabProgress: {
        color: green[500],
        position: "absolute",
        width: "35px",
        height: "35px",
        top: "-10px",
        left: "0",
        right: "0",
        margin: "0 auto",
        zIndex: 1,
      },
    })
  );
  const classes = useStyles(); // Apply the defined styles using makeStyles

  const onFileChoose = async () => {
    setLoading(true); // Start the loading state
    setStage("uploading"); // Set the stage to "uploading"

    if (fileChoose1.current?.files) {
      const files = Array.from(fileChoose1.current.files); // Get the selected files from the file input element
      const errors = []; // Array to store file upload errors

      for (const file of files) {
        const fileType = file.type; // Get the type of the current file

        // Check if the file type is valid
        if (
          fileType !== "application/pdf" &&
          fileType !== "image/jpeg" &&
          fileType !== "image/png"
        ) {
          errors.push(file.name); // Add the file name to the error list
        } else {
          try {
            let data = await uploadImage(file); // Upload the file and get the response data

            if (data !== null && data.media_id) {
              onVideoUploaded({
                media_id: data.media_id,
                media_key: data.media_key,
              }); // Call the provided callback function with the uploaded media information
            }
          } catch (err) {
            console.log(err);
            errors.push(file.name); // Add the file name to the error list
          }
        }
      }

      setLoading(false); // Stop the loading state
      setFileErrors(errors); // Set the file upload errors
      setStage("uploaded"); // Set the stage to "uploaded"
    }
  };

  const uploadImage = async (file) => {
    return new Promise(async (resolve, reject) => {
      api
        .post("/doc_upload/", {
          content_type: file.type,
        })
        .then((res) => {
          const formData = new FormData();

          // Append the fields from the response data to the form data
          Object.keys(res.data.data.fields).forEach((key) => {
            formData.append(key, res.data.data.fields[key]);
          });

          formData.append("file", file); // Append the file to the form data

          const xhr = new XMLHttpRequest();
          xhr.open("POST", res.data.data.url, true);
          xhr.onload = function () {
            if (this.status === 204) {
              setSuccess(true); // Set the success state
              setTimeout(() => setSuccess(false), 3000); // Reset the success state after 3 seconds
              resolve(res.data); // Resolve the promise with the response data
            } else {
              reject(null); // Reject the promise
            }
          };
          xhr.upload.onprogress = function (evt) {
            // Progress event for file upload
          };
          xhr.send(formData); // Send the form data with the file to the specified URL
        })
        .catch((err) => {
          reject(err); // Reject the promise with the error
        });
    });
  };

  return (
    <>
      <div className="docu_uploader">
        <div>
          <table>
            <tr>
              <td>
                <Button
                  disabled={loading}
                  style={{ textTransform: "none" }}
                  onClick={() => fileChoose1.current?.click()}
                  className="iIHpkQ"
                  variant="contained"
                  color="secondry"
                  component="span"
                >
                  Attach
                  <AttachFileIcon />
                  {loading && (
                    <CircularProgress
                      size={24}
                      style={{ marginTop: "15px" }}
                      className={classes.fabProgress}
                    />
                  )}
                </Button>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div className="ion-text-right" slot="end">
        <div style={{ visibility: "hidden", opacity: 0 }}>
          <input
            type="file"
            multiple
            ref={fileChoose1}
            onChange={onFileChoose}
            accept=".pdf, image/*"
            capture="camera"
          />
        </div>
        <Alertpopup
          open={fileErrors.length > 0}
          close={handleClose}
          allow={allow}
          data={popupdata}
          data1={popupdata1}
        />
      </div>
    </>
  );
};

export default DocumentUploader;
