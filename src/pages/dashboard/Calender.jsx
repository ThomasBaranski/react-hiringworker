import React, { useState } from "react";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { YearCalendar } from "@mui/x-date-pickers/YearCalendar";
import { MonthCalendar } from "@mui/x-date-pickers/MonthCalendar";
import Menu from "@mui/material/Menu";
import { DateCalendar } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const calenderTypes = {
  Day: <DateCalendar disableFuture />,
  month: <MonthCalendar />,
  Yearly: <YearCalendar />,
};

const CalenderBox = ({ name, show, setShow }) => {
  const [calender, setCalender] = useState(true);
  console.log(name, show, setShow);

  //   const show = Boolean(calender);
  const handleClose = () => {
    setShow(false);
  };
  const [value, setValue] = useState([
    dayjs("2022-04-17"),
    dayjs("2022-04-21"),
  ]);
  return (
    <Menu
      open={!!show}
      anchorEl={show}
      onClose={handleClose}
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
            height: 20,
            bgcolor: "background.paper",
            // transform: "translateY(-50%) rotate(45deg)",
            zIndex: 10,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "left", vertical: "top" }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["YearCalendar", "MonthCalendar"]}>
          <DemoItem>{calenderTypes[name]}</DemoItem>
        </DemoContainer>
      </LocalizationProvider>
    </Menu>
  );
};

export default CalenderBox;
