import React, { useState, useEffect } from "react";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../components/common/StyledTable";
import Paper from "@mui/material/Paper";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import styled from "@emotion/styled";
import {
  useGetAllDisputeQuery,
  useUpdateDisputeStatusMutation,
} from "../../redux/services/dispute.service";
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
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import SearchBar from "../../components/common/searchbar/SearchBar";

const ButtonsMain = styled(Box)({
  marginTop: "10px",
  display: "flex",
  gap: "10px",
  alignItems: "center",

  button: {
    background: "#9277F7",
    color: "#fff",
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: "22px",
    letterSpacing: "0em",
    textAlign: "left",
    textTransform: "capitalize",
    padding: "9px 17px",
    "&:hover": {
      background: "#9277F7",
    },
    "&.selected": {
      background: "rgba(146, 119, 247, 0.5)",
    },
  },
});
const SelectMain = styled("select")({
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: "27px",
  borderRadius: "5px",
  color: "#000",
});

const Dispute = () => {
  const GetUserType = useSelector((state) => state?.Permissions);
  const [searchquery, setsearchquery] = useState("");

  const IsUpdateStates = GetUserType?.user_permissions?.some(
    (value) => value.codename === "change_dispute"
  );

  const [UpdateDisputeStatus] = useUpdateDisputeStatusMutation();
  const navigate = useNavigate();
  const [selected, setselected] = useState("pending");
  const [selectedValues, setSelectedValues] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const {
    data: alldata,
    error,
    isLoading,
    refetch,
  } = useGetAllDisputeQuery({
    page: page,
    status: selected,
    search: searchquery,
  });

  useEffect(() => {
    setData(alldata);
  }, [alldata, page, selected]);

  // useEffect(() => {
  //   refetch();
  // }, [selected]);

  const handleChange = (event, value) => {
    setPage(value);
  };
  // const handleSelectChange = async (value, rowId) => {
  //   setSelectedValues({
  //     ...selectedValues,
  //     [rowId]: value,
  //   });
  //   if (value === "resolved") {
  //     const res = await UpdateDisputeStatus({
  //       data: value,
  //       id: rowId,
  //     });
  //     if (res?.data?.statusCode === 200) {
  //       refetch();
  //       toast.success("Statu successfully Updated!");
  //     }
  //   }
  // };

  const haldelSelect = (value) => {
    setselected(value);
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
          justifyContent: "space-between",
          alignItems: "center",
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
          Dispute Management
        </Typography>

        <ButtonsMain>
          <Button
            onClick={() => haldelSelect("resolved")}
            className={`${selected === "resolved" ? "" : "selected"}`}
            // disabled={selected === "resolved"}
          >
            Resolved Dispute
          </Button>
          <Button
            onClick={() => haldelSelect("pending")}
            className={`${selected === "pending" ? "" : "selected"}`}
            // disabled={selected === "pending"}
          >
            Pending Dispute
          </Button>
        </ButtonsMain>
      </Box>
      <Box className="searchbar_main">
        <SearchBar
          onSearch={handleSearch}
          TooltipText="Search By : Job ID, From, To"
        />
      </Box>

      <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#9277F7" }}>
              <StyledTableCell sx={{}}>Dispute ID</StyledTableCell>
              <StyledTableCell align="center">Job ID</StyledTableCell>
              <StyledTableCell align="center">From</StyledTableCell>
              <StyledTableCell align="center">To</StyledTableCell>
              <StyledTableCell align="center">Reason</StyledTableCell>
              {/* <StyledTableCell align="center">Status</StyledTableCell> */}
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading && (
              <StyledTableCell align="center" colSpan={7}>
                Loading...
              </StyledTableCell>
            )}
            {!isLoading && data?.results?.length === 0 && (
              <StyledTableCell align="center" colSpan={7}>
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
                    {row?.order_number}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row?.disputed_from ? row?.disputed_from : "N/A"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row?.disputed_to ? row?.disputed_to : "N/A"}
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ width: "18%" }}>
                    {row?.reason}
                  </StyledTableCell>
                  {/* <StyledTableCell
                    align="center"
                    sx={{ textTransform: "capitalize" }}
                  > */}
                  {/* {row?.status === "pending" && (
                      <SelectMain
                        value={selectedValues[row.id] || "pending"}
                        onChange={(e) =>
                          handleSelectChange(e.target.value, row.id)
                        }
                        disabled={
                          !IsUpdateStates && GetUserType.user_type === "staff"
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="resolved">Resolved</option>
                      </SelectMain>
                    )} */}
                  {/* {row?.status} */}
                  {/* </StyledTableCell>  */}
                  <StyledTableCell align="center">
                    <Button
                      variant="contained"
                      startIcon={<RemoveRedEyeIcon />}
                      onClick={() => {
                        navigate(`/dispute/${row?.id}`);
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
                  slots={{ previous: "none", next: ArrowRightIcon }}
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

export default Dispute;
