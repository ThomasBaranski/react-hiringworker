import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import React from "react";
import { useDeleteCreatedCustomerMutation } from "../../redux/services/customer.service";
import { toast } from "react-hot-toast";
import CancelIcon from "@mui/icons-material/Cancel";
import { LoadingButton } from "@mui/lab";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "16px ",
};
const DeleteCustomer = ({ open, setOpen, deleteData }) => {
  const [deleteCreatedCustomer] = useDeleteCreatedCustomerMutation();
  const handleClose = () => {
    setOpen(false);
  };
  const deleteObject = async () => {
    const res = await deleteCreatedCustomer({ id: deleteData?.id });
    console.log("user delete", res);
    if (res?.data?.message) {
      toast.success(res?.data?.message);
      // navigate("/customer");
      setOpen(false);
    } else if (res?.error) {
      toast.error(res.error?.data?.error);
    }
  };
  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "40px",
              lineHeight: "64px",
              textAlign: "center",
              color: "#594DA0",
            }}
          >
            Delete User
          </Typography>
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
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            You want to delete this category, are you sure?
          </Typography>

          <Button
            onClick={() => deleteObject(deleteData)}
            sx={{
              backgroundColor: "#D9574C",
              color: "white",
              "&:hover": {
                backgroundColor: "#D9574C",
                color: "white",
              },
              marginTop: "10px",
            }}
            fullWidth
          >
            Delte
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default DeleteCustomer;
