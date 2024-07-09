import {
  Box,
  Button,
  Pagination,
  PaginationItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../components/common/StyledTable";
import {
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
} from "../../redux/services/order.service";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import TableSkeleton from "../../utils/tableSkeleton/TableSkeleton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import SearchBar from "../../components/common/searchbar/SearchBar";
import FilterDropdown from "../../components/common/searchbar/FilterDropdown";

const StatusOptions = [
  { label: "Select Status", value: "" },
  { label: "Order Accepted", value: "order_accepted" },
  { label: "Delivery Accepted", value: "delivery_accepted" },
];
const TypeOptions = [
  { label: "Select Type", value: "" },
  { label: "Mile Stone", value: "milestone" },
  { label: "One Time", value: "one-time" },
];

// const rows = [
//   {
//     id: "#012",
//     uu_id: "#012",
//     no_of_orders: "15251",
//     customers: "Luis Benjamin",
//     skill_worker: "Luis Benjamin",
//     amount: "15251",
//     commision: "500",
//     accepted_at: "2:45",
//     created_at: "2:45",
//     status: "Active",
//   },
//   {
//     id: "#013",
//     uu_id: "#013",
//     no_of_orders: "15251",
//     customers: "Luis Benjamin",
//     skill_worker: "Luis Benjamin",
//     amount: "15251",
//     commision: "500",
//     accepted_at: "2:45",
//     created_at: "2:45",
//     status: "Active",
//   },
//   {
//     id: "#014",
//     uu_id: "#014",
//     no_of_orders: "15251",
//     customers: "Luis Benjamin",
//     skill_worker: "Luis Benjamin",
//     amount: "15251",
//     commision: "500",
//     accepted_at: "2:45",
//     created_at: "2:45",
//     status: "Active",
//   },
//   {
//     id: "#015",
//     uu_id: "#015",
//     no_of_orders: "15251",
//     customers: "Luis Benjamin",
//     skill_worker: "Luis Benjamin",
//     amount: "15251",
//     commision: "500",
//     accepted_at: "2:45",
//     created_at: "2:45",
//     status: "Active",
//   },
//   {
//     id: "#016",
//     uu_id: "#016",
//     no_of_orders: "15251",
//     customers: "Luis Benjamin",
//     skill_worker: "Luis Benjamin",
//     amount: "15251",
//     commision: "500",
//     accepted_at: "2:45",
//     created_at: "2:45",
//     status: "Active",
//   },
//   {
//     id: "#017",
//     uu_id: "#017",
//     no_of_orders: "15251",
//     customers: "Luis Benjamin",
//     skill_worker: "Luis Benjamin",
//     amount: "15251",
//     commision: "500",
//     accepted_at: "2:45",
//     created_at: "2:45",
//     status: "Active",
//   },
// ];
const Orders = () => {
  const [statusOption, setstatusOption] = useState("");
  const [TypeOption, setTypeOption] = useState("");
  const [searchquery, setsearchquery] = useState("");
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const {
    data: orders,
    error,
    isLoading,
  } = useGetAllOrdersQuery({
    page: page,
    search: searchquery,
    status: statusOption,
    quote_type: TypeOption,
  });
  useEffect(() => {
    setData(orders);
  }, [orders, page, TypeOption, statusOption]);
  // console.log("🚀 ~ file: Orders.jsx:111 ~ Orders ~ orders:", orders?.results);

  // const canViewCustomer = usePermission("view_customer");

  const handleChange = (event, value) => {
    setPage(value);
  };

  const openDetails = (id) => {
    navigate(`/order/${id}`);
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
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: "40px",
          lineHeight: "64px",
          color: "#594DA0",
        }}
      >
        Order Management
      </Typography>

      <Box className="searchbar_main">
        <FilterDropdown
          FilterOptions={TypeOptions}
          setFilterOptions={setTypeOption}
          FilterOption={TypeOption}
        />

        <FilterDropdown
          FilterOptions={StatusOptions}
          setFilterOptions={setstatusOption}
          FilterOption={statusOption}
        />
        <SearchBar
          onSearch={handleSearch}
          TooltipText="Search By : Customer name, Skill worker name, Order No."
        />
      </Box>
      <TableContainer component={Paper} sx={{ marginTop: "10px" }}>
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#9277F7" }}>
                  <StyledTableCell align="left">Order No.</StyledTableCell>
                  <StyledTableCell align="left">Type of order</StyledTableCell>
                  <StyledTableCell align="left">Total price</StyledTableCell>
                  <StyledTableCell align="left">Customer Name</StyledTableCell>
                  <StyledTableCell align="left">
                    Skilled Worker Name
                  </StyledTableCell>
                  <StyledTableCell align="left">Status</StyledTableCell>
                  {/* <StyledTableCell align="left">Paid Amount</StyledTableCell> */}
                  <StyledTableCell align="left"></StyledTableCell>
                  <StyledTableCell align="left">Created Date</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders?.results && orders?.results?.length > 0 ? (
                  orders?.results?.map((row, index) => {
                    const CustomerName =
                      row?.customer?.first_name +
                        " " +
                        row?.customer?.last_name || "";
                    const SkilledWorkerName =
                      row?.skilled_worker.first_name +
                        " " +
                        row?.skilled_worker?.last_name || "";

                    return (
                      <>
                        <StyledTableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                          key={index + row?.id}
                        >
                          <StyledTableCell align="left">
                            {row?.order_number ? row?.order_number : "N/A"}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row?.order_type ? row?.order_type : "N/A"}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row?.amount
                              ? row?.amount +
                                " " +
                                row?.amount_currency +
                                " (" +
                                row?.amount_in_customer_currency +
                                " " +
                                row?.customer?.currency_code +
                                ")"
                              : "N/A"}
                          </StyledTableCell>
                          <StyledTableCell
                            align="left"
                            sx={{ textTransform: "capitalize" }}
                          >
                            {CustomerName ? CustomerName : "N/A"}
                          </StyledTableCell>
                          <StyledTableCell
                            align="left"
                            sx={{ textTransform: "capitalize" }}
                          >
                            {SkilledWorkerName ? SkilledWorkerName : "N/A"}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row?.status ? row?.status : "N/A"}
                          </StyledTableCell>
                          {/* <StyledTableCell align="left">
                            {row?.paid_amount
                              ? row?.paid_amount +
                                " " +
                                row?.amount_currency +
                                " (" +
                                row?.paid_amount_in_customer_currency +
                                " " +
                                row?.customer?.currency_code +
                                ")"
                              : "N/A"}
                          </StyledTableCell> */}
                          <StyledTableCell align="center">
                            <Button
                              variant="contained"
                              // startIcon={<VisibilityIcon />}
                              onClick={() => openDetails(row.id)}
                            >
                              <Box
                                sx={{
                                  // backgroundColor: "red",
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <VisibilityIcon />
                                <Typography
                                  sx={{ textTransform: "capitalize" }}
                                >
                                  View
                                </Typography>
                              </Box>
                            </Button>
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row?.date_created ? row?.date_created : "N/A"}
                          </StyledTableCell>
                        </StyledTableRow>
                      </>
                    );
                  })
                ) : (
                  <StyledTableRow>
                    <StyledTableCell colSpan={11} align="center">
                      No data found.
                    </StyledTableCell>
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
          </>
        )}
      </TableContainer>

      {orders?.results?.length > 0 && (
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

export default Orders;
