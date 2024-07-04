import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
  IconButton,
} from "@mui/material";
import "./forgot.css";
import logo from "../../assets/images/logo.png";
import styled from "@emotion/styled";
import MailIcon from "@mui/icons-material/Mail";
import { useForm } from "react-hook-form";
import { useForgetMutation } from "../../redux/services/forgot.service";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { forgotPasswordSchema } from "../../validations/forgotPassword/ForgotPassword";
import { Formik } from "formik";
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
const ForgotPassword = () => {
  const [loginData, setLoginData] = useState({});
  const [forget, { isLoading }] = useForgetMutation();

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
    const res = await forget(values);
    console.log(res);
    if (res?.data?.status) {
      navigate("/reset");
    }
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
            Forget Password
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
            validationSchema={forgotPasswordSchema}
          >
            {({ errors, handleSubmit, values, handleChange, touched }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <Typography sx={{ mt: 2 }}>Enter Your Email</Typography>
                  <CssTextField
                    type="email"
                    id="email"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                    sx={{
                      width: { xs: "90%", sm: "560px" },
                      height: "60px",
                      marginTop: "20px",
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MailIcon sx={{ color: "#9277F780" }} />
                        </InputAdornment>
                      ),
                    }}
                    placeholder="Enter Your Email"
                  />
                  {errors.email && (
                    <Typography variant="body2" sx={{ color: "red" }}>
                      {errors.email}
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

export default ForgotPassword;
