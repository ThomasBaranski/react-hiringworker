import React, { useCallback, useState } from "react";
import styled from "@emotion/styled";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import logo from "../../../assets/images/skillprofile.png";
import pipe from "../../../assets/images/pixabay.png";
import user from "../../../assets/images/plumb.png";
import Machine from "../../../assets/images/machine.png";
import { useFindByIdQuery } from "../../../redux/services/skillworker.service";
import { useLocation, useParams } from "react-router-dom";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { downloadExcel } from "react-export-table-to-excel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CancelIcon from "@mui/icons-material/Cancel";
import ImageViewer from "react-simple-image-viewer";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: "200px",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
  borderRadius: "16px",
};

const ImageViewerMain = styled("div")(({ theme }) => ({
  "& .styles-module_close__2I1sI": {
    opacity: 1,
  },
}));

// Rating:
// Total rating:
const customerData = [
  // {
  //   key: 1,
  //   label: "Sr Id:",
  //   name: "#1234",
  // },
  {
    key: 2,
    label: "User Id:",
    name: "012345",
    dataKey: "singleUserData?.user?.id",
  },
  {
    key: 3,
    label: "User Name:",
    name: "Luis Benjamin",
    dataKey: "singleUserData?.user?.username",
  },
  {
    key: 4,
    label: "Email:",
    name: "laminjallow@gmail.com",
    dataKey: "singleUserData?.user?.email",
  },
  {
    key: 5,
    label: "First Name:",
    name: "Luis",
    dataKey: "singleUserData?.user?.first_name",
  },
  {
    key: 6,
    label: "Last Name:",
    name: "Benjamin",
    dataKey: "singleUserData?.user?.last_name",
  },
  {
    key: 645,
    label: "Gender:",
    name: "gender",
    dataKey: "singleUserData?.user?.gender",
  },
  {
    key: 7,
    label: "Date of Birth:",
    name: "25/12/21",
    dataKey: "singleUserData?.user?.date_of_birth",
  },
  {
    key: 8,
    label: "Phone No:",
    name: "+220 7163151",
    dataKey: "singleUserData?.user?.phone_number",
  },
  {
    key: 9,
    label: "Age Consent:",
    name: "18",
    dataKey: "singleUserData?.user?.age_consent",
  },
  {
    key: 11,
    label: "State:",
    name: "Cluj-Napoca",
    dataKey: "singleUserData?.user?.state",
  },
  {
    key: 10,
    label: "City:",
    name: "Transylvani",
    dataKey: "singleUserData?.user?.city",
  },
  {
    key: 12,
    label: "Country:",
    name: "Romania",
    dataKey: "singleUserData?.user?.country",
  },
  {
    key: 13,
    label: "Occupation:",
    name: "Transylvani",
    dataKey: "singleUserData?.occupation?.name",
  },
  {
    key: 14,
    label: "Quick Description:",
    name: "Cluj-Napoca",
    dataKey: "singleUserData?.description",
  },
  {
    key: 15,
    label: "Rating:",
    name: "Rating",
    dataKey: "singleUserData?.average_star_rating",
  },
  {
    key: 16,
    label: "Total rating:",
    name: "Totalrating",
    dataKey: "singleUserData?.total_rating",
  },
  {
    key: 17,
    label: "Total Earning:",
    name: "total_earning",
    dataKey: "singleUserData?.total_earning",
  },
  {
    key: 18,
    label: "Total Withdrawal Amount:",
    name: "total_withdrawal_amount",
    dataKey: "singleUserData?.total_withdrawal_amount",
  },
  {
    key: 19,
    label: "Currency Code:",
    name: "currency_code",
    dataKey: "singleUserData?.currency_code",
  },
];

// console.log("customerData", customerData);
const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "green",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "16px ",
    color: "black",
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "21.79px",

    "& input": {
      textTransform: "capitalize",
    },
    "& fieldset": {
      borderColor: "#9277F7",
      textTransform: "capitalize",
    },
    "&:hover fieldset": {
      borderColor: "#9277F7",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#9277F7",
    },
    input: {
      "&::placeholder": {
        textOverflow: "ellipsis !important",
        // color: "#9277F780",
        color: "#9277F780",
        fontWeight: "500",
        fontsize: "14px",
        lineHeight: "22.4px",
      },
    },
  },
});
const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "16px",
    backgroundColor: "#9277F7",
    color: "white",
    border: "2px solid #9277F7",
  },
  "&:hover fieldset": {
    borderColor: "yellow",
  },
  // input: {
  //   width: { xs: "90%", sm: "320px" },
  //   backgroundColor: "#9277F7",
  // },
});
const isValidEntry = (cellData) => cellData ?? "N/A";

