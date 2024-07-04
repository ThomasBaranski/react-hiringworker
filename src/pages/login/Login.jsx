import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import "./login.css";
import logo from "../../assets/images/logo.png";
import MailIcon from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";
import styled from "@emotion/styled";
import Checkbox from "@mui/material/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useLoginMutation } from "../../redux/services/login.service";
import LoadingButton from "@mui/lab/LoadingButton";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  setAllPermissions,
  setUserPermissions,
  setUserType,
  setUserinfo,
} from "../../redux/slices/permissions.slice";
import { useDispatch } from "react-redux";
import { checkViewPermission } from "../../utils/checkViewPermissions";

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
      border: "3px solid #9277F7",
    },
    "&:hover fieldset": {
      borderColor: "#9277F7",
      border: "3px solid #9277F7",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#9277F7",
    },
    input: {
      "&::placeholder": {
        textOverflow: "ellipsis !important",
        color: "#9277F780",
        fontWeight: "500",
        fontsize: "14px",
        lineHeight: "22.4px",
      },
    },
  },
});

const Summary = [
  {
    id: 1,
    // name: "Dashboard",
    // Icon: DasbIcon,
    // SelectedIcon: DasbIconFilled,
    path: "/",
  },
  {
    id: 2,
    // name: "Category",
    // Icon: Category,
    // SelectedIcon: Categoryfilled,
    path: "/category",
  },
  {
    id: 3,
    // name: "Role Management",
    // Icon: Role,
    // SelectedIcon: Rolefoto,
    path: "/role",
    children: [
      {
        key: "nested1",
        // name: "Manage Role",
        // Icon: StarBorder,
        path: "/manage",
      },
    ],
  },
  {
    id: 4,
    // name: "Staff Management",
    // Icon: Staff,
    // SelectedIcon: StaffFrame,
    path: "/staff",
  },
  {
    id: 5,
    // name: "Customer Management",
    // Icon: Customer,
    // SelectedIcon: CustomerFilled,
    path: "/customer",
  },
  {
    id: 6,
    // name: "Skilled Worker Management",
    // Icon: Skilled,
    // SelectedIcon: SkillVector,
    path: "/skill",
  },
  {
    id: 7,
    // name: "Dispute Management",
    // Icon: Dispute,
    // SelectedIcon: DisputeVector,

    path: "/dispute",
  },
  {
    id: 8,
    // name: "Import/Export report SW",
    // Icon: Updown,
    // SelectedIcon: UpdownFilled,

    path: "/importexport",
  },
  {
    id: 9,
    // name: "Dynamic Commission ",
    // Icon: Dynamic,
    // SelectedIcon: DynamicVector,
    path: "/dynamic",
  },
  {
    id: 10,
    // name: "Order Management",
    // Icon: Order,
    // SelectedIcon: OrderVector,
    path: "/order",
  },
  {
    id: 11,
    // name: "Newsletter",
    // Icon: NewsLetter,
    // SelectedIcon: NewsVector,
    path: "/news",
  },
  {
    id: 12,
    // name: "Terms & Conditions",
    // Icon: Term,
    // SelectedIcon: ConditionVector,

    path: "/terms-conditions",
  },
  {
    id: 13,
    // name: "Privacy Policy",
    // Icon: Privacy,
    // SelectedIcon: PrivacyVector,

    path: "/privacy-policy",
  },
  {
    id: 14,
    // name: "Audit",
    // Icon: Audit,
    // SelectedIcon: AuditVector,

    path: "/audit",
  },
  {
    id: 14,
    // name: "TopUp",
    // Icon: Top,
    // SelectedIcon: TopVector,

    path: "/topup",
  },

  {
    id: 15,
    // name: "Withdrawal",
    // Icon: Withdraw,
    // SelectedIcon: WithdrawVector,

    path: "/withdraw",
  },
  {
    id: 16,
    // name: "Earnings",
    // Icon: Earning,
    // SelectedIcon: EarningVector,

    path: "/earning",
  },
  {
    id: 17,
    // name: "Reported Users",
    // Icon: Reported,
    // SelectedIcon: ReportedVector,

    path: "/report",
  },
  {
    id: 18,
    // name: "Reported Users",
    // Icon: Reported,
    // SelectedIcon: ReportedVector,

    path: "/contact-us",
  },
  {
    id: 18,
    // name: "Reported Users",
    // Icon: Reported,
    // SelectedIcon: ReportedVector,

    path: "/withdrawal-audit",
  },
];

const Login = () => {
  const [loginData, setLoginData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword((show) => !show);
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

  const onSubmit = async (data) => {
    try {
      const res = await login(data);

      const user = res?.data?.data;

      dispatch(setUserType(user?.user_type));
      dispatch(setUserinfo(user));
      if (user?.user_type != "admin") {
        dispatch(setUserPermissions(user?.permissions));
      }
      if (res?.data?.message) {
        localStorage.setItem("token", res?.data?.data?.access);

        toast.success(res?.data?.message);
        if (user?.permissions?.length === 0 && user?.user_type == "staff") {
          toast.success("User have No Permissions");
        }

        if (user?.user_type == "staff") {
          let arr = [];

          for (let i = 0; i < Summary.length; i++) {
            if (checkViewPermission(Summary[i].path, user?.permissions)) {
              arr.push(Summary[i]);
              // return;
            }
          }

          navigate(arr[0].path);
        } else {
          navigate("/");
        }
      }
      if (res?.error) {
        toast.error(res?.error?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handlePaste = (e) => {
    e.preventDefault();
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <img
            src={logo}
            style={{
              width: "388px",
              height: "366px",
              marginTop: "120px",
              marginLeft: "6px",
            }}
          />
          <CssTextField
            name="email"
            onChange={handleChange}
            sx={{
              width: { xs: "90%", sm: "560px" },
              height: "60px",
              marginTop: "20px",
            }}
            placeholder="Enter Your Email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailIcon sx={{ color: "#9277F780" }} />
                </InputAdornment>
              ),
            }}
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
          <CssTextField
            name="password"
            type={showPassword ? "text" : "password"}
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
                    onClick={handleShowPassword}
                    edge="end"
                    sx={{ color: "#9277F780" }}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...register("password", { required: true })}
          />
          {errors.password?.type === "required" && (
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: { xs: "80%", sm: "510px" },
              height: "20px",
              marginTop: "10px",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "end", width: "100%" }}>
              <Typography
                component={Link}
                to="/forgot"
                sx={{
                  fontWeight: "600",
                  fontSize: "12px",
                  lineHeight: "12px",
                  textDecoration: "none",
                  color: "#C4C4C4",
                }}
              >
                Forgot Password
              </Typography>
            </Box>
          </Box>

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
            Login
          </LoadingButton>
        </Box>
      </form>
    </div>
  );
};

export default Login;
