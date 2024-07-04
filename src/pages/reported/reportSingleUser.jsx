import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";
import CssTextField from "../../components/common/CssTextField";
import { isValidEntry } from "../../utils/ValidFormEntry";
import { useParams } from "react-router-dom";
import { useGetSingleReportedUserQuery } from "../../redux/services/reportedUser.service";
import { TextareaAutosize, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import ImageViewer from "react-simple-image-viewer";

const CustomTextarea = styled(TextareaAutosize)(({ theme }) => ({
  width: "100%",
  padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  fontSize: "16px",
  resize: "none",
  maxHeight: "300px",
  overflowY: "scroll",
}));
const ImageViewerMain = styled("div")(({ theme }) => ({
  "& .styles-module_close__2I1sI": {
    opacity: 1,
  },
}));

// const reportedUser = [
//   {
//     key: 1,
//     label: "Sr Id:",
//     name: "#1234",
//   },
//   {
//     key: 2,
//     label: "User Id:",
//     name: "012345",
//   },
//   {
//     key: 3,
//     label: "User Name:",
//     name: "Luis Benjamin",
//   },
//   {
//     key: 4,
//     label: "Email:",
//     name: "laminjallow@gmail.com",
//   },
//   {
//     key: 5,
//     label: "First Name:",
//     name: "Luis",
//   },
//   {
//     key: 6,
//     label: "Last Name:",
//     name: "Benjamin",
//   },
//   {
//     key: 7,
//     label: "Date of Birth:",
//     name: "25/12/21",
//   },
//   {
//     key: 8,
//     label: "Phone No:",
//     name: "+220 7163151",
//   },
//   {
//     key: 9,
//     label: "Age Consent:",
//     name: "18",
//   },
//   {
//     key: 10,
//     label: "State:",
//     name: "Transylvani",
//   },
//   {
//     key: 11,
//     label: "City:",
//     name: "Cluj-Napoca",
//   },
//   {
//     key: 12,
//     label: "Country:",
//     name: "Romania",
//   },
//   {
//     key: 13,
//     label: "Balance:",
//     name: "$3245.00",
//   },
//   {
//     key: 14,
//     label: "Orders :",
//     name: "312",
//   },
//   {
//     key: 15,
//     label: "Earnings:",
//     name: "$5412.00",
//   },
// ];
const ReportSingleUser = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetSingleReportedUserQuery(id);

  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [repoteddata, setrepotedData] = useState([]);

  useEffect(() => {
    if (data) {
      setrepotedData(data?.reported);
    }
  }, [data]);
  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);
  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  const attachmentLinks = data?.attachment_links || [];
  console.log(
    "🚀 ~ file: reportSingleUser.jsx:131 ~ ReportSingleUser ~ attachmentLinkszxczxcz:",
    attachmentLinks.map((item) => item?.attachment)
  );

  return (
    <>
      <Box>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "40px",
            lineHeight: "64px",
            color: "#594DA0",
          }}
        >
          Reported User
        </Typography>
      </Box>
      <Grid container spacing={2} sx={{ marginTop: "10px" }}>
        {!isLoading && data && Object.keys(data)?.length > 0 && (
          <>
            {data?.report_time && (
              <Grid item xs={6} md={6} lg={4} xl={4}>
                <Typography
                  sx={{
                    fontWeight: "600",
                    fontSize: "24px",
                    lineHeight: "24px",
                  }}
                >
                  Date
                </Typography>
                <CssTextField
                  value={
                    data?.report_time
                      ? new Date(data?.report_time).toLocaleDateString()
                      : "N/A"
                  }
                  variant="outlined"
                  disabled
                />
              </Grid>
            )}
            {data?.report_time && (
              <Grid item xs={6} md={6} lg={4} xl={4}>
                <Typography
                  sx={{
                    fontWeight: "600",
                    fontSize: "24px",
                    lineHeight: "24px",
                  }}
                >
                  Time
                </Typography>
                <CssTextField
                  value={
                    data?.report_time
                      ? new Date(data?.report_time).toLocaleTimeString(
                          "en-US",
                          { hour12: true }
                        )
                      : "N/A"
                  }
                  variant="outlined"
                  disabled
                />
              </Grid>
            )}
            {data?.reporter && (
              <Grid item xs={6} md={6} lg={4} xl={4}>
                <Typography
                  sx={{
                    fontWeight: "600",
                    fontSize: "24px",
                    lineHeight: "24px",
                  }}
                >
                  Reporter
                </Typography>
                <CssTextField
                  value={
                    data?.reporter.first_name + " " + data?.reporter?.last_name
                  }
                  variant="outlined"
                  disabled
                />
              </Grid>
            )}
            {data?.reason_type && (
              <Grid item xs={6} md={6} lg={4} xl={4}>
                <Typography
                  sx={{
                    fontWeight: "600",
                    fontSize: "24px",
                    lineHeight: "24px",
                  }}
                >
                  Reason
                </Typography>
                <CssTextField
                  value={data?.reason_type}
                  variant="outlined"
                  disabled
                />
              </Grid>
            )}

            {data?.reported &&
              Object?.entries(data.reported).map(([key, value]) => {
                // List of properties to exclude
                const excludedProperties = [
                  "country_code",
                  "currency_code",
                  "user_country_code",
                  "profile_picture_url",
                  "age_consent",
                  "terms_and_condition",
                  "is_phone_number_verified",
                  "is_email_verified",
                  "is_active",
                  "email_subscription",
                  "account_status",
                ];

                // Check if the property is excluded
                if (!excludedProperties.includes(key)) {
                  const formattedKey = key.replace(/_/g, " ");
                  return (
                    <Grid item xs={6} md={6} lg={4} xl={4} key={key}>
                      <Typography
                        sx={{
                          fontWeight: "600",
                          fontSize: "24px",
                          lineHeight: "24px",
                        }}
                      >
                        {formattedKey}
                      </Typography>
                      <CssTextField value={value} variant="outlined" disabled />
                    </Grid>
                  );
                }

                return null; // Exclude this property
              })}
          </>
        )}

        {/* {reportedUser.map((item) => (
          <Grid item xs={6} md={6} lg={4} xl={4}>
            <Typography
              sx={{ fontWeight: "600", fontSize: "24px", lineHeight: "24px" }}
            >
              {item.label}
            </Typography>
            <CssTextField
              //   value={isValidEntry(eval(item.name))}
              value={item.name}
              variant="outlined"
            />
          </Grid>
        ))} */}
      </Grid>
      <Grid
        container
        spacing={2}
        sx={{ marginTop: "10px", marginBottom: "20px" }}
      >
        {!isLoading && data && Object.keys(data).length > 0 && (
          <>
            <Grid item xs={12} md={7} lg={7} xl={7}>
              <Typography
                sx={{
                  fontWeight: "600",
                  fontSize: "24px",
                  lineHeight: "24px",
                }}
              >
                Description
              </Typography>
              <CustomTextarea aria-label="RepotedText" disabled>
                {data?.report_text || ""}
              </CustomTextarea>
            </Grid>
            <Grid
              item
              xs={12}
              md={5}
              lg={5}
              xl={5}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                sx={{
                  backgroundColor: "#9277F7",
                  color: "white",
                  fontSize: "12px",
                  padding: "8px 15px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginTop: "auto",
                  marginBottom: "auto",
                  "&:hover": {
                    backgroundColor: "#9277F7",
                  },
                }}
                onClick={() => openImageViewer(0)}
              >
                View Attachment
              </Button>
            </Grid>
          </>
        )}
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

export default ReportSingleUser;
