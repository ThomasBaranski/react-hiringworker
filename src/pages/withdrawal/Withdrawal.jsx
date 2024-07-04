import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import React, { useState } from "react";
// import { useNavigate } from "react-router";
// import StaffWithdraw from "./StaffWithdraw";
// import CustomerWithdraw from "./customerWithdraw";
import CssTextField from "../../components/common/CssTextField";
import { toast } from "react-hot-toast";
import { ErrorMessage, Formik } from "formik";
import styled from "@emotion/styled";
import { LoadingButton } from "@mui/lab";
import {
  useCreateNewWithdrawalMutation,
  useLazyFindWithdrawalByCodeQuery,
} from "../../redux/services/withdrawal.service";
import { useNavigate } from "react-router-dom";

const FormMain = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "80vh",

  "& .error": {
    color: "red",
    fontSize: "16px",
    fontWeight: 500,
    marginTop: "8px",
  },
  "& .MuiFormControlerror fieldset": {
    borderColor: "red !important",
    border: "3px solid red !important",
  },
  "& .CssTextFieldMain ": {
    width: "30%",
  },
}));

const validationSchema = Yup.object({
  code: Yup.string().required("Code is required"),
});
const formValues = {
  code: "",
};

const Withdrawal = () => {
  const [isLoading, setLoading] = useState(false);
  const [getAuthenticated, { data, error }] =
    useLazyFindWithdrawalByCodeQuery();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await getAuthenticated(values.code);

      if (response?.data?.status && !response?.data?.error) {
        toast.success(response?.data?.message);
        navigate("/update-withdrawal/" + values.code);
      }

      if (response?.error) {
        toast.error(
          response?.error?.data?.message ||
            "something went wrong please try again"
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: "40px",
          lineHeight: "64px",
          color: "#594DA0",
        }}
      >
        Withdrawal
      </Typography>
      <Box>
        <Typography sx={{ fontSize: "20px", color: "black", fontWeight: 500 }}>
          Enter The Code:
        </Typography>
        <Formik
          onSubmit={onSubmit}
          initialValues={formValues}
          validationSchema={validationSchema}
        >
          {({ values, handleChange, handleSubmit, errors, touched }) => (
            <FormMain onSubmit={handleSubmit}>
              <CssTextField
                name="code"
                value={values.code}
                onChange={handleChange}
                className={`CssTextFieldMain ${
                  touched.code && errors.code ? "MuiFormControlerror" : ""
                }`}
              />
              <ErrorMessage name="code" component="div" className="error" />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  height: "100%",
                  alignItems: "center",
                }}
              >
                <LoadingButton
                  variant="contained"
                  sx={{
                    backgroundColor: "#9277F7",
                    width: { xs: "90%", sm: "560px" },
                    height: "60px",
                    borderRadius: "16px",
                    textTransform: "capitalize",
                    "&:hover": {
                      backgroundColor: "#9277F7",
                    },
                  }}
                  type="submit"
                  loading={isLoading}
                >
                  Submit
                </LoadingButton>
              </Box>
            </FormMain>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Withdrawal;
