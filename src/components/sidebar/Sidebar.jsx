import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import logo from "../../assets/images/dashboard.png";
import { LogoutOutlined, MenuOutlined, StarBorder } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as DasbIcon } from "../../assets/images/main.svg";
import { ReactComponent as Category } from "../../assets/images/category.svg";
import { ReactComponent as Role } from "../../assets/images/role.svg";
import { ReactComponent as Staff } from "../../assets/images/staff.svg";
import { ReactComponent as Customer } from "../../assets/images/customer.svg";
import { ReactComponent as Skilled } from "../../assets/images/skilled.svg";
import { ReactComponent as Dispute } from "../../assets/images/dispute.svg";
import { ReactComponent as Updown } from "../../assets/images/updown.svg";
import { ReactComponent as UpdownFilled } from "../../assets/images/updownFilled.svg";
import { ReactComponent as Dynamic } from "../../assets/images/dynamic.svg";
import { ReactComponent as Order } from "../../assets/images/order.svg";
import { ReactComponent as NewsLetter } from "../../assets/images/newsletter.svg";
import { ReactComponent as Top } from "../../assets/images/top.svg";
import { ReactComponent as Withdraw } from "../../assets/images/withdraw.svg";
import { ReactComponent as Earning } from "../../assets/images/earning.svg";
import { ReactComponent as Reported } from "../../assets/images/reported.svg";
import { ReactComponent as Logout } from "../../assets/images/logout.svg";
import { ReactComponent as Term } from "../../assets/images/terms.svg";
import { ReactComponent as Privacy } from "../../assets/images/privacy.svg";
import { ReactComponent as Audit } from "../../assets/images/audit.svg";
import { ReactComponent as DasbIconFilled } from "../../assets/images/DasbIconFilled.svg";
// import { ReactComponent as Frame } from "../../assets/images/Frame.svg";
import { ReactComponent as Categoryfilled } from "../../assets/images/Categoryfilled.svg";
import { ReactComponent as Rolefoto } from "../../assets/images/RoleFoto.svg";
import { ReactComponent as StaffFrame } from "../../assets/images/StaffFrame.svg";
import { ReactComponent as CustomerFilled } from "../../assets/images/customerfilled.svg";
import { ReactComponent as SkillVector } from "../../assets/images/skillvector.svg";
import { ReactComponent as DisputeVector } from "../../assets/images/disputevector.svg";
import { ReactComponent as DynamicVector } from "../../assets/images/dynaminvector.svg";
import { ReactComponent as OrderVector } from "../../assets/images/ordervector.svg";
import { ReactComponent as NewsVector } from "../../assets/images/newsvector.svg";
import { ReactComponent as ConditionVector } from "../../assets/images/conditionvectior.svg";
import { ReactComponent as PrivacyVector } from "../../assets/images/privacyvector.svg";
import { ReactComponent as TopVector } from "../../assets/images/topvector.svg";
import { ReactComponent as AuditVector } from "../../assets/images/auditVector.svg";
import { ReactComponent as WithdrawVector } from "../../assets/images/withdrarvector.svg";
import { ReactComponent as EarningVector } from "../../assets/images/earningvector.svg";
import { ReactComponent as ReportedVector } from "../../assets/images/reportingvector.svg";
import styled from "@emotion/styled";
import { checkViewPermission } from "../../utils/checkViewPermissions";
import { useSelector } from "react-redux";
const Summary = [
  {
    id: 1,
    name: "Dashboard",
    Icon: DasbIcon,
    SelectedIcon: DasbIconFilled,
    path: "/",
  },
  {
    id: 2,
    name: "Category",
    Icon: Category,
    SelectedIcon: Categoryfilled,
    path: "/category",
  },
  {
    id: 3,
    name: "Role Management",
    Icon: Role,
    SelectedIcon: Rolefoto,
    path: "/role",
    children: [
      {
        key: "nested1",
        name: "Manage Role",
        Icon: StarBorder,
        path: "/manage",
      },
    ],
  },
  {
    id: 4,
    name: "Staff Management",
    Icon: Staff,
    SelectedIcon: StaffFrame,
    path: "/staff",
  },
  {
    id: 5,
    name: "Customer Management",
    Icon: Customer,
    SelectedIcon: CustomerFilled,
    path: "/customer",
  },
  {
    id: 6,
    name: "Skilled Worker Management",
    Icon: Skilled,
    SelectedIcon: SkillVector,
    path: "/skill",
  },
  {
    id: 7,
    name: "Dispute Management",
    Icon: Dispute,
    SelectedIcon: DisputeVector,
    path: "/dispute",
  },
  // {
  //   id: 8,
  //   name: "Import/Export report SW",
  //   Icon: Updown,
  //   SelectedIcon: UpdownFilled,

  //   path: "/importexport",
  // },
  {
    id: 9,
    name: "Dynamic Commission ",
    Icon: Dynamic,
    SelectedIcon: DynamicVector,
    path: "/dynamic",
  },
  {
    id: 10,
    name: "Order Management",
    Icon: Order,
    SelectedIcon: OrderVector,
    path: "/order",
  },
  {
    id: 11,
    name: "Newsletter",
    Icon: NewsLetter,
    SelectedIcon: NewsVector,

    path: "/news",
  },
  {
    id: 12,
    name: "Terms & Conditions",
    Icon: Term,
    SelectedIcon: ConditionVector,

    path: "/terms-conditions",
  },
  {
    id: 13,
    name: "Privacy Policy",
    Icon: Privacy,
    SelectedIcon: PrivacyVector,

    path: "/privacy-policy",
  },
  {
    id: 14,
    name: "TopUp-Audit",
    Icon: Audit,
    SelectedIcon: AuditVector,
    path: "/audit",
  },
  {
    id: 15,
    name: "Withdrawal-Audit",
    Icon: Audit,
    SelectedIcon: AuditVector,
    path: "/withdrawal-audit",
  },
  {
    id: 16,
    name: "TopUp",
    Icon: Top,
    SelectedIcon: TopVector,

    path: "/topup",
  },

  {
    id: 17,
    name: "Withdrawal",
    Icon: Withdraw,
    SelectedIcon: WithdrawVector,
    path: "/withdraw",
  },
  {
    id: 18,
    name: "Earnings",
    Icon: Earning,
    SelectedIcon: EarningVector,

    path: "/earning",
  },
  {
    id: 11,
    name: "Contact Us",
    Icon: NewsLetter,
    SelectedIcon: NewsVector,
    path: "/contact-us",
  },
  {
    id: 129,
    name: "Reported Users",
    Icon: Reported,
    SelectedIcon: ReportedVector,
    path: "/report",
  },
];

