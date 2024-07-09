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
  Grid,
  IconButton,
  Modal,
  Pagination,
  PaginationItem,
  Stack,
  TableCell,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

import {
  useDeleteSkilledWorkerReqMutation,
  useFindAllQuery,
  useLazyFindAllQuery,
} from "../../redux/services/skillworker.service";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { downloadExcel } from "react-export-table-to-excel";
import { LoadingButton } from "@mui/lab";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import CustomFileUpload from "../../components/common/customFileUpload/CustomeFileUpload";
import { toast } from "react-hot-toast";
import { useImportCsvMutation } from "../../redux/services/import.service";
import TableSkeleton from "../../utils/tableSkeleton/TableSkeleton";
import { saveAs } from "file-saver";
import XLSX from "xlsx";
import DeleteSkilledWorker from "./DeleteSkilledWorker";
import usePermission from "../../utils/permissionHandler/PermissionHandler";
import { useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import SearchBar from "../../components/common/searchbar/SearchBar";

const Skilled = () => {
  const GetUserType = useSelector((state) => state?.Permissions);
  const canViewSkilledWorker = usePermission("view_skilledworker");
  const canCreateSkilledWorker = usePermission("add_skilledworker");
  const canUpdateSkilledWorker = usePermission("change_skilledworker");
  const canDeleteSkilledWorker = usePermission("delete_skilledworker");
  const [getAllUsers, { isLoading: pagleLoading }] = useLazyFindAllQuery();
  // console.log("without canViewSkilledWorker", canViewSkilledWorker);
  const [importCsv] = useImportCsvMutation();
  const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [searchquery, setsearchquery] = useState("");

  const { data: getData, isLoading: pageLoading } = useFindAllQuery({
    page_size: 10,
    page: page,
    search: searchquery,
  });
  const [image, setImage] = useState("");
  const [modal, setModal] = useState(false);
  const [delModal, setDelModal] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [importIssues, SetImportIssues] = useState([]);
  const [CSVLoading, SetCSVLoading] = useState(false);

  const openProfile = (id) => {
    navigate("/skillprofile/" + id);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    borderRadius: "16px",
    pt: 2,
    px: 4,
    pb: 3,
  };
  const erroDialog = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,

    borderRadius: "16px",
    pt: 2,
    px: 4,
    pb: 3,
  };
  const handleChange = (event, value) => {
    setPage(value);
  };
  // async function fetchData() {
  //   const res = await getData({ page_size: 10, page: page });
  //   // console.log("paginated data", res);
  //   setData(res?.data);
  // }
  useEffect(() => {
    setData(getData);
  }, [getData, page]);
  // useEffect(() => {
  //   fetchData();
  // }, [page]);
  const handleUploadExcel = () => {
    setModal(true);
  };
  const handleCloseUploadExcel = () => {
    setModal(false);
  };
  const handleDownloadExcel = async () => {
    const { data } = await getAllUsers();

    const header = ["Firstname", "Lastname", "Age"];
    const body = [];
    data?.map((row) =>
      body.push([
        row?.id,
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
    downloadExcel({
      fileName: "Skill_Worker",
      sheet: "Skill_Worker.xlsx",
      tablePayload: {
        header,
        body: [
          ["Edison", "Padilla", 14],
          ["Cheila", "Rodrigez", 56],
        ],
      },
    });
  };
  const isValidEntry = (cellData) => cellData ?? "N/A";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!image) {
        throw new Error("Please select a valid file upload.");
      }

      SetCSVLoading(true);
      const formData = new FormData();
      formData.append("file", image);

      const res = await importCsv(formData);

      if (res?.error?.status === 400) {
        // Handle error messages from the server
        // const errors = Object.values(res?.error?.data?.errors);

        setOpen(true);
        SetImportIssues(res?.error?.data?.errors || []);
      }

      if (res?.data?.user_register_success_count > 0 && res?.data?.status) {
        toast.success(
          `${res?.data?.user_register_success_count} users have successfully registered.`
        );
        window.location.reload();
      }

      if (res?.error) {
        throw new Error(res.error.data.message);
      }
    } catch (error) {
      console.log("🚀 ~ file: Skilled.jsx:239 ~ handleSubmit ~ error:", error);
      // toast.error(error.message);
    } finally {
      SetCSVLoading(false);
      setModal(false);
    }
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
        row?.user?.date_created,
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
        "Created Date",
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
    saveAs(fileData, "skilled_workers_list.xlsx");
  };

  const editSkilledWorker = (data) => {
    navigate(`/edit-skilled-worker/${data?.user?.user_id}`);
  };
  const openDelModal = (rowData) => {
    setDelModal(true);
    setDeleteData(rowData);
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
            // width: "544px",
            // height: "64px",
            fontWeight: "700",
            fontSize: "30px",
            lineHeight: "64px",
            color: "#594DA0",
          }}
        >
          {/* {data?.message} */}
          Skilled Worker Management
        </Typography>
        {/* {canViewSkilledWorker && ( */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {GetUserType?.user_type === "admin" && (
            <Box>
              <LoadingButton
                variant="contained"
                onClick={handleUploadExcel}
                sx={{
                  columnGap: 1,
                  textTransform: "capitalize",
                  width: "140px",
                  height: "40px",
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "38.13px",
                  borderRadius: "8px",
                  marginRight: "10px",
                  "&:hover": {
                    backgroundColor: "#9277F7",
                  },
                }}
              >
                <FileDownloadOutlinedIcon
                  fontSize="medium"
                  // sx={{ width: "24px", height: "24px" }}
                />
                Import
              </LoadingButton>
              <LoadingButton
                variant="contained"
                loading={pagleLoading}
                onClick={downloadXLSX}
                sx={{
                  columnGap: 1,
                  textTransform: "capitalize",
                  width: "140px",
                  height: "40px",
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "38.13px",
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: "#9277F7",
                  },
                }}
              >
                <FileUploadOutlinedIcon
                  fontSize="medium"
                  // sx={{ width: "24px", height: "24px" }}
                />
                Export
              </LoadingButton>
            </Box>
          )}
          {canCreateSkilledWorker && (
            <Box>
              <Button
                variant="contained"
                onClick={() => navigate("/skilled-worker")}
                sx={{
                  columnGap: 1,
                  textTransform: "capitalize",
                  width: "140px",
                  height: "40px",
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "38.13px",
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: "#9277F7",
                  },
                }}
              >
                <AddIcon fontSize="medium" />
                Add User
              </Button>
            </Box>
          )}
        </Box>
      </Box>

      <Box className="searchbar_main">
        <SearchBar
          onSearch={handleSearch}
          TooltipText="Search By : User name, Email"
        />
      </Box>

      <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
        {pageLoading ? (
          <TableSkeleton />
        ) : (
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>User ID</StyledTableCell>
                <StyledTableCell>User Name</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Gender</StyledTableCell>
                <StyledTableCell>Orders</StyledTableCell>
                <StyledTableCell>Balance</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell>Created Date</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.results && data?.results?.length > 0 ? (
                <>
                  {data?.results?.map((item) => {
                    return (
                      <>
                        <StyledTableRow key={item?.id + item?.user?.username}>
                          <StyledTableCell component="th" scope="row">
                            {isValidEntry(item?.id)}
                          </StyledTableCell>
                          <StyledTableCell>
                            {isValidEntry(item?.user?.username)}
                          </StyledTableCell>
                          <StyledTableCell>
                            {isValidEntry(item?.user?.email?.toLowerCase())}
                          </StyledTableCell>
                          <StyledTableCell>
                            {isValidEntry(item?.user?.gender)}
                          </StyledTableCell>
                          <StyledTableCell>
                            {isValidEntry(item?.order)}
                          </StyledTableCell>
                          <StyledTableCell>
                            {isValidEntry(item?.balance)}
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
                              {canUpdateSkilledWorker && (
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
                                  onClick={() => editSkilledWorker(item)}
                                >
                                  Edit
                                </Button>
                              )}
                              {canDeleteSkilledWorker && (
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
                                  onClick={() => openDelModal(item)}
                                >
                                  Delete
                                </Button>
                              )}
                            </Box>
                          </StyledTableCell>
                          {canViewSkilledWorker && (
                            <StyledTableCell>
                              <Button
                                variant="contained"
                                // startIcon={<VisibilityIcon />}
                                onClick={() => openProfile(item?.user?.user_id)}
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
                          <StyledTableCell>
                            {isValidEntry(item?.user?.date_created)}
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
                sx={{ color: "#04111D" }}
                slots={{ previous: ArrowLeftIcon, next: ArrowRightIcon }}
                {...item}
              />
            )}
          />
        </Stack>
      )}

      <DeleteSkilledWorker
        open={delModal}
        setOpen={setDelModal}
        deleteData={deleteData}
      />
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
              loading={CSVLoading}
            >
              Upload CSV
            </LoadingButton>
          </form>
        </Box>
      </Modal>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={erroDialog}>
          <IconButton
            onClick={handleClose}
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
            sx={{ fontWeight: 800, fontSize: "34px", color: "#594DA0" }}
          >
            Failed to upload
          </Typography>
          <Box
            sx={{
              height: "300px",
              overflow: "auto",
            }}
          >
            {/* {console.log("importIssues", importIssues)} */}
            {importIssues &&
              importIssues?.map((err) => (
                <>
                  <Box sx={{ color: "red" }}>
                    <Typography>{err}</Typography>
                  </Box>
                </>
              ))}
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Skilled;
