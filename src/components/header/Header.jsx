import styled from "@emotion/styled";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Typography,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import React, { useState } from "react";
import Logout from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { user_info = {}, user_type } = useSelector(
    (state) => state?.Permissions
  );

  const last_name = user_info?.user?.last_name;
  const first_name = user_info?.user?.first_name;
  const username = user_info?.user?.username;
  let ShowName;
  if (user_type === "admin") {
    ShowName = "admin";
  } else if (first_name || last_name) {
    ShowName = `${first_name || ""} ${last_name || ""}`.trim();
  } else {
    ShowName = username;
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "end",
        alignItems: "center",
        width: "100%",
        // paddingX: "30px",
        paddingY: "15px",
      }}
    >
      <Box>
        <Button>
          <PersonIcon sx={{ color: "#594DA0" }} />
        </Button>

        <Button
          onClick={handleClick}
          endIcon={
            <KeyboardArrowDownIcon
              sx={{ color: "#594DA0", marginRight: "40px" }}
            />
          }
        >
          {ShowName}
        </Button>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={() => navigate("/change")}>
            <Button onClick={handleClose} sx={{ color: "#132848" }}>
              Change Password
            </Button>
          </MenuItem>

          <MenuItem onClick={handleClose}>
            <Button
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
              sx={{ color: "#132848" }}
            >
              Logout
            </Button>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Header;
