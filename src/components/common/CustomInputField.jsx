import {
  Box,
  IconButton,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useField } from "formik";
import React, { useState } from "react";
import CssTextField from "./CssTextField";
import { useFormikContext } from "formik";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const CustomInputField = ({
  label,
  sublabel,
  options,
  sensitive,
  placeholder,
  inputType,
  setFieldsValue,
  useName = false,
  defaultValue = "",
  InputField = "",
  ...props
}) => {
  const [field, meta] = useField(props);
  // console.log("meta____", props.name, meta);
  const { setFieldValue } = useFormikContext();
  // console.log("props", props);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
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
        type={sensitive ? (showPassword ? "text" : "password") : "text"}
        variant="outlined"
        placeholder={placeholder}
        SelectProps={{
          MenuProps: {
            style: {
              maxHeight: "200px",
            },
          },
        }}
        // color="warning"
        // sx={{ color: "blue", borderRadius: "16px", backgroundColor: "blue" }}
        inputProps={{
          ...(props.name == "phoneNumber" && { maxLength: 13 }),
        }}
        InputProps={{
          disableUnderline: true,
          ...(sensitive && {
            endAdornment: (
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? (
                  <VisibilityOff opacity={0.8} />
                ) : (
                  <Visibility opacity={0.8} />
                )}
              </IconButton>
            ),
          }),
        }}
        error={meta.touched && Boolean(meta.error)}
        {...field}
        {...props}
      >
        {props.select &&
          options?.length > 0 &&
          options?.map((option) => (
            <MenuItem
              key={option?.id}
              value={
                props.name == "username"
                  ? option?.user?.username
                  : useName
                  ? option?.name
                  : option?.id
              }
              disabled={option?.disabled}
            >
              {/* show the first name and last name if the input is the role_assign */}
              <Typography variant="body2" textTransform="capitalize">
                {InputField === "role_assign"
                  ? props.name == "username"
                    ? option?.user?.first_name +
                      " " +
                      option?.user?.last_name +
                      " " +
                      "(" +
                      option?.user?.username +
                      ")"
                    : option?.name
                  : props.name == "username"
                  ? option?.user?.username
                  : option?.name}
              </Typography>
            </MenuItem>
          ))}
      </CssTextField>
      {meta.touched && Boolean(meta.error) && (
        <Typography
          variant="body2"
          sx={{
            marginLeft: "10px",
            marginY: "5px",
            color: "red",
          }}
        >
          {meta.touched && meta.error}
        </Typography>
      )}
    </Box>
  );
};

export default CustomInputField;
