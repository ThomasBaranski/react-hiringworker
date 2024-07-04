import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import React from "react";
import { useDeleteCreatedCustomerMutation } from "../../redux/services/customer.service";
import { toast } from "react-hot-toast";
import { useDeleteSkilledWorkerReqMutation } from "../../redux/services/skillworker.service";
import CancelIcon from "@mui/icons-material/Cancel";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "16px",
};
const DeleteSkilledWorker = ({ open, setOpen, deleteData }) => {
  // console.log("deleteData", deleteData.user.user_id);
  // const [deleteSkilledWorkerReq] = useDeleteSkilledWorkerReqMutation();

  const [deleteSkilledWorkerReq] = useDeleteSkilledWorkerReqMutation();
  const handleClose = () => {
    setOpen(false);
  };
  const deleteObject = async () => {
    const res = await deleteSkilledWorkerReq({ id: deleteData?.user?.user_id });
    console.log("user delete", res);
    if (res?.data?.message) {
      toast.success(res?.data?.message);
      // navigate("/skill");
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
            sx={{ fontSize: "40px", fontWeight: 700, color: "#594DA0" }}
          >
            Delete Skilled Worker
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
            You want to delete this skilled worker, are you sure?
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

export default DeleteSkilledWorker;
