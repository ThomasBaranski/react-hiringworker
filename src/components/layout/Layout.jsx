import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllPermissionsQuery } from "../../redux/services/roleManagement/roleManagement.service";
import { setAllPermissions } from "../../redux/slices/permissions.slice";
import { checkViewPermission } from "../../utils/checkViewPermissions";

const Layout = () => {
  const state = useSelector((state) => state);
  const { data } = useGetAllPermissionsQuery();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  // console.log("state", state?.Permissions);
  // console.log("perm data ", data);
  useEffect(() => {
    dispatch(setAllPermissions(data?.data));
  }, [JSON.stringify(data)]);
  // useEffect(() => {
  //   checkViewPermission(pathname, state.Permissions?.user_permissions);
  // }, [pathname]);

  return (
    // <div>
    <Box sx={{ display: "flex" }}>
      <Box>
        <Sidebar />
      </Box>
      <Box sx={{ ml: "350px", width: "100%" }}>
        <Header />
        <Box
          sx={{
            // marginLeft: { xs: 0, md: "10px" },
            paddingX: "30px",
            // paddingY: "50px",
            width: "96%",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
    // </div>
  );
};

export default Layout;
