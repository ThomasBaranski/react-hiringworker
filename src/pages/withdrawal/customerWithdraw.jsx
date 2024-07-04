import React, { useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../components/common/StyledTable";
import logo from "../../assets/images/solana.svg";
import Markes from "../../assets/images/markes.png";
import Whls from "../../assets/images/whlsbe.png";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import vandal from "../../assets/images/vandal.png";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import frens from "../../assets/images/frens.png";
import last from "../../assets/images/last.png";
import Hani from "../../assets/images/hani.png";
import Karafur from "../../assets/images/karafur.png";
import Night from "../../assets/images/night.png";
import { useNavigate } from "react-router-dom";
import { useNewsListQuery } from "../../redux/services/newsletter.service";
// import Skeleton from "@mui/material/Skeleton";
import TableSkeleton from "../../utils/tableSkeleton/TableSkeleton";

const customers = [
  {
    id: 1,
    name: "Solana VandalCity",
    withdraw: "$21456",
    topup: "$2131",
    currency: "USD Dollar",
    date: "22-02-2023",
    branch: "Kiosk",
  },
  {
    id: 2,
    name: "SolanaSusanoo",
    withdraw: "$21456",
    topup: "$2132",
    currency: "BNB Dollar",
    date: "22-02-2023",
    branch: "Kiosk",
  },
  {
    id: 3,
    name: "PlaceMakers",
    withdraw: "$21456",
    topup: "$4321",
    currency: "Etherium Dollar",
    date: "22-02-2023",
    branch: "Kiosk",
  },
  {
    id: 4,
    name: "BeWhIs",
    withdraw: "$987",
    topup: "$12",
    currency: "Transparancy Dollar",
    date: "22-02-2023",
    branch: "Kiosk",
  },
  {
    id: 5,
    name: "frens lil the  ",
    withdraw: "$465",
    topup: "$10",
    currency: "bitcon Dollar",
    date: "22-02-2023",
    branch: "Kiosk",
  },
];
const CustomerWithdraw = () => {
  const [isLoading, setIsLoading] = useState(false);
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
        Customer Withdraw
      </Typography>
      <TableContainer component={Paper} sx={{ marginTop: "10px" }}>
        {/* {isLoading ? (
          <TableSkeleton />
        ) : ( */}
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#9277F7" }}>
              <StyledTableCell align="left">#Sr</StyledTableCell>
              <StyledTableCell align="left"> Name</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {console.log("Top up customer", customers)}
            {customers?.map((row, index) => (
              <StyledTableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell>{index + 1}</StyledTableCell>
                <StyledTableCell align="left">
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="start"
                    columnGap={2}
                  >
                    <Typography variant="body1">{row?.name}</Typography>
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        {/* )} */}
      </TableContainer>
    </Box>
  );
};

export default CustomerWithdraw;
