import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import CssTextField from "../../components/common/CssTextField";
import { useNavigate } from "react-router-dom";
import {
  useCreateNewTopUpMutation,
  // useFindAllTopUpQuery,
} from "../../redux/services/topup.service";
import { ErrorMessage, Formik } from "formik";
import { toast } from "react-hot-toast";
import usePermission from "../../utils/permissionHandler/PermissionHandler";
import styled from "@emotion/styled";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";

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

const TopUp = () => {
  const [isLoading, setLoading] = useState(false);
  const [createNewTopUp] = useCreateNewTopUpMutation();
  const canViewTopUp = usePermission("view_topupcode");
  const canUpdateTopUp = usePermission("change_topupcode");

  const navigate = useNavigate();

  const validationSchema = Yup.object({
    code: Yup.string().required("Code is required"),
  });

  const formValues = {
    code: "",
  };
  const onSubmit = async (values) => {
    // const response = await createNewTopUp(values);
    // // console.log("api return ", response);
    // if (response?.data?.message) {
    //   navigate("/updatetop/" + values.code);
    //   toast.success(response?.data?.message);
    // } else if (response?.error) {
    //   toast.error(response?.error?.data?.message);
    // }

    try {
      setLoading(true);
      const response = await createNewTopUp(values);

      if (response?.data?.message) {
        navigate("/updatetop/" + values.code);
        toast.success(response?.data?.message);
      } else if (response?.error) {
        toast.error(response?.error?.data?.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while submitting the form.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box>
      <Typography sx={{ fontSize: "40px", fontWeight: 700, color: "#594DA0" }}>
        Top-up
      </Typography>
      <Typography sx={{ fontSize: "20px", color: "black", fontWeight: 500 }}>
        Enter Top-up Code:
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
                touched.code && errors.code
                  ? "MuiFormControlerror sdfsdfsd"
                  : ""
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
  );
};

export default TopUp;
