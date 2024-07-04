import React, { useEffect } from "react";
import { Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { useRef } from "react";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useState } from "react";
// import AWS from "aws-sdk";
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import CancelIcon from "@mui/icons-material/Cancel";
// import Cross from "../../../public/assets/icons/cross.svg";

// AWS.config.update({
//   accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
//   secretAccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY_SECRET,
// });

const CustomFileUpload = ({
  setS3Url,
  borderRadius,
  width,
  practitioner,
  uploadingToS3,
  name,
  setImage,
  editData,
  validator = ["image/jpeg", "image/png", "image/svg+xml"],
  uploadText = "Image Upload",
  errorMessage = "Only jpg and png and svg files are allowed",
}) => {
  const belowSm = useMediaQuery((theme) =>
    theme.breakpoints.between("xs", "sm")
  );
  const [file, setFile] = useState("");
  const [userData, setuserData] = useState({});
  const [fileType, setFileType] = useState("");
  const [fileName, setFileName] = useState("");
  const [iframeSize, setIframeSize] = useState(["auto", "100%"]);
  const [iframeStyle, setIframeStyle] = useState({
    zIndex: 50,
    width: belowSm ? "100%" : "auto",
    height: "100%",
  });
  const [showExitLargeScreenIcon, setShowExitLargeScreenIcon] = useState(false);
  const [showEyeIcon, setShowEyeIcon] = useState(false);

  // const [uploadingToS3, setUploadingToS3] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const ref = useRef();
  const isValidFileType = (fileType) => validator?.includes(fileType);
  useEffect(() => {
    // console.log("editData dsdsdsd", editData);
    setImage(editData);
    if (editData) setFile(editData);
  }, [editData]);

  const handleChange = (e) => {
    // console.log("e.target.files[0]?.type", e.target.files[0]?.type);
    if (!isValidFileType(e.target.files[0]?.type)) {
      e.target.value = null;
      toast.error(errorMessage);
      return;
    }
    setImage(e.target.files[0]);
    // setUploadingToS3(true);
    setFileType(e.target.files[0].type);
    setFileName(e.target.files[0].name);
    setFile(URL.createObjectURL(e.target.files[0]));

    e.target.value = null;
  };

  const handleClick = (e) => {
    ref.current.click();
  };
  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    handleChange({
      target: {
        files: files,
      },
    });
    // setFiles(files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy"; // Show "copy" cursor
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          width: isMobile ? "100%" : width ?? "40vw",
          height: isMobile ? "20vh" : "150px",
          //   border: "2px dashed #B731FF",
          border: "2px solid #9277F7",
          borderRadius: borderRadius ?? "4px",
        }}
      >
        <Box
          fullWidth
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          sx={{
            height: "100%",
            width: "100%",
            padding: "0px",
            fontSize: "24px",
            background: "white",
            //   "linear-gradient(94.09deg, #12134D 3.97%, #10053C 51.03%, #12134D 95.99%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: borderRadius ?? "4px",
            cursor:
              practitioner && userData?.user?.role === "Practitioner"
                ? "arrow"
                : "pointer",
          }}
          onClick={handleClick}
        >
          {file == "" ? (
            <Stack alignItems={"center"} spacing={1} direction="row">
              <FileUploadOutlinedIcon
                // color="#594DA0"
                sx={{ fontSize: 30, color: "#594DA0" }}
              />
              <Typography
                variant="subtitle1"
                sx={{ color: "black", opacity: 0.5 }}
              >
                {uploadText}
              </Typography>
            </Stack>
          ) : uploadingToS3 ? (
            <CircularProgress color="primary" />
          ) : fileType == "application/pdf" ? (
            <div
              style={{
                position: "relative",
                height: "inherit",
              }}
            >
              <img
                title="Delete"
                src="/assets/icons/colorCross.svg"
                width="20px"
                height="20px"
                style={{
                  color: "#12134D",
                  position: "absolute",
                  right: "23px",
                  top: "14px",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  if (e && e.stopPropagation) e.stopPropagation();
                  setFile("");
                  setS3Url("");
                  setFileType("");
                  e.target.value = null;
                }}
              />
              <img
                title="Toggle Big Screen"
                src="/assets/icons/colorEye.svg"
                width="30px"
                height="30px"
                style={{
                  position: "absolute",
                  right: belowSm ? "100px" : "140px",
                  top: belowSm ? "25px" : "65px",
                  cursor: "pointer",
                  // color: "#000",
                  // zIndex: 900000,
                }}
                onClick={(e) => {
                  if (e && e.stopPropagation) e.stopPropagation();
                  setIframeStyle((prev) => ({
                    ...prev,
                    position: "fixed",
                    top: "5vh",
                    left: "5vw",
                    height: "90vh",
                    width: "90vw",
                  }));
                  setShowExitLargeScreenIcon(true);
                }}
              />
              {showExitLargeScreenIcon && (
                <img
                  title="Toggle Small View"
                  // color="primary"
                  fontSize="large"
                  src="/assets/icons/colorCross.svg"
                  width="30px"
                  height="30px"
                  style={{
                    // color: "#12134D",
                    position: "fixed",
                    right: "7vw",
                    top: "7vh",
                    cursor: "pointer",
                    zIndex: 900000,
                  }}
                  onClick={(e) => {
                    if (e && e.stopPropagation) e.stopPropagation();
                    setShowExitLargeScreenIcon(false);
                    setIframeStyle({
                      zIndex: 50,
                      width: belowSm ? "100%" : "auto",
                      height: "100%",
                    });
                  }}
                />
              )}

              <iframe
                style={iframeStyle}
                src={file + "#toolbar=0"}
                // onMouseLeave={() =>
                //   setIframeStyle({
                //     zIndex: 50,
                //     width: belowSm ? "50%" : "auto",
                //     height: "100%",
                //   })
                // }
              ></iframe>
            </div>
          ) : fileType == "text/csv" ? (
            fileName
          ) : (
            <img src={file} width="auto" height="100%" />
          )}
        </Box>
        <input
          type="file"
          ref={ref}
          hidden
          name={name}
          width={"100%"}
          height="100%"
          onChange={handleChange}
        />
      </Box>
    </div>
  );
};

export default CustomFileUpload;