const StyledListItem = styled(ListItem)({
  "& .MuiTypography-root": {
    fontWeight: "bold !important",
  },
  "& .MuiListItemButton-root": {
    borderRadius: "10px",
    color: "#fff",
  },
  "& .Mui-selected": {
    backgroundColor: "#fff !important",
    color: "#594DA0",
    "& .MuiListItemIcon-root": {
      // stroke: "#594DA0",
      // fill: "#594DA0",
    },
    fontWeight: "900 !important",
  },
});
const Sidebar = () => {
  const state = useSelector((state) => state);
  // console.log(
  //   "state.Permissions?.user_permissions",
  //   state.Permissions?.user_permissions
  // );
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [summary, setSummary] = useState(Summary);
  const [manage, setManage] = useState(false);
  const openNavMenu = () => {
    setOpen((prev) => !prev);
  };
  const handleOpen = () => {
    setManage(true);
  };
  const handleClose = () => setManage(false);
  const handleListItemClick = (ind, path) => {
    navigate(path);
    setNestedOpen((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
    setSelected(ind);
  };
  const [nestedOpen, setNestedOpen] = React.useState({});
  // console.log("sidebar", state);
  useEffect(() => {
    if (state?.Permissions?.user_type != "admin") {
      let arr = [
        // {
        //   id: 1,
        //   name: "Dashboard",
        //   Icon: DasbIcon,
        //   SelectedIcon: DasbIconFilled,
        //   path: "/",
        // },
      ];
      // Summary?.map((page) => {
      //   if (
      //     checkViewPermission(page.path, state.Permissions?.user_permissions)
      //   ) {
      //     console.log("trueeeeee");
      //     arr.push(page);
      //   }
      // });
      for (let i = 0; i < Summary.length; i++) {
        if (
          checkViewPermission(
            Summary[i].path,
            state.Permissions?.user_permissions
          )
        ) {
          // console.log("trueeeeee");
          arr.push(Summary[i]);
        }
      }
      setSummary(arr);
    }
  }, [JSON.stringify(state)]);

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#9277F7",
          color: "white",
          display: { xs: "none", md: "flex" },
          // justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "column",
          minHeight: "100vh",
          height: "100%",
          width: "300px",
          position: "fixed",
          boxSizing: "border-box",
          overflow: "auto",
          py: "20px",
        }}
      >
        <img src={logo} />
        <Box
          sx={{
            display: "flex",
            height: "100vh",
            width: "100%",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <List component="nav" sx={{ marginTop: "27px", width: "100%" }}>
            {summary?.map((item, index) => {
              const { Icon } = item;
              const { SelectedIcon } = item;
              const showNestedItem = nestedOpen[item.path] ?? false;
              const isAllowed = checkViewPermission(
                pathname,
                state.Permissions?.user_permissions
              );

              return (
                <>
                  <div key={index}>
                    <StyledListItem>
                      <ListItemButton
                        selected={pathname === item?.path}
                        onClick={() => handleListItemClick(index, item?.path)}
                        // sx={{ pl: 2 }}
                      >
                        <ListItemIcon>
                          {pathname === item?.path ? (
                            <SelectedIcon />
                          ) : (
                            <Icon />
                          )}
                        </ListItemIcon>
                        <ListItemText primary={item?.name} />
                      </ListItemButton>
                    </StyledListItem>
                    <Collapse in={showNestedItem} timeout="auto" unmountOnExit>
                      <List
                        component="nav"
                        disablePadding
                        sx={{
                          marginLeft: 6,
                          // display: "flex",
                          // alignItems: "start",
                          // justifyContent: "start",
                        }}
                      >
                        {item?.children?.map(
                          (
                            {
                              key: childKey,
                              name: childLabel,
                              Icon: ChildIcon,
                              path,
                            },
                            ind
                          ) => (
                            <ListItem
                              sx={{ cursor: "pointer" }}
                              key={childKey}
                              onClick={() => handleListItemClick(ind, path)}
                            >
                              {/* {console.log("children", childLabel)} */}
                              <ListItemIcon>
                                <ChildIcon />
                              </ListItemIcon>
                              <ListItemText
                                inset
                                primary={childLabel}
                                sx={{
                                  marginLeft: -6,
                                }}
                              />
                            </ListItem>
                          )
                        )}
                      </List>
                    </Collapse>
                  </div>
                </>
              );
            })}
          </List>

          <IconButton
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              marginBottom: 2,
            }}
          >
            <Button
              variant="contained"
              disableElevation
              sx={{
                backgroundColor: "#594DA0",
                color: "white",
                "&:hover": {
                  backgroundColor: "#594DA0",
                  color: "white",
                },
              }}
              endIcon={<Logout />}
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              Logout
            </Button>
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          height: "50px",
          display: { xs: "flex", md: "none" },
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <IconButton onClick={openNavMenu} sx={{ color: "black" }}>
          <MenuOutlined sx={{ width: "56px", height: "56px" }} />
        </IconButton>
      </Box>
      <Box
        sx={{
          position: "absolute:",
          top: "50px",
          right: "0px",
          background: "#9277F7",
          color: "black",
          display: { xs: open ? "flex" : "none", md: "none" },
          flexDirection: "column",
          alignItems: "center",
          rowGap: 2,
          fontSize: "32px",
          cursor: "pointer",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingBottom: "30px",
          }}
        >
          <img src={logo} />

          <List component="nav">
            {summary?.map((item, index) => {
              const { Icon } = item;
              return (
                <StyledListItem key={index}>
                  <ListItemButton
                    selected={pathname === item?.path}
                    onClick={() => handleListItemClick(index, item?.path)}
                    // sx={{ pl: 2 }}
                  >
                    <ListItemIcon>
                      <Icon />
                    </ListItemIcon>
                    <ListItemText primary={item?.name} />
                  </ListItemButton>
                </StyledListItem>
              );
            })}
          </List>

          <IconButton
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              marginBottom: "40px",
            }}
          >
            <Button
              variant="contained"
              disableElevation
              sx={{
                marginBottom: "40px",
                backgroundColor: "#594DA0",
                color: "white",
                "&:hover": {
                  backgroundColor: "#594DA0",
                  color: "white",
                },
              }}
              endIcon={<Logout />}
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              Logout
            </Button>
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
