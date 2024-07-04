import React, { useEffect, useState } from "react";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../components/common/StyledTable";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Modal,
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
import MoreVertIcon from "@mui/icons-material/MoreVert";

import ListItemText from "@mui/material/ListItemText";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import DeleteUser from "./DeleteUser";
import { LoadingButton } from "@mui/lab";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import {
  // useLazyStaffListLazyQuery,
  useStaffListQuery,
  useLazyStaffListQuery,
  useStaffListLazyQuery,
  // useStaffListQuery,
} from "../../redux/services/staffManagment.service";
import { downloadExcel } from "react-export-table-to-excel";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import CustomFileUpload from "../../components/common/customFileUpload/CustomeFileUpload";
import { Formik } from "formik";
import CssTextField from "../../components/common/CssTextField";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import TableSkeleton from "../../utils/tableSkeleton/TableSkeleton";
import { saveAs } from "file-saver";
import XLSX from "xlsx";
import { useSelector } from "react-redux";
import usePermission from "../../utils/permissionHandler/PermissionHandler";
import SearchBar from "../../components/common/searchbar/SearchBar";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
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
const Staff = () => {
  const permissionsData = useSelector((state) => state?.Permissions);
  // console.log("state.Permissions?.user_permissions", permissionsData);
  const canViewStaff = usePermission("view_staff");
  const canCreateStaff = usePermission("add_staff");
  const canUpdateStaff = usePermission("change_staff");
  const canDeleteStaff = usePermission("delete_staff");
  const [getAllUsers, { isLoading }] = useLazyStaffListQuery();
  const [searchquery, setsearchquery] = useState("");
  const [page, setPage] = useState(1);
  const { data: res, isLoading: pageLoading } = useStaffListQuery({
    page_size: 10,
    page: page,
    search: searchquery,
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [image, setImage] = useState("");
  const [modal, setModal] = useState(false);
  const [prev, setPrev] = useState(false);
  const [id, setId] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const [data, setData] = useState([]);

  const handleChange = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    setData(res);
  }, [res]);

  const handleClick = (event, id) => {
    setId(id);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const AddModal = () => {
    navigate("/createuser");
  };
  const Edithandle = () => {
    setAnchorEl(null);
    navigate(`/edituser/${id}`);
  };
  const Deletehandle = () => {
    setAnchorEl(null);
    setPrev(true);
  };
  const ViewProfileHandle = () => {
    setAnchorEl(null);
    navigate(`/viewprofile/${id}`);
  };

  const handleUploadExcel = () => {
    setModal(true);
  };
  const handleCloseExcel = () => {
    setModal(false);
  };

  const downloadXLSX = async () => {
    // Create a workbook and worksheet
    const { data } = await getAllUsers();
    console.log("Skilled Worker Management", data);
    const body = [];
    data?.map((row) =>
      body.push([
        // row?.id,
        row?.user?.id,
        row?.user?.username,
        row?.user?.email,
        row?.order,
        // row?.earning,
        row?.user?.first_name,
        row?.user?.last_name,
        "" + row?.user?.phone_number,
        // row?.user?.age_consent,
        row?.user?.city,
        row?.user?.country,
        "" + row?.user?.date_of_birth,
        row?.user?.profile_picture_url,
        row?.user?.state,
      ])
    );
    console.log("body d", body);
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([
      [
        // "Sr Id",
        "User Id",
        "User Name",
        "Email",
        "Orders",
        // "Balance",
        "First Name",
        "Last Name",
        "Phone Number",
        // "Age Consent",
        "City",
        "Country",
        "Date of Birth",
        "Profile Picture Url",
        "State",
      ], // Example data
      ...body,
    ]);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");

    // Generate the XLSX file
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // Save the file using FileSaver.js
    const fileData = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(fileData, "Staff_Management.xlsx");
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
          Staff Management
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "20px",
            gap: "20px",
          }}
        >
          {canCreateStaff && (
            <Button
              onClick={AddModal}
              variant="contained"
              sx={{
                columnGap: 1,
                textTransform: "capitalize",
                width: "176px",
                height: "44px",
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "38.13px",
                borderRadius: "8px",

                "&:hover": {
                  backgroundColor: "#9277F7",
                },
              }}
            >
              <PersonAddAltRoundedIcon
                fontSize="large"
                sx={{ width: "24px", height: "24px" }}
              />
              <Typography>Create User</Typography>
            </Button>
          )}
          {permissionsData?.user_type === "admin" && (
            <LoadingButton
              variant="contained"
              loading={isLoading}
              // onClick={handleDownloadExcel}
              onClick={downloadXLSX}
              sx={{
                columnGap: 1,
                textTransform: "capitalize",
                width: "200px",
                height: "45px",
                fontSize: "28px",
                fontWeight: 600,
                lineHeight: "38.13px",
                display: "flex",
                borderRadius: "8px",
                alignItems: "center",
                justifyContent: "center",
                "&:hover": {
                  backgroundColor: "#9277F7",
                },
              }}
            >
              <FileUploadOutlinedIcon fontSize="large" />

              <Typography>Export</Typography>
            </LoadingButton>
          )}
        </Box>
      </Box>

      <Box className="searchbar_main">
        <SearchBar
          onSearch={handleSearch}
          TooltipText="Search by : User name, Email , Country"
        />
      </Box>

      <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
        {pageLoading ? (
          <TableSkeleton />
        ) : (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#9277F7" }}>
                <StyledTableCell align="left"> User ID</StyledTableCell>
                <StyledTableCell align="left">User Name</StyledTableCell>
                <StyledTableCell align="left">Email</StyledTableCell>
                <StyledTableCell align="left">Gender</StyledTableCell>
                <StyledTableCell align="left">DOB</StyledTableCell>
                <StyledTableCell align="left">Country</StyledTableCell>
                <StyledTableCell align="left">Kiosk Branch</StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.results && data?.results?.length > 0 ? (
                <>
                  {data?.results?.map((row) => {
                    return (
                      <>
                        <StyledTableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          {/* {console.log("mappppp", row)} */}
                          <StyledTableCell align="left">
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="start"
                              columnGap={2}
                            >
                              {/* <Avatar
                        alt="Remy Sharp"
                        src={row?.user?.profile_picture_url}
                      ></Avatar> */}
                              <Typography variant="body1">{row?.id}</Typography>
                            </Box>
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row?.user?.username}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row?.user?.email.toLowerCase()}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row?.user?.gender ? row?.user?.gender : "N/A"}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row?.user?.date_of_birth}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row?.user?.country}
                          </StyledTableCell>
                          <StyledTableCell>
                            {row?.user?.kiosk_branch}
                          </StyledTableCell>
                          <StyledTableCell>
                            <IconButton
                              id="basic-button"
                              aria-controls={open ? "basic-menu" : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? "true" : undefined}
                              onClick={(e) => handleClick(e, row.id)}
                            >
                              <MoreVertIcon />
                            </IconButton>
                          </StyledTableCell>
                        </StyledTableRow>
                      </>
                    );
                  })}
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

      {data?.results?.length > 0 && (
        <Stack
          direction="row"
          justifyContent="flex-end"
          marginTop="56px"
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
                sx={{ color: "#000000" }}
                slots={{ previous: ArrowLeftIcon, next: ArrowRightIcon }}
                {...item}
              />
            )}
          />
        </Stack>
      )}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {canDeleteStaff && (
          <MenuItem onClick={Deletehandle}>
            <ListItemIcon color="#594DA0">
              <DeleteOutlineIcon fontSize="small" color="#594DA0" />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        )}
        {canViewStaff && (
          <MenuItem onClick={ViewProfileHandle}>
            <ListItemIcon>
              <VisibilityIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>View</ListItemText>
          </MenuItem>
        )}
        {canUpdateStaff && (
          <MenuItem onClick={Edithandle}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
        )}
      </Menu>
      <Modal
        open={modal}
        onClose={handleCloseExcel}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: "571px", borderRadius: "16px" }}>
          <IconButton
            onClick={handleCloseExcel}
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
            align="center"
            sx={{
              fontWeight: "700",
              fontSize: "40px",
              lineHeight: "64px",
              color: "#594DA0",
            }}
          >
            Import CSV File
          </Typography>
          <CustomFileUpload
            maxUploadSizeMB={2}
            property={true}
            borderRadius="24px"
            width="100%"
            setImage={setImage}
            // editData={values.image}
          />
          <LoadingButton
            variant="contained"
            fullWidth
            sx={{ marginTop: "10px" }}
          >
            Upload Csv
          </LoadingButton>
        </Box>
      </Modal>
      <DeleteUser setPrev={setPrev} prev={prev} id={id} />
    </>
  );
};

export default Staff;
