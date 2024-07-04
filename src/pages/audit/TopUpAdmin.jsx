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

const TopUpAdmin = ({ search }) => {
  const [searchquery, setsearchquery] = useState("");
  const [getData, { isLoading }] = useLazyFindAllCustomerAuditQuery();
  const [totalcount, settotalcount] = useState(null);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  async function fetchData() {
    const res = await getData({
      page_size: 10,
      page: page,
      search: search,
      search2: searchquery,
    });
    settotalcount(res?.data?.count || 1);
    setData(res?.data?.results);
  }
  useEffect(() => {
    fetchData();
  }, [page, searchquery]);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const isValidEntry = (cellData) => cellData ?? "N/A";
  const handleSearch = (query) => {
    if (query) {
      setPage(1);
      setsearchquery(query);
    } else {
      setsearchquery("");
    }
  };
  return (
    <>
      <Box className="searchbar_main">
        <SearchBar
          onSearch={handleSearch}
          TooltipText="Search By : Super admin,Customer name,TopUp status"
        />
      </Box>
      <TableContainer component={Paper} sx={{ marginTop: "10px" }}>
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#9277F7" }}>
                <StyledTableCell align="left">Super Admin</StyledTableCell>
                <StyledTableCell align="left"> Customer Name</StyledTableCell>
                <StyledTableCell align="left"> Top-Up Amt</StyledTableCell>
                <StyledTableCell align="left"> Top-Up Status</StyledTableCell>
                <StyledTableCell align="left"> Date</StyledTableCell>
                <StyledTableCell align="left"> Time</StyledTableCell>
                <StyledTableCell align="left"> Kiosk branch</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.data?.map((item) => {
                return (
                  <>
                    <StyledTableRow>
                      <StyledTableCell>{item?.admin?.username}</StyledTableCell>
                      <StyledTableCell
                        sx={{
                          "& a": {
                            color: " rgba(100, 86, 177, 1)",
                          },
                        }}
                      >
                        <Link
                          to={`/customerdetails/${item?.customer?.customer_id}`}
                        >
                          {/* {item?.customer?.user?.first_name +
                            " " +
                            item?.customer?.user?.last_name} */}
                          {item?.customer?.user?.username}
                        </Link>
                      </StyledTableCell>
                      <StyledTableCell>{item?.amount}</StyledTableCell>
                      <StyledTableCell>{item?.status}</StyledTableCell>
                      {/* <StyledTableCell>
                    {item?.customer?.user?.username}
                  </StyledTableCell> */}
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
                    </StyledTableRow>
                  </>
                );
              })}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      {data?.data?.length > 0 && (
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
            count={Math.ceil((totalcount ?? 10) / 10)}
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
    </>
  );
};

export default TopUpAdmin;
