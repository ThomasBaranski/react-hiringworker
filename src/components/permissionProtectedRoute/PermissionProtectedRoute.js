import React from "react";
import { Route, Navigate, useLocation, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { checkViewPermission } from "../../utils/checkViewPermissions";
// import { checkViewPermission } from "./utils/checkViewPermissions"; // Update the path

const PermissionProtectedRoute = ({ element, ...rest }) => {
  const state = useSelector((state) => state);
  const location = useLocation();

  const isAllowed = checkViewPermission(
    location.pathname,
    state.Permissions?.user_permissions
  );

  if (isAllowed) {
    return <Route element={element} {...rest} />;
  } else {
    return <Navigate to="/forbidden" />;
  }
};

export default PermissionProtectedRoute;
