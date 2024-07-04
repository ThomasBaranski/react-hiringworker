import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
// import {
//   StyledTableCell,
//   StyledTableRow,
// } from "../../components/common/StyledTable";
// import { useNavigate } from "react-router";
import StaffWithdraw from "./StaffWithdraw";
import CustomerWithdraw from "./customerWithdraw";

const Withdrawal = () => {
  const [component, setComponent] = useState("Staff");

  const staffHandle = () => {
    setComponent((prev) => (prev === "Staff" ? "Customer" : "Staff"));
  };

  return (
    <Box>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: "40px",
          lineHeight: "64px",
          color: "#594DA0",
        }}
      >
        Withdrawal
      </Typography>
      <Box
        sx={{
          width: "386px",
          height: "44px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          sx={{
            width: "177px",
            height: "44px",
            borderRadius: "8px",
            ...(component === "Staff"
              ? { backgroundColor: "#9277F7" }
              : { backgroundColor: "#9277F7", opacity: 0.5 }),
            "&:hover": {
              backgroundColor: component === "Staff" ? "#9277F7" : "true",
            },
          }}
          // disabled={component === "Staff" ? false : true}
          onClick={staffHandle}
        >
          Staff
        </Button>
        <Button
          variant="contained"
          sx={{
            width: "177px",
            height: "44px",
            borderRadius: "8px",
            ...(component === "Customer"
              ? { backgroundColor: "#9277F7" }
              : { backgroundColor: "#9277F7", opacity: 0.5 }),
          }}
          onClick={staffHandle}
          // disabled={component === "Customer" ? false : true}
        >
          Customer
        </Button>
      </Box>
      {component === "Staff" ? <StaffWithdraw /> : <CustomerWithdraw />}
    </Box>
  );
};

export default Withdrawal;
