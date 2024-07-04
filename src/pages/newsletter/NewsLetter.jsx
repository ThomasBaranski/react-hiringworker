import React from "react";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../components/common/StyledTable";
import {
  Avatar,
  Box,
  Button,
  ListItemIcon,
  Menu,
  MenuItem,
  Pagination,
  PaginationItem,
  Stack,
  Typography,
} from "@mui/material";
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
import { useState } from "react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import SearchBar from "../../components/common/searchbar/SearchBar";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

const NewsLetter = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [searchquery, setsearchquery] = useState("");

  const { data, isLoading } = useNewsListQuery({
    page: page,
    search: searchquery,
  });

  const handleChange = (event, value) => {
    setPage(value);
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
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            fontWeight: "700",
            fontSize: "40px",
            lineHeight: "64px",
            color: "#594DA0",
          }}
        >
          Newsletter
        </Typography>

        <Box className="searchbar_main">
          <SearchBar
            onSearch={handleSearch}
            TooltipText="Search By : Full name,User name,Email/phone number"
          />
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{ marginTop: "10px" }}>
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#9277F7" }}>
                <StyledTableCell align="left">#User ID </StyledTableCell>
                <StyledTableCell align="left"> Full Name</StyledTableCell>
                <StyledTableCell align="left"> User Name</StyledTableCell>
                <StyledTableCell align="left">
                  Email / Phone Number
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.results && data?.results?.length > 0 ? (
                <>
                  {data?.results?.map((row, index) => {
                    const isEmailVerified = row?.user?.is_email_verified;
                    const isPhoneVerified = row?.user?.is_phone_number_verified;
                    const FirstName = row?.user?.first_name;
                    const LastName = row?.user?.last_name;

                    return (
                      <>
                        <StyledTableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                          key={index}
                        >
                          <StyledTableCell>{row?.user?.id}</StyledTableCell>
                          <StyledTableCell
                            align="left"
                            sx={{ textTransform: "capitalize" }}
                          >
                            {FirstName + " " + LastName}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="start"
                              columnGap={2}
                            >
                              {/* <Avatar alt="Remy Sharp" src={row?.user?.}></Avatar> */}
                              <Avatar
                                alt="Remy Sharp"
                                src={row?.user?.profile_picture_url}
                              ></Avatar>
                              <Typography
                                variant="body1"
                                sx={{ textTransform: "capitalize" }}
                              >
                                {row?.user?.username}
                              </Typography>
                            </Box>
                          </StyledTableCell>

                          <StyledTableCell align="left">
                            {(isEmailVerified && row?.user?.email) ||
                              (isPhoneVerified && row?.user?.phone_number)}

                            {/* {row?.user?.email
                          ? row?.user?.email
                          : row?.user?.phone_number
                          ? row?.user?.phone_number
                          : "N/A"} */}
                          </StyledTableCell>
                          {/* <StyledTableCell>
                    {row?.user?.phone_number ? row?.user?.phone_number : "N/A"}
                  </StyledTableCell> */}
                        </StyledTableRow>
                      </>
                    );
                  })}
                </>
              ) : (
                <>
                  <StyledTableRow>
                    <StyledTableCell colSpan={4} align="center">
                      No data found.
                    </StyledTableCell>
                  </StyledTableRow>
                </>
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      {data?.results.length > 0 && (
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
      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          width: { xs: "176px", sm: "100%" },
          height: "44px",
          marginTop: "20px",
          borderRadius: "8px",
        }}
      >
        <Button variant="contained">Send</Button>
      </Box> */}
    </>
  );
};

export default NewsLetter;
