import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
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
import { LoadingButton } from "@mui/lab";
import CancelIcon from "@mui/icons-material/Cancel";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const rows = [
  {
    id: 1,
    name: "VandalCitySolana",
  },
  {
    id: 2,
    name: "SusanooSolana",
  },
  {
    id: 3,
    name: "MakersPlace",
  },
  {
    id: 4,
    name: "WhIsBe",
  },
  {
    id: 5,
    name: "the lil frens",
  },
  {
    id: 6,
    name: "LastEssence",
  },
  {
    id: 7,
    name: "HENI: Damien Hirst",
  },
  {
    id: 8,
    name: "KarafuruDeployer",
  },
  {
    id: 9,
    name: "AINightbirds",
  },
];
const StaffWithdraw = () => {
  return (
    <Box>
      {/* <Typography
        sx={{
          fontWeight: 700,
          fontSize: "40px",
          lineHeight: "64px",
          color: "#594DA0",
        }}
      >
        Staff Withdraw
      </Typography> */}
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
            {console.log("Top up Staff console", rows)}
            {rows?.map((row, index) => (
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

export default StaffWithdraw;
