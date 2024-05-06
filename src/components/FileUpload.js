import React, { useMemo, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { Alert } from "@mui/material";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "grey",
  outline: "none",
  transition: "border .24s ease-in-out",
  width: "70%",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

export default function FileUpload() {
  const { setValue, register, formState } = useFormContext();
  const { errors } = formState;

  register("photo");

  const onDrop = useCallback(
    (acceptedFiles) => {
      // Use FileReader to read the file and convert it to base64
      const reader = new FileReader();

      reader.onload = () => {
        const base64Image = reader.result;
        setValue("photo", base64Image); // Set the base64-encoded image as the form value
      };

      // Read the uploaded file as a data URL (base64)
      reader.readAsDataURL(acceptedFiles[0]);
    },
    [setValue]
  );

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    onDrop,
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>{file.path}</li>
  ));

  const removeAll = () => {
    acceptedFiles.length = 0;
    setValue("photo", "");
  };

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <div style={{ margin: "10px" }}>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag and drop your files here, or click to select files</p>
      </div>
      {files.length > 0 && (
        <div>
          {files}
          <button onClick={removeAll}>Remove All</button>
        </div>
      )}
      {errors.photo && <Alert severity="error">{errors.photo.message}</Alert>}
    </div>
  );
}
