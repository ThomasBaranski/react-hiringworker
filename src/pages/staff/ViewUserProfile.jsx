import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { staffSchema } from "../../validations/staff/staff.validation";
import { Box, Button, Grid, Typography } from "@mui/material";
import CustomInputField from "../../components/common/CustomInputField";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { LoadingButton } from "@mui/lab";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateStaffMemberMutation,
  useSingleStaffMemberQuery,
} from "../../redux/services/staffManagment.service";
import { toast } from "react-hot-toast";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { downloadExcel } from "react-export-table-to-excel";
const userData = [
  // {
  //   name: "id",
  //   label: "Sr ID:",
  //   placeholder: "Enter ID",
  //   disabled: true,
  // },
  // {
  //   name: "user_id",
  //   label: "User ID:",
  //   placeholder: "Enter User ID",
  //   disabled: true,
  // },
  {
    name: "username",
    label: "User Name:",
    placeholder: "Enter User Name",
    disabled: true,
  },
  {
    name: "first_name",
    label: "First Name:",
    placeholder: "Enter First Name",
    disabled: true,
  },
  {
    name: "last_name",
    label: "Last Name:",
    placeholder: "Enter Last Name",
    disabled: true,
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter Email",
    disabled: true,
  },
  {
    name: "date_of_birth",
    label: "Date of Birth:",
    placeholder: "Enter Date of Birth",
    disabled: true,
  },
  {
    name: "phone_number",
    label: "Phone No:",
    placeholder: "Enter Phone no. ",
    disabled: true,
  },
  {
    name: "gender",
    label: "Gender:",
    placeholder: "Enter gender. ",
    disabled: true,
  },
  {
    name: "kiosk_branch",
    label: "Kiosk Branch:",
    placeholder: "Enter Kiosk Branch. ",
    disabled: true,
  },

  {
    name: "country",
    label: "Country:",
    placeholder: "Enter Country name",
    disabled: true,
  },
  {
    name: "state",
    label: "State:",
    placeholder: "Enter State Name",
    disabled: true,
  },
  {
    name: "city",
    label: "City:",
    placeholder: "Enter City Name",
    disabled: true,
  },
  {
    name: "total_topup_amount",
    label: "Total Topup Amount:",
    placeholder: "Enter Total Topup Amount",
    disabled: true,
  },
  {
    name: "total_withdrawal_amount",
    label: "Total Withdrawal Amount:",
    placeholder: "Enter Total Withdrawal Amount",
    disabled: true,
  },
  {
    name: "topup_amount_currency_code",
    label: "Currency Code:",
    placeholder: "Enter Currency Code",
    disabled: true,
  },
];

