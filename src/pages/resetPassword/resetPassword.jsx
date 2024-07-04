import React, { useState } from "react";
import {
  Box,
  Grid,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  Button,
  IconButton,
} from "@mui/material";
import "./reset.css";
import logo from "../../assets/images/logo.png";
import LockIcon from "@mui/icons-material/Lock";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useResetMutation } from "../../redux/services/reset.service";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import toast from "react-hot-toast";
import { FormatColorResetOutlined } from "@mui/icons-material";
const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "9277F7",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "9277F7",
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
    "&.Mui-focused fieldset": {
      lineHeight: "21.79px",
    },
    input: {
      "&::placeholder": {
        textOverflow: "ellipsis !important",
        color: "#9277F780",
      },
    },
  },
});
const ResetPassowrd = () => {
  const [loginData, setLoginData] = useState({});
  const [reset, { isLoading }] = useResetMutation();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const handleShowPassword = () => setShowNewPassword((show) => !show);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleConfirmPassword = () => setShowConfirmPassword((show) => !show);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleChange = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = async (values) => {
    console.log(values);
    const res = await reset(values);
    console.log(res);
    if (res?.error) {
      toast.error(res?.error?.data?.message);
    }
    if (res?.data?.data?.response_message) {
      toast.success(res?.data?.data?.response_message);
      navigate("/login");
    }
  };
  const handleCopyChange = (e) => {
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
            Reset Password
          </Typography>
          <Typography
            sx={{
              fontWeight: "400",
              fontSize: "20px",
              lineHeight: "27.24px",
            }}
          >
            is simply dummy text of the printing and typesetting <br />
            industry. Lorem Ipsum has been the industry's.
          </Typography>

          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Typography
              sx={{
                fontWeight: "700",
                fontSize: "16px",
                lineHeight: "21.79px",
                color: "#9277F7",
              }}
            >
              Enter Your Otp
            </Typography>
            <CssTextField
              name="verification_key"
              onChange={handleChange}
              sx={{
                width: { xs: "90%", sm: "560px" },
                height: "60px",
                marginTop: "20px",
              }}
              placeholder="Enter Your verification key"
              {...register("verification_key", { required: "Required" })}
            />
            {errors.verification_key?.type === "required" && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "start",
                  width: "560px",
                }}
              >
                <p style={{ color: "red" }}>This field is required</p>
              </Box>
            )}
            <Typography
              sx={{
                fontWeight: "700",
                fontSize: "16px",
                lineHeight: "21.79px",
                color: "#9277F7",
              }}
            >
              Enter Your New Password
            </Typography>
            <CssTextField
              name="new_password"
              onChange={handleChange}
              onCopy={handleCopyChange}
              type={showNewPassword ? "text" : "password"}
              sx={{
                width: { xs: "90%", sm: "560px" },
                height: "60px",
                marginTop: "20px",
              }}
              placeholder="Enter Your Password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: "#9277F780" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleShowPassword}
                      edge="end"
                    >
                      {showNewPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              {...register("new_password", { required: true })}
            />
            {errors.new_password?.type === "required" && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "start",
                  width: "560px",
                }}
              >
                <p style={{ color: "red" }}>This field is required</p>
              </Box>
            )}
            <Typography
              sx={{
                fontWeight: "700",
                fontSize: "16px",
                lineHeight: "21.79px",
                color: "#9277F7",
              }}
            >
              Confirm Your New Password
            </Typography>
            <CssTextField
              name="confirm_new_password"
              type={showConfirmPassword ? "text" : "password"}
              onChange={handleChange}
              onPaste={handlePaste}
              sx={{
                width: { xs: "90%", sm: "560px" },
                height: "60px",
                marginTop: "20px",
              }}
              placeholder="Enter Your Password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: "#9277F780" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              {...register("confirm_new_password", { required: true })}
            />
            {errors.confirm_new_password?.type === "required" && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "start",
                  width: "560px",
                }}
              >
                <p style={{ color: "red" }}>This field is required</p>
              </Box>
            )}

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
        </Box>
        <Box>
          <img src={logo} />
        </Box>
      </Box>
    </div>
  );
};

export default ResetPassowrd;
