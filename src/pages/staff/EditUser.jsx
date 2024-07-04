import { ErrorMessage, Formik } from "formik";
import React, { useEffect, useState } from "react";
// import { staffSchema } from "../../validations/staff/staff.validation";
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
import {
  useCountryListQuery,
  useLazyCityListQuery,
  useLazyStateListQuery,
} from "../../redux/services/countryStateCity.service";
import * as Yup from "yup";
import styled from "@emotion/styled";
import PhoneNumberField from "../../components/common/PhoneNumberField";

const PhoneNumberMain = styled(Box)({
  "&.isPhoneNumberError": {
    "& input.form-control": {
      borderColor: "#d32f2f",
      border: "3px solid #d32f2f",
    },
    "& .react-tel-input .flag-dropdown": {
      borderColor: "#d32f2f",
      border: "3px solid #d32f2f",
    },
  },

  "& .error": {
    margin: "0",
    fontFamily: "Josefin Sans",
    fontWeight: 400,
    fontSize: "0.875rem",
    lineHeight: 1.43,
    color: "red",
    marginLeft: "10px",
    marginTop: "5px",
    marginBottom: "5px",
  },
});

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
  },
  {
    name: "first_name",
    label: "First Name:",
    placeholder: "Enter First Name",
  },
  {
    name: "last_name",
    label: "Last Name:",
    placeholder: "Enter Last Name",
  },
  {
    name: "kiosk_branch",
    label: "Kiosk Branch",
    placeholder: "Please Enter kiosk branch",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter Email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter Password",
  },
  {
    name: "confirm_password",
    label: "Confirm Password",
    placeholder: "Enter Confirm Password",
  },
  {
    name: "date_of_birth",
    label: "Date of Birth:",
    placeholder: "Enter Date of Birth",
  },
  {
    name: "phone_number",
    label: "Phone No:",
    placeholder: "Enter Phone no. ",
  },
  {
    name: "gender",
    label: "Gender:",
    placeholder: "Select Gender",
    select: true,
  },
  {
    name: "country",
    label: "Country:",
    placeholder: "Enter Country name",
    select: true,
  },
  {
    name: "state",
    label: "State:",
    placeholder: "Enter State Name",
    select: true,
  },
  {
    name: "city",
    label: "City:",
    placeholder: "Enter City Name",
    select: true,
  },
];

const staffSchema = Yup.object({
  first_name: Yup.string()
    .required("First name is a required field")
    .matches(
      /^[A-Za-z ]*$/,
      "Special characters and numeric values not allowed"
    ),
  last_name: Yup.string()
    .required("Last name is a required field")
    .matches(
      /^[A-Za-z ]*$/,
      "Special characters and numeric values not allowed"
    ),
  password: Yup.string().optional(),
  confirm_password: Yup.string().optional(),
  date_of_birth: Yup.string().required("Date of birth is a required field"),
  country: Yup.string().required("Country is a required field"),
  state: Yup.string().required("State is a required field"),
  city: Yup.string().required("City is a required field"),

  phone_number: Yup.string().test({
    name: "phoneOrEmailRequired",
    test: function (value) {
      const { email } = this.parent;
      return value || email;
    },
    message: "Either phone number or email is required",
  }),

  email: Yup.string().test({
    name: "phoneOrEmailRequired",
    test: function (value) {
      const { phone_number } = this.parent;
      return value || phone_number;
    },
    message: "Either email or phone number is required",
  }),
});

