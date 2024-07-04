import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import { ReactComponent as Filter } from "../../assets/images/filter.svg";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { YearCalendar } from "@mui/x-date-pickers/YearCalendar";
import { MonthCalendar } from "@mui/x-date-pickers/MonthCalendar";
// import Menu from "@mui/material/Menu";
import CalenderBox from "./Calender";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { toast } from "react-hot-toast";

const filterData = [
  {
    id: 1,
    name: "Day",
  },
  // {
  //   id: 1,
  //   name: "week",
  // },
  {
    id: 2,
    name: "Month",
  },
  // {
  //   id: 1,
  //   name: "Quaterly",
  // },
  {
    id: 3,
    name: "Yearly",
  },
];
const FilterMenu = ({ setPayload, CleanFilter }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterValue, setFilterValue] = useState("");
  const [calender, setCalender] = useState(null);
  const [showCalender, setShowCalender] = useState(null);
  const [openCalenderBox, setOpenCalenderBox] = useState(false);
  const [fromDate, setFromDate] = useState(dayjs(new Date()));
  const [toDate, setToDate] = useState(dayjs(new Date()));
  const open = Boolean(anchorEl);
  const show = Boolean(calender);

  useEffect(() => {
    if (CleanFilter) {
      setFromDate(dayjs(new Date()));
      setToDate(dayjs(new Date()));
    }
  }, [CleanFilter]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setCalender(null);
  };
  const handleClickItem = (e, v) => {
    // console.log(v);
    setFilterValue(v);
    setCalender(true);
    setShowCalender(e.currentTarget);
  };
  const calenderFormSubmit = async () => {
    const fromDateObj = dayjs(fromDate);
    const toDateObj = dayjs(toDate);

    if (toDateObj.isBefore(fromDateObj)) {
      toast.error("To date cannot be earlier than from date");
      return;
    }
    const body = {
      filter_for: "earning",
      weekly: {
        from: dayjs(fromDate).format("YYYY-MM-DD"),
        to: dayjs(toDate).format("YYYY-MM-DD"),
      },
    };

    setPayload(body);
    setAnchorEl(null);
  };
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Button
          variant="outlined"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            columnGap: 2,
            backgroundColor: "#ffff",
            color: "#000000",
            width: { xs: "90%", sm: "250px" },
            height: "60px",
            borderRadius: "16px",
            marginTop: "20px",
            "&:hover": {
              backgroundColor: "#fff",
              color: "#594DA0",
            },
          }}
          onClick={handleClick}
        >
          <Filter />

          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 700,
              marginTop: 0.5,
            }}
          >
            Filter by Earning
          </Typography>
          {!open ? <KeyboardArrowRightIcon /> : <KeyboardArrowDownIcon />}
        </Button>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "hiden",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            padding: "5px",

            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "relative",
              top: 0,
              right: 14,
              width: 300,
              // height: 1,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {/* {filterData?.map((val) => (
          <MenuItem
            onClick={(e) => handleClickItem(e, val.name)}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "#9277F7",
            }}
          >
            {val.name}
            {val.name == filterValue && (
              <ListItemIcon>
                <CheckCircleIcon fontSize="small" sx={{ color: "#9277F7" }} />
              </ListItemIcon>
            )}
          </MenuItem>
        ))} */}
        {/* <CalenderBox
          name={filterValue}
          show={showCalender}
          setShow={setShowCalender}
        /> */}
        <Typography sx={{ textAlign: "center", color: "#9277F7" }}>
          Filter Data from Start date to End date
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer
            components={["DatePicker"]}
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <DatePicker
              label="From"
              value={fromDate}
              onChange={(prevValue) => setFromDate(prevValue)}
              format="DD-MM-YYYY"
              disableFuture
            />
            <DatePicker
              label="To"
              disableFuture
              value={toDate}
              format="DD-MM-YYYY"
              onChange={(newValue) => setToDate(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
        <Button
          fullWidth
          variant="contained"
          sx={{ marginTop: "10px" }}
          onClick={calenderFormSubmit}
        >
          Submit
        </Button>
      </Menu>
    </>
  );
};
export default FilterMenu;
