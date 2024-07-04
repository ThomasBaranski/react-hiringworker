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
  Box,
  Button,
  IconButton,
  Modal,
  Pagination,
  PaginationItem,
  Stack,
  Typography,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import {
  useCustomerListQuery,
  useLazyCustomerListLazyQuery,
  useLazyCustomerListQuery,
} from "../../redux/services/customer.service";
import AddIcon from "@mui/icons-material/Add";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { DataGrid, GridToolbar, GridToolbarExport } from "@mui/x-data-grid";
import { set } from "react-hook-form";
import { downloadExcel } from "react-export-table-to-excel";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import CustomFileUpload from "../../components/common/customFileUpload/CustomeFileUpload";
import CancelIcon from "@mui/icons-material/Cancel";
import { LoadingButton } from "@mui/lab";
import { useImportCsvMutation } from "../../redux/services/import.service";
import { Formik } from "formik";
import { toast } from "react-hot-toast";
import { saveAs } from "file-saver";
import XLSX from "xlsx";
import TableSkeleton from "../../utils/tableSkeleton/TableSkeleton";
import CreateCustomer from "./CreateCustomer";
import DeleteCustomer from "./DeleteCustomer";
import usePermission from "../../utils/permissionHandler/PermissionHandler";
import { useSelector } from "react-redux";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import SearchBar from "../../components/common/searchbar/SearchBar";
import FilterDropdown from "../../components/common/searchbar/FilterDropdown";
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
// Write a function to find the maximum and minimum number in an array

