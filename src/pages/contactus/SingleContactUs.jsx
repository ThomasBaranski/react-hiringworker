import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { TextareaAutosize, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import ImageViewer from "react-simple-image-viewer";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useCallback } from "react";
import { useGetContactByIdQuery } from "../../redux/services/contactus.servics";

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
const MainItems = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: "15px",
  gap: "10px",
  h6: {
    color: "#000",
    fontFamily: "Josefin Sans",
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "normal",
    margin: "0",
    textTransform: "capitalize",
  },
  span: {
    color: "#000",
    fontFamily: "Josefin Sans",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
  },
}));

const SingleContactUs = () => {
  const { id } = useParams();
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);
  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };
  const { data, isLoading } = useGetContactByIdQuery(id);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  const attachmentLinks = data?.attachments || [];

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          sx={{
            fontWeight: "700",
            fontSize: "40px",
            lineHeight: "64px",
            color: "#594DA0",
          }}
        >
          Contact Us
        </Typography>
      </Box>

      <Grid
        container
        spacing={2}
        sx={{ marginTop: "10px", marginBottom: "20px" }}
      >
        {!isLoading && data && Object.keys(data).length > 0 && (
          <>
            <Grid item xs={12} md={6} lg={6} xl={6}>
              <MainItems>
                <h6>Name:</h6>
                <span>{data?.name || "N/A"}</span>
              </MainItems>
            </Grid>
            <Grid item xs={12} md={6} lg={6} xl={6}>
              <MainItems>
                <h6> Title:</h6>
                <span>{data?.title || "N/A"}</span>
              </MainItems>
            </Grid>
            <Grid item xs={12} md={12} lg={12} xl={12}>
              <MainItems>
                <h6>Email:</h6>
                <span>{data?.user?.email || "N/A"}</span>
              </MainItems>
            </Grid>
          </>
        )}
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
                Message
              </Typography>
              <CustomTextarea aria-label="RepotedText" disabled>
                {data?.message || ""}
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
                  "&:disabled": {
                    color: "#fff",
                  },
                }}
                onClick={() => openImageViewer(0)}
                disabled={attachmentLinks?.length === 0}
              >
                {attachmentLinks?.length === 0
                  ? "No Attachment"
                  : "View Attachment"}
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

export default SingleContactUs;
