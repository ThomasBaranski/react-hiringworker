import { LoadingButton } from "@mui/lab";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useEditTermMutation } from "../../redux/services/term&condition.service";

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

const EditTermDialogue = ({ open, setOpen, editTextData }) => {
  const [editTerm, { isLoading }] = useEditTermMutation();
  const [term, setTerm] = useState("");
  const handleClose = () => {
    setTerm("");
    setOpen(false);
  };

  const handleTermEdit = async (e) => {
    e.preventDefault();

    await editTerm([
      editTextData?.id,
      {
        terms_and_condition: term,
      },
    ]);
    toast.success("Terms and Policy edited successfuly");
    handleClose();
  };

  useEffect(() => {
    setTerm(editTextData?.terms_and_condition);
  }, [editTextData, open]);
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ ...style, width: "571px" }}>
        <Typography
          align="center"
          sx={{
            fontWeight: "700",
            fontSize: "40px",
            lineHeight: "64px",
            color: "#594DA0",
          }}
        >
          Edit Terms and Policy
        </Typography>
        <form onSubmit={handleTermEdit}>
          <Box
            display="flex"
            flexDirection="column"
            rowGap={2}
            alignItems="stretch"
          >
            <TextField
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Terms and Privacy"
              multiline
              rows={8}
            />
            <LoadingButton
              type="submit"
              loading={isLoading}
              variant="contained"
              sx={{
                width: {
                  height: "60px",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                },
              }}
            >
              Save
            </LoadingButton>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default EditTermDialogue;