const Customer = () => {
  const permissionsData = useSelector((state) => state?.Permissions);
  const [FilterOption, setFilterOptions] = useState("");
  const canViewCustomer = usePermission("view_customer");
  const canCreateCustomer = usePermission("add_customer");
  const canUpdateCustomer = usePermission("change_customer");
  const canDeleteCustomer = usePermission("delete_customer");
  const [getAllUsers, { isLoading }] = useLazyCustomerListLazyQuery();
  const [importCsv] = useImportCsvMutation();
  const [dataRows, setDataRows] = useState([]);
  const [modal, setModal] = useState(false);
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const [searchquery, setsearchquery] = useState("");

  const [page, setPage] = useState(1);
  const { data: getData, isLoading: pageLoading } = useCustomerListQuery({
    page_size: 10,
    page: page,
    search: searchquery,
    is_phone_number_verified:
      FilterOption === "is_phone_number_verified"
        ? true
        : FilterOption === "is_phone_number_Unverified"
        ? false
        : "",
    is_email_verified:
      FilterOption === "is_email_verified"
        ? true
        : FilterOption === "is_email_unverified"
        ? false
        : "",
    email_subscription: FilterOption === "email_subscription" ? true : "",
  });

  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [delModal, setDelModal] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const redirect = useNavigate();
  const openAddModal = () => {
    redirect("/customercreate");
  };

  const openEditModal = (id) => {
    navigate(`/editcustomer/${id}`);
  };

  const handleChange = (event, value) => {
    setPage(value);
  };
  // async function fetchData() {
  //   const res = await getData({ page_size: 10, page: page });
  //   setData(res?.data);
  // }
  useEffect(() => {
    setData(getData);
  }, [getData, page, FilterOption]);

  useEffect(() => {
    let temp = data?.results?.map((item) => ({
      id: item?.id,
      username: item?.user?.username,
      email: item?.user?.email,
      no_of_orders: item?.no_of_orders,
      country: item?.user?.country,
    }));
    setDataRows(temp);
  }, [data?.results]);
  //console.log("dataRows", dataRows);//
  const openDetails = (id) => {
    navigate(`/customerdetails/${id}`);
  };

  const downloadXLSX = async () => {
    // Create a workbook and worksheet
    const { data } = await getAllUsers();

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
    saveAs(fileData, "Customer_Management.xlsx");
  };
  const handleUploadExcel = () => {
    // console.log("clicked");
    setModal(true);
  };
  const handleCloseUploadExcel = () => {
    setModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image);
    const { data, error } = await importCsv(formData);
    if (error) {
      return console.log("error", error);
    }
    setModal(false);
    toast.success(data?.message);
    toast.error(Object.values(data?.error_message));
  };
  const openDelModal = (rowData) => {
    setDelModal(true);
    setDeleteData(rowData);
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

  const FilterOptions = [
    { label: "Please select", value: "" },
    { label: "Verified Phone Number", value: "is_phone_number_verified" },
    { label: "UnVerified Phone Number", value: "is_phone_number_Unverified" },
    { label: "Verified Email", value: "is_email_verified" },
    { label: "UnVerified Email", value: "is_email_unverified" },
    { label: "Email Subscription", value: "email_subscription" },
  ];

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
            width: "544px",
            height: "64px",
            fontWeight: "700",
            fontSize: "40px",
            lineHeight: "64px",
            color: "#594DA0",
          }}
        >
          Customer Management
        </Typography>
        {/* {!canViewCustomer && ( */}

        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {permissionsData?.user_type === "admin" && (
            <Box>
              {/* <LoadingButton
            variant="contained"
            onClick={handleUploadExcel}
            sx={{
              columnGap: 1,
              textTransform: "capitalize",
              width: "176px",
              height: "44px",
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: "38.13px",
              borderRadius: "8px",
              marginRight: "20px",
              "&:hover": {
                backgroundColor: "#9277F7",
              },
            }}
          >
            <FileDownloadOutlinedIcon
              fontSize="large"
              sx={{ width: "24px", height: "24px" }}
            />
            Import
          </LoadingButton> */}
              <LoadingButton
                variant="contained"
                loading={isLoading}
                // onClick={handleDownloadExcel}
                onClick={downloadXLSX}
                sx={{
                  textTransform: "capitalize",
                  // height: "44px",
                  fontSize: "14px",
                  fontWeight: 500,
                  // lineHeight: "38.13px",
                  borderRadius: "8px",
                  padding: "6px 16px !important",
                  width: "140px",
                  gap: "8px",
                  "&:hover": {
                    backgroundColor: "#9277F7",
                  },
                }}
              >
                <FileUploadOutlinedIcon sx={{ fontSize: "25px" }} />
                Export
              </LoadingButton>
            </Box>
          )}
          {canCreateCustomer && (
            <Button
              variant="contained"
              onClick={openAddModal}
              sx={{
                textTransform: "capitalize",
                padding: "6px 16px !important",
                borderRadius: "8px",
                // height: "44px",
                gap: "8px",
                width: "140px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              <AddIcon sx={{ fontSize: "25px" }} />
              Add User
            </Button>
          )}
        </Box>
      </Box>

      <Box className="searchbar_main">
        <FilterDropdown
          FilterOptions={FilterOptions}
          setFilterOptions={setFilterOptions}
          FilterOption={FilterOption}
        />
        <SearchBar
          onSearch={handleSearch}
          TooltipText="Search by : User name, Email, Country"
        />
      </Box>

      <TableContainer
        component={Paper}
        sx={{ minWidth: 700, marginTop: "20px" }}
      >
        {pageLoading ? (
          <TableSkeleton />
        ) : (
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>User ID</StyledTableCell>
                <StyledTableCell align="center">User Name</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
                <StyledTableCell align="center">Gender</StyledTableCell>
                <StyledTableCell align="center">Verified </StyledTableCell>
                <StyledTableCell align="center">Orders</StyledTableCell>
                <StyledTableCell align="center">Country</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.results && data?.results?.length > 0 ? (
                data?.results?.map((row) => {
                  const isValifide =
                    row?.user?.is_email_verified ||
                    row?.user?.is_phone_number_verified;

                  return (
                    <>
                      <StyledTableRow key={row?.name}>
                        <StyledTableCell component="th" scope="row">
                          {isValidEntry(row?.user?.id)}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {isValidEntry(row?.user?.username)}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {isValidEntry(row?.user?.email?.toLowerCase())}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {isValidEntry(row?.user?.gender)}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          {isValifide ? (
                            <>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",

                                  color: "#fff",
                                }}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    background: "green",
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "50px",
                                    color: "#fff",
                                  }}
                                >
                                  <CheckIcon />
                                </Box>
                              </Box>
                            </>
                          ) : (
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",

                                color: "#fff",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  background: "red",
                                  width: "30px",
                                  height: "30px",
                                  borderRadius: "50px",
                                  color: "#fff",
                                }}
                              >
                                <ClearIcon />
                              </Box>
                            </Box>
                          )}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {isValidEntry(row?.order)}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {isValidEntry(row?.user?.country)}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              gap: "8px",
                            }}
                          >
                            {canUpdateCustomer && (
                              <Button
                                sx={{
                                  backgroundColor: "green",
                                  color: "white",
                                  textTransform: "capitalize",
                                  "&:hover": {
                                    backgroundColor: "green",
                                    color: "white",
                                  },
                                }}
                                onClick={() => openEditModal(row.id)}
                              >
                                Edit
                              </Button>
                            )}
                            {canDeleteCustomer && (
                              <Button
                                sx={{
                                  backgroundColor: "#D11A2A",
                                  color: "white",
                                  textTransform: "capitalize",
                                  "&:hover": {
                                    backgroundColor: "#D11A2A",
                                    color: "white",
                                  },
                                }}
                                onClick={() => openDelModal(row)}
                              >
                                Delete
                              </Button>
                            )}
                          </Box>
                        </StyledTableCell>

                        {canViewCustomer && (
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
                        )}
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
      <DeleteCustomer
        open={delModal}
        setOpen={setDelModal}
        deleteData={deleteData}
      />

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
            {/* {page} */}
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

      <Modal
        open={modal}
        onClose={handleCloseUploadExcel}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: "571px", borderRadius: "16px" }}>
          <form onSubmit={handleSubmit}>
            <IconButton
              onClick={handleCloseUploadExcel}
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
              validator={["text/csv"]}
              uploadText="Upload CSV File"
              maxUploadSizeMB={2}
              property={true}
              borderRadius="24px"
              width="100%"
              setImage={setImage}
              errorMessage="Only CSV files are allowed"
            />
            {/* {console.log(image)} */}
            <LoadingButton
              variant="contained"
              fullWidth
              sx={{ marginTop: "10px", textTransform: "capitalize" }}
              // onClick={handleUploadCsv}
              type="submit"
            >
              Upload Csv
            </LoadingButton>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default Customer;
