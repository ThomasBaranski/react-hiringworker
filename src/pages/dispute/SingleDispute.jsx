import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { TextareaAutosize, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import ImageViewer from "react-simple-image-viewer";
import { useParams } from "react-router-dom";
import {
  useGetDisputeByIdQuery,
  useUpdateDisputeStatusMutation,
} from "../../redux/services/dispute.service";
import { useState } from "react";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

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

const SelectMain = styled("select")({
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: "27px",
  borderRadius: "5px",
  color: "#000",
});

const SingleDisputePage = () => {
  const GetUserType = useSelector((state) => state?.Permissions);

  const IsUpdateStates = GetUserType?.user_permissions?.some(
    (value) => value.codename === "change_dispute"
  );
  const { id } = useParams();
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [selected, setselected] = useState("pending");
  const [selectedValues, setSelectedValues] = useState("");

  const [UpdateDisputeStatus] = useUpdateDisputeStatusMutation();

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);
  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };
  const { data, isLoading, refetch } = useGetDisputeByIdQuery(id);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  const attachmentLinks =
    data?.serialized_data?.attachments?.map((item) => item?.attachment) || [];

  const handleSelectChange = async (value) => {
    setSelectedValues(value);
  };

  const HandlerStatusChange = async () => {
    if (selectedValues === "resolved") {
      const res = await UpdateDisputeStatus({
        data: selectedValues,
        id: data?.serialized_data?.id,
      });
      if (res?.data?.statusCode === 200) {
        refetch();
        toast.success("Status successfully Updated!");
      }
    }
  };

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
          Dispute Management
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
                <h6>Dispute From:</h6>
                <span>{data?.serialized_data?.disputed_from || "N/A"}</span>
              </MainItems>
            </Grid>{" "}
            <Grid item xs={12} md={6} lg={6} xl={6}>
              <MainItems>
                <h6>Dispute To:</h6>
                <span>{data?.serialized_data?.disputed_to || "N/A"}</span>
              </MainItems>
            </Grid>
            <Grid item xs={12} md={6} lg={6} xl={6}>
              <MainItems>
                <h6>Created Date:</h6>
                <span>
                  {data?.serialized_data?.created
                    ? new Date(
                        data?.serialized_data?.created
                      ).toLocaleDateString()
                    : "N/A"}
                </span>
              </MainItems>
            </Grid>{" "}
            <Grid item xs={12} md={6} lg={6} xl={6}>
              <MainItems>
                <h6>Modified Date:</h6>
                <span>
                  {data?.serialized_data?.modified
                    ? new Date(
                        data?.serialized_data?.modified
                      ).toLocaleDateString()
                    : "N/A"}
                </span>
              </MainItems>
            </Grid>
            {data?.serialized_data?.is_resolved && (
              <Grid item xs={12} md={12} lg={12} xl={12}>
                <MainItems>
                  <h6>Resolved Date:</h6>
                  <span>{data?.serialized_data?.resolved_date || "N/A"}</span>
                </MainItems>
              </Grid>
            )}
            <Grid item xs={12} md={12} lg={12} xl={12}>
              <MainItems>
                <h6>Status </h6>
                <span>{data?.serialized_data?.status || "N/A"}</span>
              </MainItems>
            </Grid>{" "}
            <Grid item xs={12} md={12} lg={12} xl={12}>
              <MainItems>
                <h6>Descriptions </h6>
                <span>{data?.serialized_data?.description || "N/A"}</span>
              </MainItems>
            </Grid>
            {data?.serialized_data?.status === "pending" && (
              <>
                <Grid item xs={12} md={12} lg={12} xl={12}>
                  <MainItems sx={{ width: "20%" }}>
                    <SelectMain
                      value={selectedValues || "pending"}
                      onChange={(e) =>
                        handleSelectChange(
                          e.target.value,
                          data?.serialized_data?.id
                        )
                      }
                      disabled={
                        !IsUpdateStates && GetUserType.user_type === "staff"
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="resolved">Resolved</option>
                    </SelectMain>

                    <Button
                      sx={{
                        backgroundColor: "#9277F7",
                        color: "white",
                        fontSize: "12px",
                        padding: "5px 5px",
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
                      onClick={HandlerStatusChange}
                    >
                      Save
                    </Button>
                  </MainItems>
                </Grid>
              </>
            )}
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
                Reason
              </Typography>
              <CustomTextarea aria-label="RepotedText" disabled>
                {data?.serialized_data?.reason || ""}
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

export default SingleDisputePage;
