import React, { useState } from "react";
import {
  Avatar,
  Box,
  Pagination,
  PaginationItem,
  Stack,
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
import { Link, useNavigate } from "react-router-dom";
import { useNewsListQuery } from "../../redux/services/newsletter.service";
// import Skeleton from "@mui/material/Skeleton";
import TableSkeleton from "../../utils/tableSkeleton/TableSkeleton";
import {
  useFindAllCustomerAuditQuery,
  useLazyFindAllCustomerAuditQuery,
} from "../../redux/services/audit.service";
import { useEffect } from "react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import SearchBar from "../../components/common/searchbar/SearchBar";

const WithdrawalauditCustomer = ({
  data = [],
  isLoading = false,
  page = 1,
  setPage = () => {},
  handleSearch = () => {},
  TooltipText,
}) => {
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box>
      <Box className="searchbar_main">
        <SearchBar onSearch={handleSearch} TooltipText={TooltipText} />
      </Box>
      <TableContainer component={Paper} sx={{ marginTop: "10px" }}>
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#9277F7" }}>
                <StyledTableCell align="left">SW </StyledTableCell>
                <StyledTableCell align="left"> Admin</StyledTableCell>
                <StyledTableCell align="left"> Txn Amt</StyledTableCell>
                <StyledTableCell align="left"> Currency</StyledTableCell>
                {/* <StyledTableCell align="left"> Txn type</StyledTableCell> */}

                <StyledTableCell align="left"> Date</StyledTableCell>
                <StyledTableCell align="left"> Time</StyledTableCell>
                <StyledTableCell align="left"> Kiosk branch</StyledTableCell>
                <StyledTableCell align="left"> Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.results?.map((item) => {
                return (
                  <>
                    <StyledTableRow>
                      <StyledTableCell
                        sx={{
                          "& a": {
                            color: " rgba(100, 86, 177, 1)",
                          },
                        }}
                      >
                        <Link
                          to={`/withdrawal-skilled-worker/${item?.skilled_worker?.user?.user_id}`}
                        >
                          {item?.skilled_worker?.user?.first_name +
                            " " +
                            item?.skilled_worker?.user?.last_name}
                        </Link>
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{
                          "& a": {
                            color: " rgba(100, 86, 177, 1)",
                          },
                        }}
                      >
                        {item?.admin
                          ? item?.admin?.username
                          : item?.staff?.user?.first_name +
                            " " +
                            item?.staff?.user?.last_name}
                      </StyledTableCell>
                      <StyledTableCell>{item?.amount}</StyledTableCell>
                      <StyledTableCell>{item?.amount_currency}</StyledTableCell>
                      {/* <StyledTableCell>{item?.withdrawal_type}</StyledTableCell> */}

                      <StyledTableCell>
                        {item?.created
                          ? new Date(item?.created).toLocaleDateString()
                          : "N/A"}
                      </StyledTableCell>
                      <StyledTableCell>
                        {item?.created
                          ? new Date(item?.created).toLocaleTimeString()
                          : "N/A"}
                      </StyledTableCell>
                      <StyledTableCell>
                        {item?.staff?.user?.kiosk_branch
                          ? item?.staff?.user?.kiosk_branch
                          : "N/A"}
                      </StyledTableCell>
                      <StyledTableCell>{item?.status}</StyledTableCell>
                    </StyledTableRow>
                  </>
                );
              })}

              {data?.results && data?.results?.length === 0 && (
                <StyledTableRow>
                  <StyledTableCell colSpan={8} align="center">
                    No data found.
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      {data?.results && data?.results?.length > 0 && (
        <Stack
          direction="row"
          justifyContent="flex-end"
          marginTop="56px"
          marginBottom="30px"
          alignItems="center"
        >
          <Typography
            sx={{
              color: "#04111D",
              fontWeight: "700",
              fontSize: "20px",
              lineHeight: "20px",
            }}
          >
            Page:
          </Typography>
          <Pagination
            count={Math.ceil((data?.count ?? 10) / 10)}
            page={page}
            variant="rounded"
            onChange={handleChange}
            renderItem={(item) => (
              <PaginationItem
                sx={{ color: "#04111D" }}
                slots={{ previous: ArrowLeftIcon, next: ArrowRightIcon }}
                {...item}
              />
            )}
          />
        </Stack>
      )}
    </Box>
  );
};

export default WithdrawalauditCustomer;