const EditUser = () => {
  const { id } = useParams();
  const { data } = useSingleStaffMemberQuery(id);
  const [userObject, setUserObject] = useState(null);
  const [updateStaffMember] = useUpdateStaffMemberMutation();
  const navigate = useNavigate();

  useEffect(() => {
    setUserObject({
      id: data?.data?.id,
      age_consent: true,
      user_id: data?.data?.user?.id,
      city: data?.data?.user?.city,
      country: data?.data?.user?.country,
      date_of_birth: data?.data?.user?.date_of_birth,
      email: data?.data?.user?.email,
      first_name: data?.data?.user?.first_name,
      gender: data?.data?.user?.gender,
      kiosk_branch: data?.data?.user?.kiosk_branch,
      is_active: data?.data?.user?.is_active,
      is_email_verified: data?.data?.user?.is_email_verified,
      is_phone_number_verified: data?.data?.user?.is_phone_number_verified,
      last_name: data?.data?.user?.last_name,
      phone_number: data?.data?.user?.phone_number,
      state: data?.data?.user?.state,
      terms_and_condition: data?.data?.user?.terms_and_condition,
      username: data?.data?.user?.username,
      total_topup_amount: data?.data?.user?.total_topup_amount || "N/A",
      topup_amount_currency_code:
        data?.data?.user?.topup_amount_currency_code || "N/A",
      total_withdrawal_amount:
        data?.data?.user?.total_withdrawal_amount || "N/A",
    });
  }, [JSON.stringify(data)]);
  console.log("update single user", data?.data);
  const onSubmit = async (values) => {
    const valuesToSend = getModifiedValues(values, userObject);
    console.log(
      "valuesToSend",
      valuesToSend,
      Object.values(valuesToSend).length
    );
    if (Object.values(valuesToSend).length == 0) {
      toast.error("No changes detected");
      return;
    }
    const res = await updateStaffMember({
      id: userObject.id,
      body: valuesToSend,
    });
    console.log("res", res);
    if (res?.data?.message) {
      toast.success(res?.data?.message);
      navigate("/staff");
    } else if (res?.error) {
      toast.error(res?.error?.data?.invalid_params[0]?.reason);
    }
  };

  const getModifiedValues = (values, initialValues) => {
    let modifiedValues = {};

    if (values) {
      Object.entries(values).forEach((entry) => {
        let key = entry[0];
        let value = entry[1];

        if (value !== initialValues[key]) {
          modifiedValues[key] = value;
        }
      });
    }

    return modifiedValues;
  };
  const handleDownloadExcel = () => {
    console.log("download excel");
    const header = ["Sr ID", "User ID"];
    const body = [];
    // data?.data?.map((row) => body.push([row.id, row.user_id]));
    // downloadExcel({
    //   fileName: "Report.xls",
    //   sheet: "Report.xls",
    //   tablePayload: { header, body: body },
    // });
  };
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: "700",
            fontSize: "40px",
            lineHeight: "64px",
            color: "#594DA0",
            marginTop: "8px",
          }}
        >
          View User Profile
        </Typography>
        {/* <Button
          variant="contained"
          onClick={handleDownloadExcel}
          sx={{
            columnGap: 1,
            textTransform: "capitalize",
            width: "259px",
            height: "56px",
            fontSize: "28px",
            fontWeight: 600,
            lineHeight: "38.13px",
            "&:hover": {
              backgroundColor: "#9277F7",
            },
          }}
        >
          <FileUploadOutlinedIcon fontSize="large" />
          Export
        </Button> */}
      </Box>
      {userObject && (
        <Formik
          initialValues={userObject}
          onSubmit={onSubmit}
          enableReinitialize={true}
          // validationSchema={staffSchema}
        >
          {({ errors, handleSubmit, values, handleChange }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={6} sx={{ marginTop: "5px" }}>
                  {userData?.map(
                    ({ label, name, placeholder, disabled }, index) => (
                      <Grid item xs={12} sm={6} md={3} lg={4} xl={4}>
                        <CustomInputField
                          fullWidth
                          name={name}
                          label={label}
                          sx={{ color: "black" }}
                          placeholder={placeholder}
                          disabled={disabled}
                        />
                      </Grid>
                    )
                  )}
                  <div style={{ margin: "50px 0 0 63px" }}>
                    <Grid item lg={12}>
                      <FormControlLabel
                        control={<Checkbox defaultChecked disabled />}
                        label="Is the phone number verified?"
                      />
                    </Grid>
                    <Grid item lg={12}>
                      <FormControlLabel
                        control={<Checkbox defaultChecked disabled />}
                        label="Is email verified?"
                      />
                    </Grid>
                    <Grid item lg={12}>
                      <FormControlLabel
                        control={<Checkbox defaultChecked disabled />}
                        label="Is active?"
                      />
                    </Grid>
                    <Grid item lg={12}>
                      <FormControlLabel
                        control={<Checkbox defaultChecked disabled />}
                        label="Age consent?"
                      />
                    </Grid>
                  </div>
                </Grid>
              </form>
            );
          }}
        </Formik>
      )}
    </div>
  );
};

export default EditUser;
