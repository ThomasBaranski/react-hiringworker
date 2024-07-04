import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
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
  Skeleton,
  Stack,
  TableCell,
  Typography,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import logo from "../../assets/images/vandal.png";
import ResetFilter from "../../assets/images/resetfilter.svg";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FilterMenu from "./filterMenu";
import { useDashboardMutation } from "../../redux/services/dashboard.service";
import Person2RoundedIcon from "@mui/icons-material/Person2Rounded";
import PersonIcon from "@mui/icons-material/Person";
import { ReactComponent as Filter } from "../../assets/images/filter.svg";
import Rating from "./Rating";
import TableSkeleton from "../../utils/tableSkeleton/TableSkeleton";
import usePermission from "../../utils/permissionHandler/PermissionHandler";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
const rows = [
  {
    id: 1,
    name: "VandalCitySolana",
    category: "Plumber",
    status: "Active",
    rating: "03",
    earnig: "$351",
  },
  {
    id: 2,
    name: "SusanooSolana",
    category: "Plumber",
    status: "Active",
    rating: "02",
    earnig: "$351",
  },
  {
    id: 3,
    name: "MakersPlace",
    category: "Plumber",
    status: "Active",
    rating: "02",
    earnig: "$351",
  },
  {
    id: 4,
    name: "WhIsBe",
    category: "Painter",
    status: "Active",
    rating: "02",
    earnig: "$351",
  },
  {
    id: 5,
    name: "the lil frens",
    category: "Electrician",
    status: "Active",
    rating: "05",
    earnig: "$351",
  },
  {
    id: 6,
    name: "LastEssence",
    category: "Door Fitter",
    status: "Active",
    rating: "02",
    earnig: "$351",
  },
  {
    id: 7,
    name: "HENI: Damien Hirst",
    category: "Line Man",
    status: "Active",
    rating: "01",
    earnig: "$351",
  },
  {
    id: 8,
    name: "KarafuruDeployer",
    category: "Pipe Fitter",
    status: "Active",
    rating: "03",
    earnig: "$351",
  },
];

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [cleanFilter, setCleanFilter] = useState(false);
  const [page, setPage] = useState(1);
  const [payload, setPayload] = useState({});
  const [dashboard, { data, isLoading }] = useDashboardMutation();
  const canViewDashboard = usePermission("view_user");
  useEffect(() => {
    const payloadData = [payload, { page: page }];
    dashboard(payloadData);
  }, [payload, page]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const isValidEntry = (cellData) => cellData ?? "N/A";
  const isProfile = (cellData) => cellData ?? <Person2RoundedIcon />;

  const CleanFilter = () => {
    setCleanFilter(true);
    setPayload({});
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          // paddingX: "30px",
          paddingY: "2px",
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
          Dashboard
        </Typography>

        {canViewDashboard && (
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
            <FilterMenu setPayload={setPayload} CleanFilter={cleanFilter} />
            <Rating setPayload={setPayload} CleanFilter={cleanFilter} />
          </Box>
        )}
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
            onClick={CleanFilter}
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

      <TableContainer component={Paper} sx={{ marginTop: "10px" }}>
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <Table sx={{ minWidth: 500 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#9277F7" }}>
                <StyledTableCell align="left">Profile</StyledTableCell>
                <StyledTableCell align="left">Category</StyledTableCell>
                <StyledTableCell align="left">Status</StyledTableCell>
                <StyledTableCell align="left">Rating</StyledTableCell>
                <StyledTableCell align="left">Earnings</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data?.results?.length == 0 ? (
                <>
                  <StyledTableRow>
                    <StyledTableCell colSpan={11} align="center">
                      No data found.
                    </StyledTableCell>
                  </StyledTableRow>
                </>
              ) : (
                data?.results?.map((item) => {
                  return (
                    <>
                      <StyledTableRow key={item?.id}>
                        <TableCell>
                          {item?.user?.profile_picture_url == null ? (
                            <>
                              <div
                                style={{
                                  display: "flex",
                                  // justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <div
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    background: "#000",
                                    color: "#fff",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "50px",
                                  }}
                                >
                                  <PersonIcon color="#9277F7" />
                                </div>
                                <Typography
                                  sx={{
                                    fontWeight: "600",
                                    fontSize: "14px",
                                    lineHeight: "14px",
                                    marginLeft: "10px",
                                    textTransform: "capitalize",
                                  }}
                                >
                                  {item?.user?.first_name &&
                                  item?.user?.last_name
                                    ? item?.user?.first_name +
                                      " " +
                                      item?.user?.last_name
                                    : "N/A"}
                                </Typography>
                              </div>
                            </>
                          ) : (
                            <div
                              style={{
                                display: "flex",
                                // justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <Avatar
                                src={isProfile(item?.user?.profile_picture_url)}
                                width={50}
                              />
                              <Typography
                                sx={{
                                  fontWeight: "600",
                                  fontSize: "14px",
                                  lineHeight: "14px",
                                  marginLeft: "10px",
                                  textTransform: "capitalize",
                                }}
                              >
                                {item?.user?.first_name && item?.user?.last_name
                                  ? item?.user?.first_name +
                                    " " +
                                    item?.user?.last_name
                                  : "N/A"}
                              </Typography>
                            </div>
                          )}
                        </TableCell>
                        <TableCell sx={{ textTransform: "capitalize" }}>
                          {isValidEntry(item?.occupation)}
                        </TableCell>
                        <TableCell>
                          {item?.user?.is_active ? "Active" : "Deactivate"}
                        </TableCell>
                        <TableCell>{isValidEntry(item?.rating)}</TableCell>
                        <TableCell>
                          {isValidEntry(item?.earning)}{" "}
                          {item?.earning && item?.currency_code}
                        </TableCell>
                      </StyledTableRow>
                    </>
                  );
                })
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      {data?.results?.length > 0 && (
        <Stack
          direction="row"
          justifyContent="flex-end"
          marginTop="56px"
          marginBottom="20px"
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
            Page :
          </Typography>
          {/* {console.log("pagination resonse", data?.count)} */}
          <Pagination
            count={Math.ceil((data?.count ?? 10) / 10)}
            page={page}
            variant="rounded"
            onChange={handleChange}
            renderItem={(item) => (
              <PaginationItem
                sx={{ color: "#000000" }}
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

export default Dashboard;
