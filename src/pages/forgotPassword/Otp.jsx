import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import "./forgot.css";
import logo from "../../assets/images/logo.png";
import styled from "@emotion/styled";
import MailIcon from "@mui/icons-material/Mail";
import { useForm } from "react-hook-form";
import { useForgetMutation } from "../../redux/services/forgot.service";
import { Link, useNavigate } from "react-router-dom";
import { LockClockOutlined, SendOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

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
const Otp = () => {
  const [loginData, setLoginData] = useState({});
  const [forget] = useForgetMutation();
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
    // const res = await forget(values);
    // console.log(res);
    // if (res?.data?.status) {
    //   navigate("/otp");
    // }
    console.log(values);
    if (values) {
      navigate("/reset");
    } else {
      navigate("/otp");
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
              name="email"
              onChange={handleChange}
              sx={{
                width: { xs: "100%", sm: "560px" },
                height: "60px",
                marginTop: "20px",
              }}
              placeholder="Enter Your Code"
              {...register("email", { required: "Required" })}
            />
            {errors.email?.type === "required" && (
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
                mt: 2,
              }}
            >
              I didn,t get varification code
            </Typography>
            <Button
              variant="outlined"
              sx={{
                fontWeight: "700",
                fontSize: "16px",
                width: "320px",
                height: "20px",
                lineHeight: "21.79px",
                color: "#9277F7",
                mt: 2,
              }}
              component={Link}
              endIcon={<SendOutlined />}
            >
              Resend Varification code
            </Button>

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
              // loading={isLoading}
            >
              Verify Otp
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

export default Otp;
