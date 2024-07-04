import React, { useState } from "react";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../components/common/StyledTable";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Typography,
  Pagination,
  PaginationItem,
  Stack,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {
  useDeleteListedRoleMutation,
  useGetCreatedPermissionsQuery,
  useRoleListQuery,
} from "../../redux/services/roleManagement/roleManagement.service";
import { LoadingButton } from "@mui/lab";
import CancelIcon from "@mui/icons-material/Cancel";
import { toast } from "react-hot-toast";
import TableSkeleton from "../../utils/tableSkeleton/TableSkeleton";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import SearchBar from "../../components/common/searchbar/SearchBar";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const SubTabRole = () => {
  const [searchquery, setsearchquery] = useState("");
  const [page, setPage] = useState(1);
  const { data, isLoading: pageLoading } = useRoleListQuery({
    page: page,
    search: searchquery,
  });

  const [deleteListedRole, { isLoading }] = useDeleteListedRoleMutation();
  const [delModal, setDelModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [id, setId] = useState("");

  const DeleteBoxOpen = (id) => {
    setAnchorEl(null);

    setDelModal(true);

    setId(id);
  };
  const handleCloseDelBox = () => {
    setDelModal(false);
  };
  const delObject = async () => {
    const res = await deleteListedRole(id);

    if (res?.data?.message) {
      toast.success(res?.data?.message);
      setDelModal(false);
    }
    if (res?.error) {
      toast.error(res?.error?.data?.detail);
      setDelModal(false);
    }
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
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: "40px",
          lineHeight: "64px",
          color: "#594DA0",
        }}
      >
        Role List Management
      </Typography>
      <Box className="searchbar_main">
        <SearchBar onSearch={handleSearch} TooltipText="Search By : Name " />
      </Box>
      <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
        {pageLoading ? (
          <TableSkeleton />
        ) : (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#9277F7" }}>
                <StyledTableCell sx={{}}>Role ID</StyledTableCell>
                <StyledTableCell align="center">Name</StyledTableCell>

                <StyledTableCell align="center">Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ width: "100%" }}>
              {data?.results?.map((row) => (
                <StyledTableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row">
                    {row.id}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.name}</StyledTableCell>

                  <StyledTableCell align="center">
                    <Button
                      onClick={() => DeleteBoxOpen(row.id)}
                      sx={{
                        color: "white",
                        backgroundColor: "#D11A2A",
                        fontSize: "16px",
                        fontWeight: 700,
                        "&:hover": {
                          backgroundColor: "#D11A2A",
                        },
                      }}
                    >
                      Delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}

              {data?.results && data?.results?.length === 0 && (
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

      {data?.results?.length > 0 && (
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
      <Modal
        open={delModal}
        onClose={handleCloseDelBox}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: { xs: "100%", sm: "571px" },
            borderRadius: "16px",
          }}
        >
          <IconButton
            onClick={handleCloseDelBox}
            aria-label="settings"
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              color: "#000000",
            }}
          >
            <CancelIcon />
          </IconButton>
          <Typography
            sx={{
              fontWeight: "700",
              fontSize: "40px",
              lineHeight: "64px",
              textAlign: "center",
              color: "#594DA0",
            }}
          >
            Delete Role
          </Typography>

          <Typography
            sx={{
              fontWeight: "600",
              fontSize: "24px",
              lineHeight: "24px",
              textAlign: "center",
            }}
          >
            You want to delete this role,
            <br /> are you sure?
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px",
            }}
          >
            <Button
              variant="contained"
              sx={{
                width: "230px",
                height: "56px",
                borderRadius: "16px",
                textTransform: "capitalize",
              }}
              onClick={() => setDelModal(false)}
            >
              Cancel
            </Button>
            <LoadingButton
              variant="contained"
              loading={isLoading}
              sx={{
                width: "230px",
                height: "56px",
                borderRadius: "16px",
                backgroundColor: "#D9574C",
                "&:hover": {
                  backgroundColor: "#D9574C",
                },
                textTransform: "capitalize",
              }}
              onClick={delObject}
            >
              Delete
            </LoadingButton>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default SubTabRole;
