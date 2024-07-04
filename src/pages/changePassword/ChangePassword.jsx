import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
  IconButton,
} from "@mui/material";
// import "./forgot.css";
import logo from "../../assets/images/logo.png";
import styled from "@emotion/styled";
import { LoadingButton } from "@mui/lab";
import { Formik } from "formik";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import { useForm } from "react-hook-form";
// import { useForgetMutation } from "../../redux/services/forgot.service";
// import { useNavigate } from "react-router-dom";
// import { LoadingButton } from "@mui/lab";

import { changePasswordSchema } from "../../validations/changePassword/ChangePaasword";
import { useFildAllMutation } from "../../redux/services/changePassword.services";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "green",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "16px ",
    "& fieldset": {
      borderColor: "#9277F7",
    },
    "&:hover fieldset": {
      borderColor: "#9277F7",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#9277F7",
    },
    input: {
      "&::placeholder": {
        textOverflow: "ellipsis !important",
        color: "blue",
      },
    },
  },
});
const initialValues = {
  old_password: "",
  new_password: "",
  confirm_new_password: "",
};

const ChangePassword = () => {
  const [fildAll, { isLoading }] = useFildAllMutation();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleOldPassword = () => setShowOldPassword((show) => !show);
  const handleNewPassword = () => setShowNewPassword((show) => !show);
  const handleConfirmPassword = () => setShowConfirmPassword((show) => !show);
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    // console.log("form valuesss", values);
    const res = await fildAll(values);
    console.log("Change Password", res);
    if (res?.error) {
      toast.error(res?.error?.data?.message);
    }
    if (res?.data?.data?.response_message) {
      toast.success(res?.data?.data?.response_message);
      navigate("/dashboard");
    }
  };
  const handleCopy = (e) => {
    e.preventDefault();
  };
  const handlePaste = (e) => {
    e.preventDefault();
  };
  return (
    <div className="container">
      <Box
        sx={{
          display: { md: "block", lg: "flex" },
          justifyContent: { md: "center", lg: "space-around" },
          alignItems: "center",
          minHeight: "100vh",
          height: "100%",
        }}
      >
        <Box>
          <Typography
            sx={{ fontWeight: "500", fontSize: "40px", lineHeight: "40px" }}
          >
            Change Password
          </Typography>
          <Typography
            sx={{
              fontWeight: "400",
              fontSize: "20px",
              lineHeight: "27.24px",
              mb: 4,
            }}
          >
            Lorem ipsum is simply dummy text of the printing and <br />
            typesetting industry. Lorem Ipsum has been <br /> the industry's
            standard dummy text ever since the 1500s, <br /> when an unknown
            printer took a galley of type and <br /> scrambled it to make a type
            specimen book.
          </Typography>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={changePasswordSchema}
          >
            {({ errors, handleSubmit, values, handleChange, touched }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <Typography sx={{ mt: 2 }}>Current Password</Typography>
                  <CssTextField
                    type={showOldPassword ? "text" : "password"}
                    id="old_password"
                    name="old_password"
                    onChange={handleChange}
                    onCopy={handleCopy}
                    value={values.old_password}
                    sx={{
                      width: { xs: "90%", sm: "560px" },
                      height: "60px",
                      marginTop: "20px",
                    }}
                    placeholder="Enter Your Email"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleOldPassword}
                            edge="end"
                          >
                            {showOldPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {errors.old_password && (
                    <Typography variant="body2" sx={{ color: "red" }}>
                      {errors.old_password}
                    </Typography>
                  )}
                  <Typography sx={{ mt: 3 }}>
                    {" "}
                    Enter Your New Password
                  </Typography>
                  <CssTextField
                    type={showNewPassword ? "text" : "password"}
                    id="new_password"
                    name="new_password"
                    onChange={handleChange}
                    onCopy={handleCopy}
                    onPaste={handlePaste}
                    value={values.new_password}
                    sx={{
                      width: { xs: "90%", sm: "560px" },
                      height: "60px",
                      marginTop: "20px",
                    }}
                    placeholder="Enter Your Email"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleNewPassword}
                            edge="end"
                          >
                            {showNewPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {errors.new_password && (
                    <Typography variant="body2" sx={{ color: "red" }}>
                      {errors.new_password}
                    </Typography>
                  )}
                  <Typography sx={{ mt: 3 }}>
                    Confirm Your New Password
                  </Typography>
                  <CssTextField
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirm_new_password"
                    name="confirm_new_password"
                    onChange={handleChange}
                    onPaste={handlePaste}
                    value={values.confirm_new_password}
                    sx={{
                      width: { xs: "90%", sm: "560px" },
                      height: "60px",
                      marginTop: "20px",
                    }}
                    placeholder="Enter Your Email"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleConfirmPassword}
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {errors.confirm_new_password && (
                    <Typography variant="body2" sx={{ color: "red" }}>
                      {errors.confirm_new_password}
                    </Typography>
                  )}
                  <br />
                  <LoadingButton
                    variant="contained"
                    sx={{
                      backgroundColor: "#594DA0",
                      width: { xs: "90%", sm: "560px" },
                      height: "60px",
                      borderRadius: "16px",
                      marginTop: "20px",
                      "&:hover": {
                        backgroundColor: "#594DA0",
                      },
                    }}
                    type="submit"
                    loading={isLoading}
                  >
                    Submit
                  </LoadingButton>
                </form>
              );
            }}
          </Formik>
        </Box>
        <Box>
          <img src={logo} />
        </Box>
      </Box>
    </div>
  );
};

export default ChangePassword;
