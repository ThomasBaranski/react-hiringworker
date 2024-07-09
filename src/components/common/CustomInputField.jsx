import React from "react";
import {
  Box,
  IconButton,
  InputLabel,
  MenuItem,
  Typography,
} from "@mui/material";
import { useField } from "formik";
import CssTextField from "./CssTextField";
import { useFormikContext } from "formik";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

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
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);

  const [showPassword, setShowPassword] = React.useState(false);
  const [date, setDate] = React.useState(null);
  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleChangeDate = (date) => {
    // Ensure date is in YYYY-MM-DD format
    setDate(date);
    const formattedDate = date ? dayjs(date).format("YYYY-MM-DD") : "";
    setFieldValue(props.name, formattedDate);
  };

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
      {props.name === "date_of_birth" ? (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            {...field}
            id={props.name}
            value={date || null}
            onChange={handleChangeDate}
            format="YYYY-MM-DD"
            defaultValue={dayjs(Date.now())}
            sx={{
              width: "100%",
              borderColor: "#9277F7",
              border: "3px solid #9277F7",
              borderRadius: "16px",
              height: "53px",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "&:hover fieldset": {
                border: "none",
              },
              "&:focus fieldset": {
                border: "none",
              },
            }}
            error={meta.touched && Boolean(meta.error)}
            helperText={meta.touched && meta.error ? meta.error : ""}
            variant="outlined"
          />
        </LocalizationProvider>
      ) : (
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
          inputProps={{
            ...(props.name === "phoneNumber" && { maxLength: 13 }),
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
                  props.name === "username"
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
                    ? props.name === "username"
                      ? option?.user?.first_name +
                        " " +
                        option?.user?.last_name +
                        " " +
                        "(" +
                        option?.user?.username +
                        ")"
                      : option?.name
                    : props.name === "username"
                    ? option?.user?.username
                    : option?.name}
                </Typography>
              </MenuItem>
            ))}
        </CssTextField>
      )}

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
