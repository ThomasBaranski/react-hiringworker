import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import CssTextField from "../../components/common/CssTextField";
import {
  useCreateNewWithdrawalMutation,
  useLazyFindWithdrawalByCodeQuery,
} from "../../redux/services/withdrawal.service";
import styled from "@emotion/styled";
import { LoadingButton } from "@mui/lab";

const FormMain = styled("form")(({ theme }) => ({
  "& .MuiFormControl-root": {
    width: "100%",
  },
  "& .css-1rqorxc-MuiInputBase-root-MuiOutlinedInput-root.Mui-disabled": {
    border: "2px solid #9277F7",
    color: "#000",
    cursor: "not-allowed",
  },
  "& .css-1rqorxc-MuiInputBase-root-MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline":
    {
      border: "none",
      color: "#000",
    },
  "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled": {
    color: "#000",
    WebkitTextFillColor: "#000",
    cursor: "not-allowed",
  },
}));

const UpdateWithdrawal = () => {
  const [createWithdrawal, { isLoading, isError }] =
    useCreateNewWithdrawalMutation();
  const navigate = useNavigate();
  const GetPermissions = useSelector((state) => state?.Permissions);

  // useEffect(() => {
  //   if (GetPermissions?.user_type !== "admin") {
  //     navigate("/");
  //   }
  // }, []);

  const [getWithdrawal, { data, error }] = useLazyFindWithdrawalByCodeQuery();

  const [haveUpdatePermissions, sethaveUpdatePermissions] = useState(null);
  const [ststusLoading, setststusLoading] = useState(null);
  const apiRes = data?.data || [];

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // getWithdrawal(id);
      getWithdrawal(id)
        .then((response) => {
          if (response.error) {
            if (
              response.error?.data?.message ==
              "Withdrawal code already used or expired"
            ) {
              navigate("/withdraw");
              toast.error(response.error?.data?.message);
            }
          }
        })
        .catch((error) => {
          console.error("Unexpected error:", error);
        });
    }
  }, [id]);

  const location = useLocation();
  const [isTotalAmountClicked, setIsTotalAmountClicked] = useState(false);

  const formValues = {
    uuid: apiRes?.uuid,
    userid: apiRes?.skilled_worker?.user?.id,
    username: apiRes?.skilled_worker?.user?.username,
    date_of_birth: apiRes?.skilled_worker?.user?.date_of_birth,
    first_name: apiRes?.skilled_worker?.user?.first_name,
    last_name: apiRes?.skilled_worker?.user?.last_name,
    email: apiRes?.skilled_worker?.user?.email,
    phone_number: apiRes?.skilled_worker?.user?.phone_number,
    city: apiRes?.skilled_worker?.user?.city,
    country: apiRes?.skilled_worker?.user?.country,
    occupation: apiRes?.skilled_worker?.occupation?.name,
    age_consent: apiRes?.skilled_worker?.user?.age_consent,
    status: apiRes?.status,
    balance: apiRes?.skilled_worker?.balance,
    // amount_currency: apiRes?.amount_currency,
    // created: apiRes?.created
    //   ? new Date(apiRes?.created).toLocaleDateString() +
    //     " " +
    //     " " +
    //     " " +
    //     " " +
    //     new Date(apiRes?.created).toLocaleTimeString()
    //   : "N/A",
    amount: apiRes?.amount,
  };

  const onSubmit = async (values) => {};
  const handleTotalAmountClick = () => {
    setIsTotalAmountClicked(true);
  };

  const topupData = [
    {
      label: "UUID",
      name: "uuid",
      disabled: true,
    },
    {
      label: "User Id:",
      name: "userid",
      disabled: true,
    },
    {
      label: "User Name:",
      name: "username",
      disabled: true,
    },
    {
      label: "Email",
      name: "email",
      disabled: true,
    },

    {
      label: "First Name:",
      name: "first_name",
      disabled: true,
    },
    {
      label: "Last Name:",
      name: "last_name",
      disabled: true,
    },
    {
      label: "Date of Birth:",
      name: "date_of_birth",
      disabled: true,
    },

    {
      label: "Phone No:",
      name: "phone_number",
      disabled: true,
    },
    {
      label: "Age Consent:",
      name: "age_consent",
      disabled: true,
    },
    {
      label: "status:",
      name: "status",
      disabled: true,
    },
    {
      label: "City:",
      name: "city",
      disabled: true,
    },
    {
      label: "Country:",
      name: "country",
      disabled: true,
    },
    {
      label: "Occupation:",
      name: "occupation",
      disabled: true,
    },
    {
      label: "Current Balance",
      name: "balance",
      disabled: true,
    },

    // {
    //   label: "Currency",
    //   name: "amount_currency",
    //   disabled: true,
    // },
    // {
    //   label: "Date & time of Top-up",
    //   name: "created",
    //   disabled: true,
    // },
    // {
    //   label: "Date & time of last Top-up:",
    //   value: apiRes?.created,
    //   name: "created",
    // },
    {
      label: "Withdrawal Amounts:",

      name: "amount",
      disabled: true,
    },
  ];

  const handleButtonClick = async (status) => {
    try {
      setststusLoading(status);
      const response = await createWithdrawal({
        code: id,
        status: status,
      });

      if (
        response?.data?.status &&
        response?.data?.message !== "Withdrawal rejected"
      ) {
        toast.success(response?.data?.message);
        navigate("/withdraw");
      }
      if (
        response?.data?.status &&
        response?.data?.message == "Withdrawal rejected"
      ) {
        toast.error(response?.data?.message);
        navigate("/withdraw");
      }

      if (response?.error) {
        const errorMessages = [];

        if (response?.error?.data) {
          const errors = response?.error?.data?.data?.errors;
          for (const field in errors) {
            if (errors.hasOwnProperty(field)) {
              const fieldErrors = errors[field];
              const errorMessage = `${field}: ${fieldErrors.join(", ")}`;
              errorMessages.push(errorMessage);
            }
          }
        }
        const errorMessage = errorMessages.join("\n");
        toast.error(errorMessage);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      // Handle any network or other errors
    }
  };

  return (
    <>
      <Typography sx={{ fontSize: "40px", fontWeight: 700, color: "#594DA0" }}>
        Withdrawal Detail
      </Typography>
      <Formik
        onSubmit={onSubmit}
        initialValues={formValues}
        enableReinitialize={true}
      >
        {({ values, handleChange, handleSubmit, errors }) => (
          <FormMain onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {topupData?.map((item) => (
                <Grid item xs={12} sm={6} md={6} lg={6} xl={4}>
                  <Typography>{item.label}</Typography>

                  <CssTextField
                    value={values[item.name]}
                    name={item?.name}
                    disabled={item.disabled}
                    onChange={handleChange}
                    onClick={handleTotalAmountClick}
                    type={item?.name === "balance" ? "number" : "text"}
                    inputProps={item?.name === "balance" ? { min: 0 } : {}}
                  />
                </Grid>
              ))}
            </Grid>

            <LoadingButton
              variant="contained"
              sx={{
                width: "560px",
                borderRadius: "16px",
                height: "60px",
                marginTop: "100px",
                marginLeft: "400px",
                backgroundColor: "#E75858",
                color: "white",
                "&:hover": {
                  backgroundColor: "#E75858",
                  color: "white",
                },
              }}
              type="button"
              loading={isLoading && ststusLoading === "rejected"}
              onClick={() => handleButtonClick("rejected")}
            >
              Reject
            </LoadingButton>
            <LoadingButton
              variant="contained"
              sx={{
                width: "560px",
                borderRadius: "16px",
                height: "60px",
                marginTop: "20px",
                marginLeft: "400px",
                backgroundColor: "#9277F7",
                color: "white",
                "&:hover": {
                  backgroundColor: "#9277F7",
                  color: "white",
                },
              }}
              type="button"
              loading={isLoading && ststusLoading === "accepted"}
              onClick={() => handleButtonClick("accepted")}
            >
              Accept
            </LoadingButton>
          </FormMain>
        )}
      </Formik>
    </>
  );
};

export default UpdateWithdrawal;
