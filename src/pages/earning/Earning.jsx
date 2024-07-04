import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Rating,
  Typography,
  Stack,
  Pagination,
  PaginationItem,
  Button,
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
import FilterMenu from "../dashboard/filterMenu";
import {
  useGetAllEarningQuery,
  useGetTotalEarningQuery,
} from "../../redux/services/earning.service";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ResetFilter from "../../assets/images/resetfilter.svg";
import dayjs from "dayjs";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import SearchBar from "../../components/common/searchbar/SearchBar";

const Earning = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [startdate, setstartdata] = useState(null);
  const [enddate, setenddate] = useState(null);
  const [cleanFilter, setCleanFilter] = useState(false);
  const [payload, setPayload] = useState({});
  const [searchquery, setsearchquery] = useState("");

  const {
    data: totalEarning,
    error: earningerror,
    isLoading: totalisLoading,
  } = useGetTotalEarningQuery();

  const {
    data: alldata,
    error,
    isLoading,
    refetch,
  } = useGetAllEarningQuery({
    page: page,
    startdate,
    enddate,
    search: searchquery,
  });

  useEffect(() => {
    if (Object.keys(payload).length > 0) {
      setstartdata(payload?.weekly?.from);
      setenddate(payload?.weekly?.to);
    }
  }, [payload]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    setData(alldata);
  }, [alldata, page, startdate, enddate, cleanFilter]);

  useEffect(() => {
    refetch();
  }, [startdate, enddate, cleanFilter]);

  const CleanFilterFun = () => {
    setCleanFilter(true);
    setPayload({});
    setstartdata(null);
    setenddate(null);
  };

  const handleSearch = (query) => {
    if (query) {
      setPage(1);
      setsearchquery(query);
    } else {
      setsearchquery("");
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          columnGap: 2,
          // width: { xs: "none", lg: "300px" },
          // width: "100%",
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "40px",
            lineHeight: "64px",
            color: "#594DA0",
          }}
        >
          Earnings
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            button: {
              marginTop: 0,
            },
          }}
        >
          {totalEarning && (
            <Box
              sx={{
                display: "flex",
                // width: "300px",
                border: "1px solid rgba(146, 119, 247, 0.5)",
                padding: "6px 15px",
                gap: "10px",
                height: "42px",
                borderRadius: "16px",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Josefin Sans",
                fontWeight: 400,
                fontSize: "1rem",
                lineHeight: 1.5,
                textTransform: "capitalize",
              }}
            >
              <span>Total Commission:</span>
              <strong style={{ fontSize: "13px" }}>
                {totalEarning?.total_earning[0]?.total_earning +
                  " " +
                  totalEarning?.total_earning[0]?.amount_currency}{" "}
                +{" "}
                {totalEarning?.total_earning[1]?.total_earning +
                  +" " +
                  " " +
                  totalEarning?.total_earning[1]?.amount_currency}
              </strong>
            </Box>
          )}

          <FilterMenu setPayload={setPayload} CleanFilter={cleanFilter} />
        </Box>
      </Box>
      {(payload?.filter_for == "earning" ||
        payload?.filter_for == "rating") && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            margin: "15px",
          }}
        >
          <Button
            sx={{
              fontSize: "16px",
              fontWeight: 700,
              textTransform: "capitalize",
              padding: "0px",
            }}
            disableFocusRipple={true}
            onClick={CleanFilterFun}
          >
            <img
              src={ResetFilter}
              alt="ResetFilter"
              style={{ marginRight: "6px" }}
            />
            Reset filter
          </Button>
        </Box>
      )}

      <Box className="searchbar_main">
        <SearchBar onSearch={handleSearch} TooltipText="Search By : Name" />
      </Box>

      <TableContainer component={Paper} sx={{ marginTop: "10px" }}>
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#9277F7" }}>
                <StyledTableCell align="left">#Sr</StyledTableCell>
                <StyledTableCell align="left"> Profile</StyledTableCell>
                {/* <StyledTableCell align="left">Category</StyledTableCell> */}
                {/* <StyledTableCell align="left">Status</StyledTableCell> */}
                {/* <StyledTableCell align="left">Rating</StyledTableCell> */}
                <StyledTableCell align="left">Earnings</StyledTableCell>
                <StyledTableCell align="left">Date</StyledTableCell>
                <StyledTableCell align="left">Time</StyledTableCell>
                <StyledTableCell align="left">Commission</StyledTableCell>
              </TableRow>
            </TableHead>
            {/* 
            <TableBody>
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
                      
                      <Avatar alt="Remy Sharp" src={row?.icon}></Avatar>
                      <Typography variant="body1">{row?.name}</Typography>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row?.category}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row?.status}</StyledTableCell>
                  <StyledTableCell align="left">{row?.rating}</StyledTableCell>
                  <StyledTableCell align="left">
                    {row?.earnings}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody> */}

            <TableBody>
              {alldata?.results && alldata?.results?.length > 0 ? (
                alldata?.results?.map((row, index) => {
                  const { skilled_worker } = row;
                  return (
                    <>
                      <StyledTableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                        key={row?.id}
                      >
                        <StyledTableCell>{row?.id}</StyledTableCell>
                        <StyledTableCell align="left">
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="start"
                            columnGap={2}
                          >
                            <Avatar
                              alt="Remy Sharp"
                              src={skilled_worker?.user?.profile_picture_url}
                            ></Avatar>
                            <Typography
                              variant="body1"
                              sx={{ textTransform: "capitalize" }}
                            >
                              {skilled_worker?.user?.first_name +
                                " " +
                                skilled_worker?.user?.last_name}
                            </Typography>
                          </Box>
                        </StyledTableCell>
                        {/* <StyledTableCell align="left">
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="start"
                            columnGap={2}
                          >
                            <Avatar alt="Remy Sharp" src={row?.icon}></Avatar>
                            <Typography variant="body1">{row?.name}</Typography>
                          </Box>
                        </StyledTableCell> */}
                        {/* <StyledTableCell align="left">
                          {row?.skilled_worker?.total_rating}
                        </StyledTableCell> */}
                        <StyledTableCell align="left">
                          {row?.earnings} ({row?.currency_symbol})
                        </StyledTableCell>

                        <StyledTableCell align="left">
                          {row?.transfer_time
                            ? new Date(row?.transfer_time).toLocaleDateString()
                            : ""}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row?.transfer_time
                            ? new Date(row?.transfer_time).toLocaleTimeString()
                            : ""}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row?.commission}
                        </StyledTableCell>
                      </StyledTableRow>
                    </>
                  );
                })
              ) : (
                <>
                  <StyledTableCell align="center" colSpan={6}>
                    No data Found
                  </StyledTableCell>
                </>
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      {data?.results?.length > 0 && (
        <>
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
              {/* {page} */}
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
        </>
      )}
    </Box>
  );
};

export default Earning;
