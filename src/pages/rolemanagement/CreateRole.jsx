import React, { useMemo, useState } from "react";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../components/common/StyledTable";
import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Pagination,
  PaginationItem,
  Stack,
  Switch,
  TextField,
  ToggleButton,
  Typography,
} from "@mui/material";
import logo from "../../assets/images/vandal.png";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import styled from "@emotion/styled";
import { Formik } from "formik";
import {
  createRoleValidationSchema,
  roleValidationSchema,
} from "../../validations/rolemanagement/createRole";
import { LoadingButton } from "@mui/lab";
import { MenuBook } from "@mui/icons-material";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import {
  useGetAllPermissionsQuery,
  useCreatePermissionsMutation,
} from "../../redux/services/roleManagement/roleManagement.service";
import { ExceptionHanlder } from "../../utils/exceptionHandler/ExceptionHandler";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { assignRolesList } from "../../redux/services/roleManagement/roleManagement.slice";
// import { ScrollToFieldError } from "../../utils/scrollToError/ScrollToFieldError ";

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
      borderWidth: "2px",
    },
    "&:hover fieldset": {
      borderColor: "#9277F7",
      borderWidth: "3px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#9277F7",
    },
    input: {
      "&::placeholder": {
        textOverflow: "ellipsis !important",
        // color: "#000000",
        color: "#9277F780",
        fontWeight: "500",
        fontsize: "14px",
        lineHeight: "22.4px",
      },
    },
  },
});

