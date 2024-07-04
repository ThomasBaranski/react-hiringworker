import {
  Box,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useField } from "formik";
import React, { useState } from "react";
import { CssTextField } from "../rolemanagement/Role";

const CustomInputField = ({
  label,
  sublabel,
  options,
  sensitive,
  placeholder,
  inputType,
  setFieldsValue,
  ...props
}) => {
  const [field, meta] = useField(props);
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Box>
      {label && (
        <InputLabel
          shrink
          htmlFor={props.name}
          sx={{ color: "black", fontWeight: "600", fontSize: "20px" }}
        >
          {label}
        </InputLabel>
      )}
      <CssTextField
        id={props.name}
        variant="outlined"
        placeholder={placeholder}
        // color="warning"
        // sx={{ color: "blue", borderRadius: "16px", backgroundColor: "blue" }}
        inputProps={{
          ...(props.name == "phoneNumber" && { maxLength: 13 }),
        }}
        InputProps={{
          disableUnderline: true,
        }}
        error={meta.touched && Boolean(meta.error)}
        {...field}
        {...props}
      >
        {props.select &&
          options &&
          options?.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <Typography variant="body2">{option.label}</Typography>
            </MenuItem>
          ))}
      </CssTextField>
    </Box>
  );
};

export default CustomInputField;
