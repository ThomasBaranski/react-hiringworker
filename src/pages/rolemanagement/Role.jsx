import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import LightTheme from "../../Theme";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { Formik } from "formik";
import { useState } from "react";
// console.log("LightTheme", LightTheme);
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: LightTheme.palette.primary.main,
    color: theme.palette.common.white,
    width: 200,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: LightTheme.palette.secondary.main,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const rows = [
  {
    id: "#0123",
    name: "Luis Benjamin",
    email: "laminjallow@gmail.com",
    order: 500,
    balance: "$2153",
  },
  {
    id: "#0124",
    name: "Luis Benjamin",
    email: "laminjallow@gmail.com",
    order: 450,
    balance: "$4532",
  },
  {
    id: "#0125",
    name: "Luis Benjamin",
    email: "laminjallow@gmail.com",
    order: 399,
    balance: "$4532",
  },
  {
    id: "#0125",
    name: "Luis Benjamin",
    email: "laminjallow@gmail.com",
    order: 319,
    balance: "$4532",
  },
  {
    id: "#0126",
    name: "Luis Benjamin",
    email: "laminjallow@gmail.com",
    order: 289,
    balance: "$4532",
  },
];
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  height: "100px",
  p: 4,
};
export const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "green",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "16px ",
    "& fieldset": {
      borderColor: "#9277F7",
    },
    "&:hover fieldset": {
      borderColor: "#9277F7",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#9277F7",
    },
    input: {
      "&::placeholder": {
        textOverflow: "ellipsis !important",
        // color: "blue",
        color: "#9277F780",
        fontWeight: "500",
        fontsize: "14px",
        lineHeight: "22.4px",
      },
    },
  },
});
const initialValues = {
  old_password: "",
  new_password: "",
  confirm_new_password: "",
};
const Role = () => {
  const [openModal, setOpenModal] = useState(false);
  const addModal = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };
  const onSubmit = (values) => {
    console.log("values", values);
  };
  return (
    <>
      <Button
        variant="contained"
        sx={{ marginBottom: "5px", marginTop: "5px" }}
        onClick={addModal}
      >
        Create Role
      </Button>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => (
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell align="center">{row.name}</StyledTableCell>
                <StyledTableCell align="center">{row.email}</StyledTableCell>
                <StyledTableCell align="center">
                  <Box>
                    <Button variant="contained">Update</Button>
                    <LoadingButton variant="contained">Delete</LoadingButton>
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ errors, handleSubmit, values, handleChange }) => {
              <form onSubmit={handleSubmit}>
                <Typography
                  sx={{
                    fontWeight: "500",
                    fontSize: "40px",
                    lineHeight: "40px",
                    // marginTop: "5rem",
                    color: "brown",
                  }}
                >
                  Add Roles
                </Typography>
                <CssTextField
                  id="old_password"
                  name="old_password"
                  onChange={handleChange}
                  value={values.old_password}
                  sx={{
                    width: { xs: "90%", sm: "560px" },
                    height: "60px",
                    marginTop: "20px",
                  }}
                />
                {errors.old_password && (
                  <Typography variant="body2" sx={{ color: "red" }}>
                    {errors.old_password}
                  </Typography>
                )}
              </form>;
            }}
          </Formik>
        </Box>
      </Modal>
    </>
  );
};
export default Role;
