import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  useGetDynamicCommisionQuery,
  useUpdateCommisionMutation,
} from "../../redux/services/dynamicCommision.service";
import { Formik } from "formik";

import DynamicCommisionValidation from "../../validations/dynamicCommision/DynamicCommision. validation";
import { toast } from "react-hot-toast";
import styled from "@emotion/styled";

const CssTextField = styled(TextField)({
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
      border: "3px solid #9277F7",
    },
    "&:hover fieldset": {
      borderColor: "#9277F7",
      border: "3px solid #9277F7",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#9277F7",
    },
    input: {
      "&::placeholder": {
        textOverflow: "ellipsis !important",
        color: "#9277F780",
        fontWeight: "500",
        fontsize: "14px",
        lineHeight: "22.4px",
      },
    },
  },
});
const Dynamic = () => {
  const { data } = useGetDynamicCommisionQuery();
  const [updateDynamicCommision] = useUpdateCommisionMutation();
  const [editData, setEditData] = useState("");
  const [openCommision, setOpenCommision] = useState(true);

  console.log(data?.data);
  const initialValues = {
    commission: data?.data[0].commission,
  };
  const onSubmit = async (values) => {
    console.log("hello", values);
    const dataFinal = {
      ...values,
      commission_currency: "GMD",
      id: data?.data[0].id,
    };
    const res = await updateDynamicCommision(dataFinal);
    console.log("updated response", res);
    if (res?.data?.message) {
      toast.success(res?.data?.message);
      setOpenCommision(true);
    }
  };
  const handleEdit = (id) => {
    setOpenCommision(false);
    setEditData(id);
  };
  return (
    <Box>
      {openCommision ? (
        <Box>
          <Typography
            sx={{
              fontWeight: "700",
              fontSize: "40px",
              lineHeight: "64px",
              color: "#594DA0",
            }}
          >
            Dynamic Commission Management
          </Typography>
          <Button
            variant="contained"
            sx={{ width: "177px", height: "44px", marginTop: "51px" }}
            onClick={(id) => handleEdit(id)}
          >
            Edit
          </Button>
          <Typography
            sx={{
              fontWeight: "700",
              fontSize: "24px",
              lineHeight: "24px",
              marginTop: "56px",
            }}
          >
            {" "}
            Dynamic Commission: {data?.data[0].commission}%
          </Typography>
        </Box>
      ) : (
        <Box>
          <Formik
            initialValues={initialValues}
            validationSchema={DynamicCommisionValidation}
            onSubmit={onSubmit}
          >
            {({ errors, handleSubmit, values, handleChange, touched }) => {
              return (
                <form onSubmit={handleSubmit}>
                  {/* {console.log("./././", values)} */}
                  <Typography
                    sx={{
                      fontWeight: "700",
                      fontSize: "40px",
                      lineHeight: "64px",
                      color: "#594DA0",
                    }}
                  >
                    Dynamic Commission Management {">"} Edit
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontsize: "20px",
                      lineHeight: "20px",
                      marginBottom: "12px",
                      marginTop: "26px",
                    }}
                  >
                    Edit Commission:
                  </Typography>
                  <CssTextField
                    id="commission"
                    name="commission"
                    onChange={handleChange}
                    value={values.commission}
                  />

                  {errors.commission && (
                    <Typography color="red">{errors.commission}</Typography>
                  )}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignSelf: "center",
                      width: " 100%",
                      marginTop: "600px",
                    }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      sx={{ textTransform: "capitalize", width: "500px" }}
                    >
                      Save Changes
                    </Button>
                  </Box>
                </form>
              );
            }}
          </Formik>
        </Box>
      )}
    </Box>
  );
};

export default Dynamic;
