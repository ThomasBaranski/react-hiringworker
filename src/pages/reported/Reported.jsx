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
import React, { useEffect, useState } from "react";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../components/common/StyledTable";
import {
  useBlockReportedUserMutation,
  useLazyFindAllReportQuery,
  useFindAllReportQuery,
} from "../../redux/services/reportedUser.service";
import TableSkeleton from "../../utils/tableSkeleton/TableSkeleton";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import SearchBar from "../../components/common/searchbar/SearchBar";
import FilterDropdown from "../../components/common/searchbar/FilterDropdown";

const FilterOptions = [
  { label: "Please select", value: "" },
  { label: "Customer", value: "customer" },
  { label: "Skilled Worker", value: "skill_worker" },
];

const Reported = () => {
  const [FilterOption, setFilterOptions] = useState("");

  const [searchquery, setsearchquery] = useState("");
  const navigate = useNavigate();
  const pageLoading = false;
  const [page, setPage] = useState(1);
  const { data: getData, isLoading } = useFindAllReportQuery({
    page_size: 10,
    page: page,
    search: searchquery,
    account_status: FilterOption,
  });

  const [blockReportedUser] = useBlockReportedUserMutation();
  const [data, setData] = useState([]);
  const [blockButtonClicked, setBlockButtonClicked] = useState(false);
  const [unblockButtonClicked, setUnblockButtonClicked] = useState(false);

  // async function fetchData() {
  // const res = await getData({ page_size: 10, page: page });
  // console.log("api response", res);
  // setData(res?.data?.data);
  // }
  useEffect(() => {
    setData(getData?.results);
  }, [page, getData, FilterOption]);

  const handleChange = (event, value) => {
    setPage(value);
  };
  const openBlockButton = async (rowData) => {
    const user_id = rowData?.reported?.user_id;
    const status = rowData?.reported?.is_active ? "block" : "unblock";
    const res = await blockReportedUser({
      user_id,
      status,
    });

    if (res?.data?.message) {
      toast.success(res?.data?.message);
    }
    setBlockButtonClicked(true);
    setUnblockButtonClicked(false);
  };
  const openUnblockButton = async (rowData) => {
    const user_id = rowData?.reported?.user_id;
    const status = "unblock";
    const res = await blockReportedUser({
      user_id,
      status,
    });
    if (res?.data?.message) {
      toast.success(res?.data?.message);
    }
    setUnblockButtonClicked(true);
    setBlockButtonClicked(false);
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
      <Typography sx={{ fontSize: "40px", fontWeight: 700, color: "#594DA0" }}>
        Reported Users
      </Typography>

      <Box className="searchbar_main">
        <FilterDropdown
          FilterOptions={FilterOptions}
          setFilterOptions={setFilterOptions}
          FilterOption={FilterOption}
        />
        <SearchBar
          onSearch={handleSearch}
          TooltipText="Search By : Reporter,Reportee,Reason "
        />
      </Box>
      <TableContainer sx={{ marginTop: "20px" }}>
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <Table>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>UUID</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell>Time</StyledTableCell>
                <StyledTableCell>Reporter</StyledTableCell>
                {/* <StyledTableCell>Reported by mail</StyledTableCell> */}
                <StyledTableCell>Reporter Role</StyledTableCell>
                <StyledTableCell>Reportee</StyledTableCell>
                {/* <StyledTableCell>Reported To mail</StyledTableCell> */}
                <StyledTableCell>Reportee Role</StyledTableCell>
                <StyledTableCell>Reason</StyledTableCell>
                <StyledTableCell>Actions</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {data?.length > 0 ? (
                data?.map((item) => {
                  return (
                    <>
                      <StyledTableRow>
                        <StyledTableCell>{item?.uuid}</StyledTableCell>
                        <StyledTableCell>
                          {item?.report_time
                            ? new Date(item?.report_time).toLocaleDateString()
                            : "N/A"}
                        </StyledTableCell>
                        <StyledTableCell style={{ whiteSpace: "nowrap" }}>
                          {item?.report_time
                            ? new Date(item?.report_time).toLocaleTimeString(
                                "en-US",
                                { hour12: true }
                              )
                            : "N/A"}
                        </StyledTableCell>
                        <StyledTableCell>
                          {item?.reporter?.username}
                        </StyledTableCell>
                        {/* <StyledTableCell>
                          {item?.reporter?.email}
                        </StyledTableCell> */}
                        <StyledTableCell sx={{ textTransform: "capitalize" }}>
                          {item?.reporter?.account_status == "skill_worker"
                            ? "Skilled Worker"
                            : item?.reporter?.account_status}
                        </StyledTableCell>
                        <StyledTableCell>
                          {item?.reported?.username}
                        </StyledTableCell>
                        {/* <StyledTableCell>
                          {item?.reported?.email}
                        </StyledTableCell> */}
                        <StyledTableCell sx={{ textTransform: "capitalize" }}>
                          {item?.reported?.account_status == "skill_worker"
                            ? "Skilled Worker"
                            : item?.reported?.account_status}
                        </StyledTableCell>
                        <StyledTableCell>{item?.reason_type}</StyledTableCell>
                        <StyledTableCell>
                          {/* {console.log("item?.reported", item?.reported)} */}
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              gap: "8px",
                            }}
                          >
                            <Button
                              onClick={() => openBlockButton(item)}
                              sx={{
                                backgroundColor: item?.reported?.is_active
                                  ? "red"
                                  : "green",
                                color: "white",
                                "&:hover": {
                                  backgroundColor: item?.reported?.is_active
                                    ? "red"
                                    : "green",
                                  color: "white",
                                },
                              }}
                            >
                              {item?.reported?.is_active ? "Block" : "UnBlock"}
                            </Button>
                            <Button
                              onClick={() =>
                                navigate(`/singlereporteduser/${item?.id}`)
                              }
                              sx={{
                                marginLeft: "4px",
                                backgroundColor: "#9277F7",
                                color: "white",
                                "&:hover": {
                                  backgroundColor: "#9277F7",
                                  color: "white",
                                },
                              }}
                            >
                              View
                            </Button>
                          </Box>
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
        )}
      </TableContainer>

      {data?.length > 0 && (
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
            count={Math.ceil((getData?.count ?? 10) / 10)}
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

export default Reported;
