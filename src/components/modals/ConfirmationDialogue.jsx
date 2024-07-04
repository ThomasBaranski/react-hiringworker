import { LoadingButton } from "@mui/lab";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  useAddTermMutation,
  useDeleteTermMutation,
} from "../../redux/services/term&condition.service";

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

const ConfirmationDialogue = ({ open, setOpen, confitmationId }) => {
  const [deleteTerm, { isLoading }] = useDeleteTermMutation();
  const handleClose = () => {
    setOpen(false);
  };

  const handleTermDeletion = async () => {
    await deleteTerm(confitmationId);
    toast.success("Terms and Policy added successfuly");
    handleClose();
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box sx={{ ...style, width: { xs: "100%", sm: "571px" } }}>
        <Typography
          sx={{
            fontWeight: "700",
            fontSize: "40px",
            lineHeight: "64px",
            textAlign: "center",
            color: "#594DA0",
          }}
        >
          Delete Term
        </Typography>
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: "24px",
            lineHeight: "24px",
            textAlign: "center",
          }}
        >
          Are you sure you want to delete this Terms & Privacy?
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
            sx={{ width: "230px", height: "56px", borderRadius: "16px" }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <LoadingButton
            loading={isLoading}
            variant="contained"
            sx={{
              width: "230px",
              height: "56px",
              borderRadius: "16px",
              backgroundColor: "#D9574C",
              "&:hover": {
                backgroundColor: "#D9574C",
              },
            }}
            onClick={handleTermDeletion}
          >
            Delete
          </LoadingButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmationDialogue;
