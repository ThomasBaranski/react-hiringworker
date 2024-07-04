import { useState, useEffect } from "react";
import { useGetAllContactUsQuery } from "../../redux/services/contactus.servics";
import {
  Box,
  Button,
  Pagination,
  PaginationItem,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../components/common/StyledTable";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import SearchBar from "../../components/common/searchbar/SearchBar";

const ContactUs = () => {
  const [searchquery, setsearchquery] = useState("");
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const {
    data: alldata,
    error,
    isLoading,
  } = useGetAllContactUsQuery({ page: page, search: searchquery });

  useEffect(() => {
    setData(alldata);
  }, [alldata, page]);
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
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: "40px",
          lineHeight: "64px",
          color: "#594DA0",
        }}
      >
        Contact Us
      </Typography>

      <Box className="searchbar_main">
        <SearchBar
          onSearch={handleSearch}
          TooltipText="Search By: Title,Email,Name"
        />
      </Box>

      <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#9277F7" }}>
              <StyledTableCell sx={{}}> ID</StyledTableCell>
              <StyledTableCell align="center">Title</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading && (
              <StyledTableCell align="center" colSpan={5}>
                Loading...
              </StyledTableCell>
            )}
            {!isLoading && data?.results?.length === 0 && (
              <StyledTableCell align="center" colSpan={5}>
                No Data Found
              </StyledTableCell>
            )}
            {data?.results &&
              data?.results?.map((row) => (
                <StyledTableRow
                  key={row?.modified}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row">
                    {row?.id}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row?.title ? row?.title : "N/A"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row?.name ? row?.name : "N/A"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row?.user?.email ? row?.user?.email : "N/A"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      variant="contained"
                      startIcon={<RemoveRedEyeIcon />}
                      onClick={() => {
                        navigate(`/contact-us/${row?.id}`);
                      }}
                    >
                      View
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
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
    </>
  );
};

export default ContactUs;