const EditUser = () => {
  const { id } = useParams();
  const { data } = useSingleStaffMemberQuery(id);
  const [userObject, setUserObject] = useState(null);
  const [updateStaffMember] = useUpdateStaffMemberMutation();
  const { data: countriesData } = useCountryListQuery();
  const [getState] = useLazyStateListQuery();
  const [getCity] = useLazyCityListQuery();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [UploadLoading, setUploadLoading] = useState(false);

  const [countryData, setCountryData] = useState([
    {
      id: "0",
      value: "0",
      name: "Select country...",
      disabled: true,
    },
  ]);
  const [stateData, setStateData] = useState([
    {
      id: "0",
      value: "0",
      name: "Select state...",
      disabled: true,
    },
  ]);
  const [cityData, setCityData] = useState([
    {
      id: "0",
      value: "0",
      name: "Select city...",
      disabled: true,
    },
  ]);

  const [genderData, setgenderData] = useState([
    // {
    //   id: "0",
    //   value: "0",
    //   name: "Select Gender...",
    //   disabled: true,
    // },
    {
      id: "male",
      value: "male",
      name: "male",
      disabled: false,
    },
    {
      id: "female",
      value: "female",
      name: "female",
      disabled: false,
    },
    {
      id: "I prefer not to say",
      value: "I prefer not to say",
      name: "I prefer not to say",
      disabled: false,
    },
  ]);

  // console.log("countriesData", countriesData);
  useEffect(() => {
    if (countriesData?.data) {
      setCountryData([
        {
          id: "0",
          value: "0",
          name: "Select country...",
          disabled: true,
        },
        ...countriesData?.data,
      ]);
    }
  }, [countriesData]);

  // States

  useEffect(() => {
    (async () => {
      // console.log("country", country);
      if (country != "Select country..." && country !== null) {
        const res = await getState({
          country: country,
          // state: state,
        });
        setStateData([
          {
            id: "0",
            value: "0",
            name: "Select state...",
            disabled: true,
          },
          ...res?.data?.data,
        ]);
      }
    })();
  }, [country]);

  // Cities

  useEffect(() => {
    (async () => {
      if (
        country != "Select country..." &&
        state != "Select state..." &&
        country !== null &&
        state !== null
      ) {
        const res = await getCity({
          country: country,
          state: state,
        });
        setCityData([
          {
            id: "0",
            value: "0",
            name: "Select city...",
            disabled: true,
          },
          ...res?.data?.data,
        ]);
      }
    })();
  }, [state]);

  // Initial Values
  useEffect(() => {
    if (data != undefined) {
      setUserObject({
        id: data?.data?.id,
        age_consent: true,
        user_id: data?.data?.user?.id,
        city: data?.data?.user?.city,
        country: data?.data?.user?.country,
        date_of_birth: data?.data?.user?.date_of_birth,
        email: data?.data?.user?.email,
        password: data?.data?.user?.password,
        confirm_password: data?.user?.confirm_password,
        first_name: data?.data?.user?.first_name,
        is_active: data?.data?.user?.is_active,
        is_email_verified: data?.data?.user?.is_email_verified,
        is_phone_number_verified: data?.data?.user?.is_phone_number_verified,
        last_name: data?.data?.user?.last_name,
        phone_number:
          data?.data?.user?.country_code + data?.data?.user?.phone_number || "",
        state: data?.data?.user?.state,
        terms_and_condition: data?.data?.user?.terms_and_condition,
        username: data?.data?.user?.username,
        kiosk_branch: data?.data?.user?.kiosk_branch,
        gender: data?.data?.user?.gender,
      });
    }
  }, [data]);

  const onSubmit = async (values) => {
    setUploadLoading(true);
    const CopyToSend = { ...values };
    const formattedPhoneNumber = `${
      values.phone_number.length > 5 ? "+" + values.phone_number : ""
    }`;
    const UpdateValues = { ...CopyToSend, phone_number: formattedPhoneNumber };
    const valuesToSend = getModifiedValues(UpdateValues, userObject);

    // if (Object.values(valuesToSend).length == 0) {
    //   toast.error("No changes detected");
    //   return;
    // }
    const res = await updateStaffMember({
      id: userObject.id,
      body: valuesToSend,
    });
    if (res?.data?.message) {
      toast.success(res?.data?.message);
      navigate("/staff");
    } else if (res?.error) {
      toast.error(res?.error?.data?.invalid_params[0]?.reason);
    } else if (res?.error) {
      toast.error(res?.error?.data?.message);
    }
    setUploadLoading(false);
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
  return (
    <div>
      <Typography
        sx={{
          fontWeight: "700",
          fontSize: "40px",
          lineHeight: "64px",
          color: "#594DA0",
          marginTop: "8px",
        }}
      >
        Edit Staff User
      </Typography>
      {userObject && (
        <Formik
          initialValues={userObject}
          onSubmit={onSubmit}
          validationSchema={staffSchema}
        >
          {({ errors, handleSubmit, values, handleChange, setFieldValue }) => {
            if (values.country != "Select country..." && values.country != "") {
              setCountry(values.country);
            }
            if (values.state != "Select state..." && values.state != "") {
              setState(values.state);
            }
            const isPhoneNumberError = !!errors.phone_number;

            return (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={6} sx={{ marginTop: "5px" }}>
                  {userData?.map(
                    ({ label, name, placeholder, disabled, select }, index) => (
                      <Grid item xs={12} sm={6} md={3} lg={4} xl={4}>
                        {name === "phone_number" ? (
                          <>
                            <PhoneNumberMain
                              className={
                                isPhoneNumberError ? "isPhoneNumberError" : ""
                              }
                            >
                              <PhoneNumberField
                                title="Phone Number:"
                                phone={values.phone_number}
                                setPhone={(newPhone) =>
                                  setFieldValue("phone_number", newPhone)
                                }
                              />
                              <ErrorMessage
                                name="phone_number"
                                component="div"
                                className="error"
                              />
                            </PhoneNumberMain>
                          </>
                        ) : (
                          <>
                            <CustomInputField
                              fullWidth
                              name={name}
                              label={label}
                              sx={{ color: "black" }}
                              placeholder={placeholder}
                              disabled={disabled}
                              select={select}
                              useName={true}
                              options={
                                name == "country"
                                  ? countryData
                                  : name == "city"
                                  ? cityData
                                  : name == "gender"
                                  ? genderData
                                  : stateData
                              }
                            />
                          </>
                        )}
                      </Grid>
                    )
                  )}
                </Grid>
                <div style={{ margin: "50px 0 0 13px" }}>
                  <Grid item lg={12}>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="Is the phone number verified?"
                    />
                  </Grid>
                  <Grid item lg={12}>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="Is email verified?"
                    />
                  </Grid>
                  <Grid item lg={12}>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="Is active?"
                    />
                  </Grid>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    margin: "20px 0 60px 0",
                  }}
                >
                  <LoadingButton
                    variant="contained"
                    sx={{
                      backgroundColor: "#9277F7",
                      width: { xs: "90%", sm: "560px" },
                      height: "60px",
                      borderRadius: "16px",
                      marginTop: "20px",
                      "&:hover": {
                        backgroundColor: "#9277F7",
                      },
                    }}
                    type="submit"
                    loading={UploadLoading}
                  >
                    Save Change
                  </LoadingButton>
                </div>
              </form>
            );
          }}
        </Formik>
      )}
    </div>
  );
};

export default EditUser;