const roles = [
  {
    id: 1,
    name: "User management (Create)",
  },
  {
    id: 2,
    name: "User management (Read)",
  },
  {
    id: 3,
    name: "User management (Update)",
  },
  {
    id: 4,
    name: "User management (Delete)",
  },
  {
    id: 5,
    name: "Assigning permissions",
  },
  {
    id: 6,
    name: "Payment management (Top Up)",
  },
  {
    id: 7,
    name: "Payment management (Top Up) Audit",
  },
  {
    id: 8,
    name: "Payment management (Withdrawal)",
  },
  {
    id: 8,
    name: "Payment management (Withdrawal) Audit",
  },
  {
    id: 9,
    name: " Dispute System",
  },
  {
    id: 10,
    name: "Customer Support  (incl. Contact Us)",
  },
  {
    id: 11,
    name: "Order Management (Create)",
  },
  {
    id: 12,
    name: "Order Management (Read)",
  },
  {
    id: 13,
    name: "Order Managemen (Update)",
  },
  {
    id: 14,
    name: "Order Management (Delete)",
  },
  {
    id: 15,
    name: "API Key Management",
  },
];
const initialValues = {
  name: "",
  // usename: "",
  // email: "",
  // password: "",
};
const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));
const CreateRole = () => {
  const navigate = useNavigate();
  const [toggleOn, setToggleOn] = useState(false);
  const [createPermissions, setCreatePermissions] = useState([]);
  const [createPermissionsRequest] = useCreatePermissionsMutation();
  const [isLoading, setIsloading] = useState(false);
  const { data } = useGetAllPermissionsQuery();
  const dispatch = useDispatch();

  const customisePermissionsData = (data) => {
    const allPermissionsDataKeys = Object.keys(data || {});

    const modifiedPermissionsData = [];
    allPermissionsDataKeys.forEach((item) => {
      data[item]?.map((code) => {
        if (code.codename.includes("view")) {
          modifiedPermissionsData.push({
            name: `${item} `,
            permissionType: "View",
            id: code.id,
          });
        } else if (code.codename.includes("change")) {
          modifiedPermissionsData.push({
            name: `${item} `,
            permissionType: "Update",
            id: code.id,
          });
        } else if (code.codename.includes("delete")) {
          modifiedPermissionsData.push({
            name: `${item} `,
            permissionType: "Delete",
            id: code.id,
          });
        } else if (code.codename.includes("add")) {
          modifiedPermissionsData.push({
            name: `${item} `,
            permissionType: "Create",
            id: code.id,
          });
        }
      });
    });
    return modifiedPermissionsData;
  };
  const memoisedPermissionsData = useMemo(
    () => customisePermissionsData(data?.data),
    [data?.data]
  );

  const onSubmit = async (values) => {
    setIsloading(true);
    const data = {
      name: values.name,
      permissions: createPermissions,
    };
    const res = await createPermissionsRequest(data);

    setIsloading(false);
    if (res?.data) {
      ExceptionHanlder(res);

      dispatch(assignRolesList(res?.data?.data));
      navigate(`/role`);
    } else if (res?.error) {
      toast.error(res?.error?.data?.message);
    }
  };
  const handleToggleOn = () => {
    setToggleOn(true);
  };
  // const createRolePermissions = [];
  // const handleChangeToggle = (e, id, role) => {
  //   if (e.target.checked) {
  //     setCreatePermissions([...createPermissions, id]);
  //   } else {
  //     setCreatePermissions((prev) => prev.filter((item) => item !== id));
  //   }
  // };

  const handleChangeToggle = (e, id, role) => {
    const permissionName = role?.name;

    if (e.target.checked) {
      setCreatePermissions([...createPermissions, id]);
    } else {
      setCreatePermissions((prev) => prev.filter((item) => item !== id));
    }

    // if (Array.isArray(GetSelectedPermission)) {
    //   const selectedPermission = GetSelectedPermission.find(
    //     (val) => val.id === id
    //   );
    //   // console.log(
    //   //   "🚀 ~ file: CreateRole.jsx:301 ~ handleChangeToggle ~ selectedPermission:",
    //   //   selectedPermission
    //   // );

    //   if (e.target.checked) {

    //     // if (!createPermissions.includes(id)) {
    //     //   if (
    //     //     GetSelectedPermission.length > 0 &&
    //     //     permissionName == "Category"
    //     //   ) {
    //     //     const viewPermission = GetSelectedPermission.filter(
    //     //       (val) => val.permissionType == "View"
    //     //     );
    //     //     if (viewPermission[0]?.id) {
    //     //       createPermissions.push(viewPermission[0]?.id);
    //     //     }
    //     //   } else {
    //     //     createPermissions.push(id);
    //     //   }
    //     // }
    //     // if (createPermissions.includes(id)) {
    //     //   return createPermissions;
    //     // } else if (
    //     //   GetSelectedPermission.length > 0 &&
    //     //   ["Create", "Update", "Delete"].includes(
    //     //     GetSelectedPermission[0]?.permissionType
    //     //   )
    //     // ) {
    //     //   // Add the "view" permission id as well
    //     //   const viewPermission = GetSelectedPermission.filter(
    //     //     (val) => val.permissionType == "View"
    //     //   );
    //     //   console.log(
    //     //     "🚀 ~ file: CreateRole.jsx:320 ~ setCreatePermissions ~ viewPermission:",
    //     //     viewPermission[0]?.id
    //     //   );
    //     //   if (
    //     //     viewPermission &&
    //     //     !createPermissions.includes(viewPermission[0]?.id)
    //     //   ) {
    //     //     setCreatePermissions([
    //     //       ...createPermissions,
    //     //       id,
    //     //       viewPermission[0].id,
    //     //     ]);
    //     //     // return [...prev, id, viewPermission[0].id];
    //     //   } else {
    //     //     setCreatePermissions([...createPermissions, id]);
    //     //   }
    //     // } else {
    //     //   setCreatePermissions([...createPermissions, id]);
    //     // }
    //   } else {
    //     setCreatePermissions((prev) => prev.filter((item) => item !== id));
    //   }
    //   console.log("Set Permissions============>", createPermissions);
    // }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={createRoleValidationSchema}
      >
        {({ errors, handleSubmit, values, handleChange, touched }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Typography
                sx={{
                  fontWeight: "700",
                  fontSize: "40px",
                  lineHeight: "64px",
                  color: "#594DA0",
                }}
              >
                Create Roles
              </Typography>
              <Typography
                sx={{
                  mt: 2,
                  fontWeight: "600",
                  fontSize: "24px",
                  lineHeight: "24px",
                }}
              >
                Role Title :
              </Typography>
              <CssTextField
                type={"text"}
                id="name"
                name="name"
                onChange={handleChange}
                value={values.name}
                sx={{
                  width: { xs: "90%", sm: "560px" },
                  height: "60px",
                  marginTop: "20px",
                  fontWeight: "400",
                  fontSize: "12px",
                  lineHeight: "18px",
                  letterSpacing: "2%",
                  // border: "1px solid #9277F7",
                }}
                placeholder="Admin"
              />
              <br />
              {errors.name && (
                <Typography variant="body2" sx={{ color: "red" }}>
                  {errors.name}
                </Typography>
              )}
              <Box sx={{ mt: 3 }}>
                {/* <Box sx={{  }}> */}
                <StyledTableCell
                  sx={{
                    padding: 0,
                    fontWeight: "700",
                    fontSize: "40px",
                    lineHeight: "64px",
                    display: "flex",
                    justifyContent: "center",
                    color: "white",
                    backgroundColor: "#9277F7",
                    height: "60px",
                  }}
                >
                  Assign Permissions
                </StyledTableCell>
                {/* </Box> */}

                {memoisedPermissionsData?.map((role, index) => (
                  <Grid
                    container
                    sx={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-around",
                      background: index % 2 == 0 ? "#F7F6FE" : "unset",
                      height: "64px",
                      alignItems: "center",
                    }}
                  >
                    <Grid item xs={6} sx={{ pl: "40px" }}>
                      <Typography
                        sx={{
                          textTransform: "capitalize",
                          fontWeight: 700,
                          fontSize: "20px",
                          lineHeight: "20px",
                        }}
                      >
                        {role.name.replaceAll("_", " ")} ({role.permissionType})
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sx={{ textAlign: "end", pr: "40px" }}>
                      <IconButton
                        aria-label="toggle Visibility"
                        onClick={handleToggleOn}
                        sx={{
                          width: "47.29px",
                          height: "27.82px",
                          // color: "#32CD32",
                          borderRadius: "25px",
                        }}
                      >
                        <IOSSwitch
                          onChange={(e) => handleChangeToggle(e, role.id, role)}
                        />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
              </Box>
              <Box textAlign="center" mt={5}>
                <LoadingButton
                  variant="contained"
                  sx={{
                    backgroundColor: "#594DA0",
                    width: { xs: "90%", sm: "560px" },
                    height: "60px",
                    borderRadius: "16px",
                    margin: "20px",
                    "&:hover": {
                      backgroundColor: "#594DA0",
                    },
                    textTransform: "capitalize",
                  }}
                  type="submit"
                  loading={isLoading}
                >
                  Create Role
                </LoadingButton>
              </Box>
            </form>
          );
        }}
        {/* <ScrollToFieldError /> */}
      </Formik>
    </div>
  );
};

export default CreateRole;
