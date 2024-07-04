import React from "react";
import { Formik } from "formik";
import { Typography } from "@mui/material";

const AddCategory = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ width: 200 }}>
          <h2 id="child-modal-title">Text in a child modal</h2>
          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default AddCategory;
