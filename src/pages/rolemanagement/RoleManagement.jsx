import React, { useState } from "react";
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

import logo from "../../assets/images/vandal.png";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import { useNavigate } from "react-router-dom";
import {
  useGetCreatedPermissionsQuery,
  useDeleteCreatedPermissionsMutation,
  useListQuery,
} from "../../redux/services/roleManagement/roleManagement.service";
import { ExceptionHanlder } from "../../utils/exceptionHandler/ExceptionHandler";
import { LoadingButton } from "@mui/lab";
import RoleAssign from "../../components/modals/RoleAssign";
import TableSkeleton from "../../utils/tableSkeleton/TableSkeleton";
// import RoleAssign from "../../components/modals/RoleAssign";
import usePermission from "../../utils/permissionHandler/PermissionHandler";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import SearchBar from "../../components/common/searchbar/SearchBar";
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
const RoleManagement = () => {
  const canViewRole = usePermission("view_group");
  const canCreateRole = usePermission("add_group");
  const canUpdateRole = usePermission("change_group");
  const canDeleteRole = usePermission("delete_group");
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState(false);
  const [editUserData, setEditUserData] = useState(null);
  const [page, setPage] = useState(1);
  const [searchquery, setsearchquery] = useState("");
  const { data, isFetching } = useListQuery({
    page: page,
    search: searchquery,
  });

  const [deletePermissionRequest] = useDeleteCreatedPermissionsMutation();
  const [assignRoleToUserModal, setAssignRoleToUserModal] = useState(false);
  const handleUpdateRole = (rowData) => {
    if (rowData.role) {
      setEditUserData(rowData);
      setAssignRoleToUserModal(true);
    } else {
      navigate(`/updaterole/${rowData.id}?username=${rowData.username}`, {
        state: { userData: rowData },
      });
    }
  };
  const handleDeleteRequest = async (id) => {
    const res = await deletePermissionRequest(id);
    ExceptionHanlder(res);
    setIsloading(false);
  };

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
          justifyContent: "space-between",
          alignItems: "center",
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
          Roles Management
        </Typography>
        {canCreateRole && (
          <Box>
            <Button
              variant="contained"
              onClick={() => navigate("/createRole")}
              sx={{ textTransform: "capitalize" }}
            >
              Create Role
            </Button>
            <Button
              variant="contained"
              sx={{ marginLeft: "10px", textTransform: "capitalize" }}
              onClick={() => setAssignRoleToUserModal(true)}
            >
              Assign Role
            </Button>
          </Box>
        )}
      </Box>

      <Box className="searchbar_main">
        <SearchBar
          onSearch={handleSearch}
          TooltipText="Search By : Title,User name,Email"
        />
      </Box>

      <TableContainer component={Paper} sx={{ marginTop: "10px" }}>
        {isFetching ? (
          <TableSkeleton />
        ) : (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#9277F7" }}>
                <StyledTableCell align="left">Title</StyledTableCell>
                <StyledTableCell align="left">User Name</StyledTableCell>
                <StyledTableCell align="left">Email</StyledTableCell>
                <StyledTableCell align="left"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.results && data?.results.length > 0 ? (
                <>
                  {data?.results?.map((row) => (
                    <StyledTableRow
                      key={row.role_name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <StyledTableCell align="left">
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="start"
                          columnGap={2}
                        >
                          {/* <Avatar alt="Remy Sharp" src={logo}></Avatar> */}
                          <Typography variant="body1">
                            {row.role_name}
                          </Typography>
                        </Box>{" "}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.username}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.email}
                      </StyledTableCell>
                      <StyledTableCell>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-evenly",
                          }}
                        >
                          {canUpdateRole && (
                            <Button
                              variant="contained"
                              onClick={() => handleUpdateRole(row)}
                              sx={{ textTransform: "capitalize" }}
                            >
                              Update
                            </Button>
                          )}
                          {canDeleteRole && (
                            <LoadingButton
                              variant="contained"
                              sx={{
                                backgroundColor: "#D11A2A",
                                textTransform: "capitalize",
                                "&:hover": {
                                  backgroundColor: "#D11A2A",
                                },
                              }}
                              onClick={() => handleDeleteRequest(row.id)}
                              loading={isLoading}
                            >
                              Delete
                            </LoadingButton>
                          )}
                        </Box>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </>
              ) : (
                <>
                  <StyledTableRow>
                    <StyledTableCell colSpan={8} align="center">
                      No data found.
                    </StyledTableCell>
                  </StyledTableRow>
                </>
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
      <RoleAssign
        open={assignRoleToUserModal}
        setOpen={setAssignRoleToUserModal}
        editUserData={editUserData}
        setEditUserData={setEditUserData}
      />
    </>
  );
};

export default RoleManagement;
