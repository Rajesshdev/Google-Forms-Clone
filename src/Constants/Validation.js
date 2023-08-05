
// Import Yub Hook
import * as Yup from "yup";
// Import uuid form Id Generator
import { v4 as uuidv4 } from "uuid";
export const FormvalidationSchema = Yup.object().shape({
  title: Yup.string().trim().required("Field is required"),
  form_order: Yup.number().nullable(),
  description: Yup.string().trim().required("Field is required"),
  form_type_id: Yup.number(),
  attribute: Yup.object().shape({
    icon_name: Yup.string().trim(),
    icon_pack: Yup.string().trim(),
  }),
  form_fields: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().trim().required("Field is required"),
      field_type: Yup.string().trim(),
      report_title: Yup.string().when(
        "field_attributes.field_type",
        (fieldType, schema) => {
          if (
            !fieldType.includes("Heading") &&
            !fieldType.includes("Subheading")
          ) {
            return schema.trim().required("Field is required");
          }
          return schema.trim();
        }
      ),
      unique_id: Yup.string().trim(),
      form_order: Yup.number(),
      is_required: Yup.boolean(),
      validation: Yup.boolean(),
      field_attributes: Yup.object().shape({
        options: Yup.array().of(
          Yup.object().shape({
            option: Yup.string().when(
              "field_attributes.field_type",
              (fieldType, schema) => {
                if (
                  !fieldType.includes("RadioButton") &&
                  !fieldType.includes("Dropdown")&&
                  !fieldType.includes("Checkbox") 

                ) {
                  return schema.trim().required("Field is required");
                }
                return schema.trim();
              }
            ),
            upload: Yup.object()
              .shape({
                photo: Yup.array(),
                video: Yup.array(),
                document: Yup.array(),
              })
              .test(
                "has-file",
                "At least one of photo, video, or document is required",
                function (value) {
                  const { photo, video, document } = value;
                  const imageUpload = this.parent.image_upload === "Upload";

                  if (
                    imageUpload &&
                    !photo.length &&
                    !video.length &&
                    !document.length
                  ) {
                    return this.createError({
                      path: "",
                      message: "Select upload file format",
                    });
                  }
                  return true;
                }
              )
              .defined(),
            image_upload: Yup.string(),
            no_upload: Yup.number(),
            uploadlabel: Yup.string().when(
              "image_upload",
              (fieldType, option, value) => {
                if (!fieldType.includes("Upload")) {
                  return Yup.string();
                }
                return Yup.string().trim().required("Field is required");
              }
            ),
            type: Yup.string(),
            label: Yup.string().when("remark", (fieldType, option, value) => {
              if (!fieldType.includes("Remark")) {
                return Yup.string();
              }
              return Yup.string().trim().required("Field is required");
            }),
            remark: Yup.string().trim(),
            uniqueId: Yup.string().trim(),
          })
        ),
        row:Yup.array().of(
          Yup.object().shape({
            option: Yup.string().trim(),
            uniqueId: Yup.string(),
          })
        ),
        complaints: Yup.string().trim(),
        asset_type: Yup.string(),
        asset_label: Yup.string().when(
          "asset_type",
          (fieldType, option, value) => {
            if (!fieldType.includes("asset_type")) {
              return Yup.string();
            }
            return Yup.string().trim().required("Field is required");
          }
        ),
        asset_type_id: Yup.string().when(
          "asset_type",
          (fieldType, option, value) => {
            if (!fieldType.includes("asset_type")) {
              return Yup.string().nullable();
            }
            return Yup.string().nullable().required("Field is required");
          }
        ),
        validations: Yup.object().shape({
          regex: Yup.string()
            .trim()
            .when("type", (fieldType, option, value, schema) => {
              if (!fieldType.includes("Regex")) {
                return Yup.string().trim();
              }
              return Yup.string().required("Field is required").trim();
            }),
          value: Yup.string().trim(),
          method: Yup.string().trim(),
          Linearstart: Yup.number(),
          Linearend: Yup.number(),
          Linearstart_label: Yup.string().trim(),
          Linearend_label: Yup.string().trim(),
          errorText: Yup.string().trim(),
          type: Yup.string().trim(),
          min: Yup.number()
            .typeError("Must be number")
            .when("type", (fieldType, option, value) => {
              if (!fieldType.includes("Numeric")) {
                return Yup.number().typeError("Must be number");
              }
              return Yup.number()
                .typeError("Must be number")
                .required("Field is required");
            }),
          max: Yup.number()
            .typeError("Must be number")
            .when("value", (fieldType, option, value) => {
              if (!fieldType.includes("Min-Max")) {
                return Yup.number().typeError("Must be number");
              }
              return Yup.number()
                .typeError("Must be number")
                .required("Field is required");
            }),
          errorText: Yup.string().trim(),
          regex_type: Yup.string().trim(),
          allowed_file_types: Yup.object()
          .shape({
            photo: Yup.array(),
            video: Yup.array(),
            document: Yup.array(),
          })
          .when("field_type", (fieldType, schema) => {
            return schema.test(
              "imageUpload",
              "Select upload file format",
              function (value) {
         
                
                if (!value.photo.length && !value.video.length && !value.document.length) {
                  return this.createError({
                    path: "",
                    message: "At least one of photo, video, or document is required",
                  });
                }
                
                return true;
              }
            )
          })
          .defined(),
        }),
      }),
    })
  ),
});
export const FormValues = {
  title: "",
  description: "",
  form_type_id: 1,
  attribute: {
    icon_name: "cloud",
    icon_pack: "FontAwesome",
  },
  form_fields: [
    {
      title: "",
      report_title: "",
      unique_id: uuidv4(),
      form_order: 0,
      description: "",
      is_required: false,
      validation: true,
      field_attributes: {
        options: [
          {
            option: "Yes",
            uniqueId: uuidv4(),
            upload: {
              photo: [],
              video: [],
              document: [],
            },
            no_upload: 1,
            image_upload: "",
            remark: "Remark",
            label: "Remarks",
            uploadlabel: "Upload",
            type: "Optional",
          },
          {
            option: "No",
            uniqueId: uuidv4(),
            remark: "Remark",
            upload: {
              photo: [],
              video: [],
              document: [],
            },
            no_upload: 1,
            image_upload: "",
            label: "Remarks",
            uploadlabel: "Upload",
            type: "Optional",
          },
        ],
        row: [
          {
            option: "Row label",
            uniqueId: uuidv4(),
          },
        ],
        asset_type: "",
        asset_label: "Asset Question",
        Linearstart: 0,
        Linearend: 2,
        Linearstart_label: "",
        Linearend_label: "",
        asset_type_id: null,
        complaints: "",
        field_type: "ShortAnswer",
        validations: {
          regex: "^[A-Z]{5}[0-9]{4}[A-Z]$",
          value: "Pan No",
          method: "Regex",
          errorText: "",
          min: "",
          max: "",
          type: "Special characters",
          allowed_file_types: {
            photo: ["jpeg"],
            video: [],
            document: [],
          },
        },
      },
    },
  ],
};
export const AllocateConfigureSchema = Yup.object().shape({
  assert_types_id: Yup.number().nullable().required("Field is required"),
  assign_assert_types_id: Yup.number().nullable().required("Field is required"),
  attributes: Yup.object().shape({
    Mapping_type: Yup.string().required("Field is required"),
  }),
});
export const AllocateConfigureValues = {
  assert_types_id: null,
  assign_assert_types_id: null,
  attributes: {
    Mapping_type: "One to One",
  },
};