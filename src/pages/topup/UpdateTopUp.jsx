import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CssTextField from "../../components/common/CssTextField";
import {
  useAcceptTopUpCodeMutation,
  useEditTopUpMutation,
  useFindAllTopUpQuery,
} from "../../redux/services/topup.service";
import { Formik } from "formik";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const UpdateTopUp = () => {
  const [haveUpdatePermissions, sethaveUpdatePermissions] = useState(null);
  const GetPermissions = useSelector(
    (state) => state?.Permissions?.user_permissions
  );
  const GetUserType = useSelector((state) => state?.Permissions);
  // console.log("GetUserType", GetUserType);
  const { id } = useParams();

  useEffect(() => {
    if (GetUserType?.user_type !== "admin" && GetPermissions !== undefined) {
      const havePermissions = GetPermissions?.some(
        (value) => value?.codename === "change_topupcode"
      );
      sethaveUpdatePermissions(havePermissions);
    } else {
      sethaveUpdatePermissions(true);
    }
  }, [GetUserType, GetPermissions]);

  const [apiData, setApiData] = useState([]);
  const location = useLocation();
  //
  const navigate = useNavigate();
  const { data, error, isLoading } = useFindAllTopUpQuery(id);
  const [acceptTopUpCode] = useAcceptTopUpCodeMutation();
  const [editTopUp] = useEditTopUpMutation();
  const [isTotalAmountClicked, setIsTotalAmountClicked] = useState(false);

  const apiRes = data?.data;

  useEffect(() => {
    setApiData(data?.data);
  }, []);

  const formValues = {
    uuid: apiRes?.uuid,
    username: apiRes?.customer?.user?.username,
    date_of_birth: apiRes?.customer?.user?.date_of_birth,
    first_name: apiRes?.customer?.user?.first_name,
    last_name: apiRes?.customer?.user?.last_name,
    email: apiRes?.customer?.user?.email,
    phone_number: apiRes?.customer?.user?.phone_number,
    balance: apiRes?.customer?.balance,
    amount_currency: apiRes?.amount_currency,
    created: apiRes?.created
      ? new Date(apiRes?.created).toLocaleDateString() +
        " " +
        " " +
        " " +
        " " +
        new Date(apiRes?.created).toLocaleTimeString()
      : "N/A",
    amount: apiRes?.amount,
  };

  const onSubmit = async (values) => {
    console.log("form valuesss upd", values, formValues);

    const keysData = Object.keys(values);
    // console.log("keysData", keysData);
    let valuesToSend = {};
    keysData.forEach((item) => {
      if (values[item] !== formValues[item]) {
        valuesToSend[item] = values[item];
      }
    });
    // console.log("valuesToSend", valuesToSend);

    // const response = await editTopUp({
    //   id: apiRes?.id,
    //   dataFinal: valuesToSend,
    // });
    // console.log("api returning", response);
    // if (response?.data?.message) {
    //   setIsTotalAmountClicked(false);
    //   toast.success(response?.data?.message);
    // } else if (response?.error) {
    //   toast.error(response?.error?.data?.errors?.amount[0]);
    // }
    // const result = await acceptTopUpCode({
    //   id: apiRes?.id,
    //   dataFinal: valuesToSend,
    // });
    // console.log("api result", result);

    if (isTotalAmountClicked) {
      const response = await editTopUp({
        id: apiRes?.id,
        dataFinal: valuesToSend,
      });
      console.log(
        "🚀 ~ file: UpdateTopUp.jsx:105 ~ onSubmit ~ response:",
        response
      );

      console.log("api returning", response);
      if (response?.data?.message) {
        setIsTotalAmountClicked(false);
        toast.success(response?.data?.message);
      } else if (response?.error) {
        toast.error(response?.error?.data?.errors?.amount[0]);
      }
    } else {
      const result = await acceptTopUpCode({
        status: "accepted",
        topup_code: id,
      });
      console.log("api result", result);
      if (result?.data) {
        navigate("/topup");
        toast.success(result?.data?.message);
      } else if (result?.error) {
        toast.error(result?.error?.data?.errors?.topup_code);
      }
    }
  };
  const handleTotalAmountClick = () => {
    setIsTotalAmountClicked(true);
  };

  const rejectTopUp = async () => {
    const result = await acceptTopUpCode({
      status: "rejected",
      topup_code: id,
    });
    if (result?.data) {
      navigate("/topup");
      toast.error(result?.data?.message);
    } else if (result?.error) {
      toast.error(
        result?.error?.data?.errors?.topup_code ||
          "something went wrong please try again"
      );
    }
  };

  const DisabledTotalAmount = !haveUpdatePermissions;
  const topupData = [
    {
      label: "UUID",
      name: "uuid",
      disabled: true,
    },
    {
      label: "User Name:",
      name: "username",
      disabled: true,
    },
    {
      label: "Date of Birth:",
      name: "date_of_birth",
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
      label: "Email",
      name: "email",
      disabled: true,
    },
    {
      label: "Phone No",
      name: "phone_number",
      disabled: true,
    },
    {
      label: "Current Balance",
      name: "balance",
      disabled: true,
    },

    {
      label: "Currency",
      name: "amount_currency",
      disabled: true,
    },
    {
      label: "Date & time of Top-up",
      name: "created",
      disabled: true,
    },
    // {
    //   label: "Date & time of last Top-up:",
    //   value: apiRes?.created,
    //   name: "created",
    // },
    {
      label: "Total Top-up Amount:",

      name: "amount",
      disabled: DisabledTotalAmount,
    },
  ];

  return (
    <Box>
      <Typography sx={{ fontSize: "40px", fontWeight: 700, color: "#594DA0" }}>
        Customer Topup Detail
      </Typography>
      <Formik
        onSubmit={onSubmit}
        initialValues={formValues}
        enableReinitialize={true}
      >
        {({ values, handleChange, handleSubmit, errors }) => (
          <form onSubmit={handleSubmit}>
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
            <Button
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
              onClick={rejectTopUp}
              // disabled={!haveUpdatePermissions}
            >
              Reject
            </Button>
            <Button
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
              type="submit"
              // disabled={!haveUpdatePermissions}
            >
              {isTotalAmountClicked ? "Update" : "Top Up"}
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};
export default UpdateTopUp;