const Withdrawalskilledworker = () => {
  const { id } = useParams();
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const { data = {} } = useFindByIdQuery(id);

  const singleUserData = data;
  const [open, setOpen] = useState(false);
  const [prifile, setProfile] = useState("");
  const handleDownloadExcel = () => {
    const header = [
      "Sr Id",
      "User Id",
      "User Name",
      "Email",
      "First Name",
      "Last Name",
      "Date of Birth",
      "Phone No",
      "Age Consent",
      "City",
      "State",
      "Country",
      "Occupation",
      "Quick Description",
      "Done Orders",
      "Earnings",
      "Balance",
    ];
    const body = [
      {
        "Sr Id": singleUserData?.user?.id,
        "User Id": singleUserData?.user?.id,
        "User Name": singleUserData?.user?.username,
        Email: singleUserData?.user?.email,
        "First Name": singleUserData?.user?.first_name,
        "Last Name": singleUserData?.user?.last_name,
        "Date of Birth": singleUserData?.user?.date_of_birth,
        "Phone No": singleUserData?.user?.phone_number,
        "Age Consent": singleUserData?.user?.age_consent,
        City: singleUserData?.user?.city,
        State: singleUserData?.user?.state,
        Country: singleUserData?.user?.country,
        Occupation: singleUserData?.occupation?.name,
        "Quick Description": singleUserData?.user?.quick_description,
        "Done Orders": singleUserData?.user?.done_orders,
        Earnings: singleUserData?.user?.earnings,
        Balance: singleUserData?.user?.balance,
      },
    ];

    // singleUserData?.map((row) =>
    //   body.push([
    //     eval(row?.id),
    //     row?.user?.id,
    //     row?.user?.username,
    //     row?.user?.email,
    //     row?.user?.first_name,
    //     row?.user?.last_name,
    //     row?.user?.date_of_birth,
    //     row?.user?.phone_number,
    //     row?.user?.age_consent,
    //     row?.user?.city,
    //     row?.user?.state,
    //     row?.user?.country,
    //     row?.occupation?.name,
    //     row?.user?.quick_description,
    //     row?.user?.done_orders,
    //     row?.user?.earnings,
    //     row?.user?.balance,
    //   ])
    // );
    downloadExcel({
      fileName: "Skill_Worker.xls",
      sheet: "Skill_Worker.xls",
      tablePayload: { header, body: body },
    });
  };

  const openImageComponent = (data) => {
    // console.log("clicked", data?.picture_url);
    setOpen(true);
    setProfile(data?.picture_url);
  };
  const handleClose = () => setOpen(false);
  const preventContextMenu = (event) => {
    event.preventDefault();
  };

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);
  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const attachmentLinks =
    data?.portfolio?.map((item) => item?.picture_url) || [];
  console.log(
    "🚀 ~ file: Withdrawalskilledworker.js:238 ~ Withdrawalskilledworker ~ data:",
    data
  );
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
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
          {/* {data?.message} */}
          Skilled Worker
        </Typography>
        <Avatar
          alt="Remy Sharp"
          // onClick={openImageComponent}
          src={
            data?.user?.profile_picture_url
              ? data?.user?.profile_picture_url
              : null
          }
          // onContextMenu={preventContextMenu}
          sx={{
            marginRight: "100px",
            // cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          {/* <IconButton sx={{ position: "absolute", top: 10, right: 10 }}>
            <VisibilityIcon />
          </IconButton> */}
        </Avatar>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton
            sx={{ position: "absolute", top: 0, right: 10 }}
            onClick={handleClose}
          >
            <CancelIcon />
          </IconButton>
          <img
            src={
              data?.user?.profile_picture_url
                ? data?.user?.profile_picture_url
                : prifile
            }
            onContextMenu={preventContextMenu}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              width: "500px",
              height: "100%",
            }}
          />
        </Box>
      </Modal>

      <Grid container spacing={3}>
        {customerData?.map((item) => (
          <Grid item xs={12} sm={6} md={6} lg={6} xl={4}>
            <Typography
              sx={{
                fontWeight: 600,
                fontsize: "24px",
                lineHeight: "24px",
                color: "#000000",
              }}
            >
              {item.label}
            </Typography>
            <CssTextField
              sx={{
                marginTop: "10px",
                fontWeight: 600,
                fontsize: "16px",
                lineHeight: "21.79px",
              }}
              value={isValidEntry(eval(item.dataKey))}
              variant="outlined"
            />
          </Grid>
        ))}

        <br />

        <Grid item xs={4} sm={12}>
          <Typography>Portfolio Picture:</Typography>
          <Box
            sx={{
              width: "100%",
              overflowX: "auto",
              // whiteSpace: "nowrap",
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              "::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {data?.portfolio?.map((item, i) => {
              return (
                <>
                  <Box
                    key={i}
                    sx={{
                      width: "200px",
                      height: "200px",
                      overflow: "hidden",
                      border: "2px solid rgba(146, 119, 247, 1)",
                      borderRadius: "8px",

                      "& img": {
                        height: "100%",
                        width: "100%",
                        cursor: "pointer",
                        objectFit: "cover",
                      },
                    }}
                  >
                    <img
                      src={item?.picture_url}
                      onClick={() => openImageViewer(i)}
                      // onContextMenu={preventContextMenu}
                      // onClick={() => openImageComponent(item)}
                    />
                  </Box>
                </>
              );
            })}
          </Box>
        </Grid>
      </Grid>

      <Grid item xs={4} sm={12}>
        <Typography
          sx={{
            fontWeight: 600,
            fontsize: "24px",
            lineHeight: "24px",
            marginTop: "40px",
            marginBottom: "20px",
          }}
        >
          Certificates:
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {data?.certification?.map((item) => (
            <Card
              sx={{
                width: 348,
                height: 134,
                marginBottom: "30px",
                borderRadius: "12px",
                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                marginRight: "24px",
              }}
            >
              <CardContent>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontsize: "24px",
                    lineHeight: "24px",
                    color: "#000000",
                  }}
                  color="text.secondary"
                  gutterBottom
                >
                  {item?.type_for_display}:
                </Typography>
                <Typography>{item.name}</Typography>
                <Typography>{item.description}</Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontWeight: 700, fontSize: "14px" }}>
                    Date From: {item?.from_date}
                  </Typography>
                  <Typography sx={{ fontWeight: 700, fontSize: "14px" }}>
                    Date To: {item?.to_date}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Grid>

      {isViewerOpen && (
        <ImageViewerMain>
          <ImageViewer
            src={attachmentLinks}
            currentIndex={currentImage}
            disableScroll={false}
            closeOnClickOutside={true}
            onClose={closeImageViewer}
            closeButtonStyle={{ color: "white", opacity: 1 }}
          />
        </ImageViewerMain>
      )}
    </>
  );
};

export default Withdrawalskilledworker;
