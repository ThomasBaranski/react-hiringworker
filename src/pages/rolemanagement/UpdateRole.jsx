import React, { useEffect, useState, useMemo } from "react";
import { StyledTableCell } from "../../components/common/StyledTable";
import {
  Box,
  Grid,
  IconButton,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { Formik } from "formik";
// import { createRoleSchema } from "../../validations/rolemanagement/createRole";
import { LoadingButton } from "@mui/lab";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  useGetAllPermissionsQuery,
  useGetSinglePermissionQuery,
  useUpdateRolePermissionMutation,
  useRoleCreatePermissionMutation,
  useCreatePermissionsMutation,
  useUpdateAssignedUserRoleMutation,
} from "../../redux/services/roleManagement/roleManagement.service";
import { ExceptionHanlder } from "../../utils/exceptionHandler/ExceptionHandler";
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
        // color: "#000000",
        color: "#9277F780",
        fontWeight: "500",
        fontsize: "14px",
        lineHeight: "22.4px",
      },
    },
  },
});

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
const UpdateRole = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const user = useLocation().state?.userData;
  const username = searchParams.get("username");
  // console.log("username", username);
  const [isLoading, setIsloading] = useState(false);
  const [createPermissions, setCreatePermissions] = useState([]);
  const [permissionsList, setPermissionsList] = useState([]);
  const { data } = useGetAllPermissionsQuery();
  const getSinglePermission = useGetSinglePermissionQuery(id);
  const [updateRolePermission] = useUpdateRolePermissionMutation();
  // const [roleCreatePermissionRequest] = useRoleCreatePermissionMutation();
  const [createPermissionsRequest] = useCreatePermissionsMutation();
  const [updateAssignedUserRole] = useUpdateAssignedUserRoleMutation();

  useEffect(() => {
    // console.log("run");
    if (getSinglePermission?.data?.permission) {
      const permissionIds = getSinglePermission?.data?.permission?.map(
        (item) => item.id
      );
      setCreatePermissions(permissionIds);
    }
  }, [getSinglePermission]);

  // console.log("getSinglePermission", getSinglePermission?.data?.permission);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [toggleOn, setToggleOn] = useState(false);

  const customisePermissionsData = (data) => {
    // console.log("data in memo", data);
    const allPermissionsDataKeys = Object.keys(data || {});
    const modifiedPermissionsData = [];
    allPermissionsDataKeys.forEach((item) => {
      data[item]?.map((code) => {
        if (code.codename.includes("view")) {
          modifiedPermissionsData.push({
            name: `${item} `,
            permissionType: "View",
            id: code.id,
            status: getSinglePermission?.data?.permission.some(
              (per) => per.id == code.id && username == null
            )
              ? true
              : false,
          });
        } else if (code.codename.includes("change")) {
          modifiedPermissionsData.push({
            name: `${item} `,
            permissionType: "Update",
            id: code.id,
            status: getSinglePermission?.data?.permission.some(
              (per) => per.id == code.id && username == null
            )
              ? true
              : false,
          });
        } else if (code.codename.includes("delete")) {
          modifiedPermissionsData.push({
            name: `${item} `,
            permissionType: "Delete",
            id: code.id,
            status: getSinglePermission?.data?.permission.some(
              (per) => per.id == code.id && username == null
            )
              ? true
              : false,
          });
        } else if (code.codename.includes("add")) {
          modifiedPermissionsData.push({
            name: `${item} `,
            permissionType: "Create",
            id: code.id,
            status: getSinglePermission?.data?.permission.some(
              (per) => per.id == code.id && username == null
            )
              ? true
              : false,
          });
        }
      });
    });

    return modifiedPermissionsData;
  };
  const memoisedPermissionsData = useMemo(
    () => customisePermissionsData(data?.data),
    [data?.data, getSinglePermission?.data?.permission]
  );

  const onSubmit = async (values) => {
    // debugger;
    console.log("updated values", values);
    setIsloading(true);
    const data = {
      name: values.name,
      permissions: createPermissions,
    };
    if (username) {
      console.log("data", data);
      // debugger;
      const response = await createPermissionsRequest(data);
      console.log("res?.data?.id", response?.data?.id);

      if (response?.data?.id) {
        console.log("in check");
        const res = await updateAssignedUserRole([
          id,
          {
            username: username,
            email: user?.email,
            role: response?.data?.id,
          },
        ]);

        navigate("/role");
        console.log("inside check", res);
      }
      setIsloading(false);
      return;
    }
    // const res = await updateRolePermission([id, data]);

    // ExceptionHanlder(res);
    // setIsloading(false);
    // if (res?.data) {
    //   navigate(`/role`);
    // }
  };
  const handleToggleOn = () => {
    setToggleOn(true);
  };
  const handleChangeToggle = (e, id) => {
    if (e.target.checked) {
      setCreatePermissions([...createPermissions, id]);
    } else {
      setCreatePermissions((prev) => prev?.filter((item) => item !== id));
    }
  };

  return (
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={{
          name:
            username !== null
              ? username + "_role"
              : getSinglePermission?.data?.data.name,
        }}
        onSubmit={onSubmit}
        // validationSchema={createRoleSchema}
      >
        {({ errors, handleSubmit, values, handleChange, touched }) => {
          // console.log("values", values);
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
                Update Roles{" "}
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
                disabled={true}
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
                <Box sx={{ backgroundColor: "#9277F7" }}>
                  <StyledTableCell
                    sx={{
                      fontWeight: "700",
                      fontSize: "40px",
                      lineHeight: "64px",
                      display: "flex",
                      justifyContent: "center",
                      color: "white",
                    }}
                  >
                    Assign Roles
                  </StyledTableCell>
                </Box>
                {/* {console.log(
                  "memoisedPermissionsData",
                  memoisedPermissionsData
                )} */}
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
                      <Typography>
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
                          defaultChecked={role.status}
                          onChange={(e) => handleChangeToggle(e, role.id)}
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
                    marginTop: "20px",
                    "&:hover": {
                      backgroundColor: "#594DA0",
                    },
                  }}
                  type="submit"
                  loading={isLoading}
                >
                  Update Role
                </LoadingButton>
              </Box>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default UpdateRole;
