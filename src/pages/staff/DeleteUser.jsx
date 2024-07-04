import React, { useState } from "react";
import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { LoadingButton } from "@mui/lab";
import { useDeleteStaffMemberMutation } from "../../redux/services/staffManagment.service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const DeleteUser = ({ prev, setPrev, id }) => {
  const [deleteStaffMember] = useDeleteStaffMemberMutation();
  const navigate = useNavigate();
  const handleCloseDelBox = () => {
    setPrev(false);
  };
  const delObject = async (id) => {
    console.log("delete id", id);
    try {
      const res = await deleteStaffMember(id);
      console.log(res);
      if (res?.data?.message) {
        setPrev(false);
        toast.success(res?.data?.message);
      } else if (res?.error) {
        toast.error(res?.error?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      open={prev}
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
          Delete User
        </Typography>

        <Typography
          sx={{
            fontWeight: "600",
            fontSize: "24px",
            lineHeight: "24px",
            textAlign: "center",
          }}
        >
          You want to delete this user, are you sure?
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
            onClick={() => setPrev(false)}
          >
            Cancel
          </Button>
          <LoadingButton
            variant="contained"
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
            onClick={() => delObject(id)}
          >
            Delete
          </LoadingButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteUser;
