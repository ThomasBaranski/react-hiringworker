import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import LightTheme from "../../Theme";
import { Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { downloadExcel } from "react-export-table-to-excel";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: LightTheme.palette.primary.main,
    color: theme.palette.common.white,
    width: 200,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: LightTheme.palette.secondary.main,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const rows = [
  {
    id: "#0123",
    name: "Luis Benjamin",
    email: "laminjallow@gmail.com",
    order: 500,
    balance: "$2153",
  },
  {
    id: "#0124",
    name: "Luis Benjamin",
    email: "laminjallow@gmail.com",
    order: 450,
    balance: "$4532",
  },
  {
    id: "#0125",
    name: "Luis Benjamin",
    email: "laminjallow@gmail.com",
    order: 399,
    balance: "$4532",
  },
  {
    id: "#0125",
    name: "Luis Benjamin",
    email: "laminjallow@gmail.com",
    order: 319,
    balance: "$4532",
  },
  {
    id: "#0126",
    name: "Luis Benjamin",
    email: "laminjallow@gmail.com",
    order: 289,
    balance: "$4532",
  },
];

function handleDownloadExcel() {
  const header = ["User ID", "Name", "Email", "Orders", "Balance"];
  const body = [];
  rows?.map((row) =>
    body.push([row.id, row.name, row.email, row.order, row.balance])
  );
  console.log("body", body);
  downloadExcel({
    fileName: "Report.xls",
    sheet: "Report.xls",
    tablePayload: { header, body: body },
  });
}

export default function ImportExport() {
  return (
    <>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: "40px",
          lineHeight: "64px",
          color: "#594DA0",
        }}
      >
        Import/Export Management
      </Typography>
      <TableContainer component={Paper} sx={{ marginTop: "40px" }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>User ID</StyledTableCell>
              <StyledTableCell align="center">User Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Orders</StyledTableCell>
              <StyledTableCell align="center">Balance</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell align="center">{row.name}</StyledTableCell>
                <StyledTableCell align="center">{row.email}</StyledTableCell>
                <StyledTableCell align="center">{row.order}</StyledTableCell>
                <StyledTableCell align="center">{row.balance}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <LoadingButton
          endIcon={<FileDownloadOutlinedIcon />}
          variant="contained"
          sx={{
            backgroundColor: "#9277F7",

            width: "176px",
            height: "44px",
            borderRadius: "8px",
            marginTop: "20px",
            marginRight: "20px",
            textTransform: "capitalize",
            "&:hover": {
              backgroundColor: "#9277F7",
            },
          }}
          type="submit"
          // loading={isLoading}
        >
          Import
        </LoadingButton>
        <LoadingButton
          variant="contained"
          endIcon={<FileUploadOutlinedIcon />}
          sx={{
            backgroundColor: "#9277F7",
            width: "176px",
            height: "44px",
            borderRadius: "8px",
            marginTop: "20px",
            "&:hover": {
              backgroundColor: "#9277F7",
            },
            textTransform: "capitalize",
          }}
          type="submit"
          // loading={isLoading}
          onClick={handleDownloadExcel}
        >
          Export
        </LoadingButton>
      </div>
    </>
  );
}
