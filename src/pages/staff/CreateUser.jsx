import { ErrorMessage, Formik } from "formik";
import React, { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import CustomInputField from "../../components/common/CustomInputField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { LoadingButton } from "@mui/lab";
import { useCreateStaffMemberMutation } from "../../redux/services/staffManagment.service";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  useCountryListQuery,
  useLazyCityListQuery,
  useLazyStateListQuery,
} from "../../redux/services/countryStateCity.service";
import styled from "@emotion/styled";
import PhoneNumberField from "../../components/common/PhoneNumberField";
import dayjs from "dayjs";

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
  // password: Yup.string().required("Password is a required field"),
  // confirm_password: Yup.string().required(
  //   "Confirm password is a required field"
  // ),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password should have a minimum of 8 characters"),
  confirm_password: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Password must match"),
  date_of_birth: Yup.string()
    .required("Date of birth is a required field")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Date of birth must be in YYYY-MM-DD"),
  country: Yup.string().required("Country is a required field"),
  state: Yup.string().required("State is a required field"),
  city: Yup.string().required("City is a required field"),
  kiosk_branch: Yup.string().required("Kiosk branch is a required field"),
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
const options = [
  {
    id: "0",
    value: "0",
    name: "Select...",
  },
];

const userData = [
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
    placeholder: "Pleaser Enter kiosk branch",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter Email",
  },
  {
    name: "password",
    label: "Password:",
    placeholder: "**********",
    sensitive: true,
  },
  {
    name: "confirm_password",
    label: "Confirm Password:",
    placeholder: "**********",
    sensitive: true,
  },

  {
    name: "date_of_birth",
    label: "Date of Birth:",
    placeholder: "yyyy-mm-dd",
  },
  {
    name: "phone_number",
    label: "Phone No:",
    placeholder: "+220*******",
  },
  {
    name: "gender",
    label: "Gender:",
    placeholder: "Select Gender",
    options: [],
    select: true,
  },
  {
    name: "country",
    label: "Country:",
    placeholder: "Enter Country name",
    options: [],
    select: true,
  },

  {
    name: "state",
    label: "State:",
    placeholder: "Enter State Name",
    options: [],
    select: true,
  },
  {
    name: "city",
    label: "City:",
    placeholder: "Enter City Name",
    options: [],
    select: true,
  },
];
const initialValues = {
  email: "",
  password: "",
  confirm_password: "",
  date_of_birth: dayjs(Date.now()),
  first_name: "",
  last_name: "",
  // username: "",
  phone_number: "",
  kiosk_branch: "",
  state: "Select state...",
  city: "Select city...",
  country: "Select country...",

  terms_and_condition: true,
  is_phone_number_verified: true,
  is_email_verified: true,
  is_active: true,
  age_consent: true,
};

const CreateUser = () => {
  const [isLoading, setLoading] = useState(false);
  const [createStaffMember] = useCreateStaffMemberMutation();
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [getState] = useLazyStateListQuery();
  const [getCity] = useLazyCityListQuery();
  const { data: countriesData } = useCountryListQuery();
  const [countryData, setCountryData] = useState([
    {
      id: "0",
      value: "0",
      name: "Select country...",
      disabled: true,
    },
  ]);

  const [genderData, setgenderData] = useState([
    {
      id: "0",
      value: "0",
      name: "Select Gender...",
      disabled: true,
    },
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

  const [stateData, setStateData] = useState([
    {
      id: "0",
      value: "0",
      name: "Select state...",
      disabled: true,
    },
  ]);
  useEffect(() => {
    (async () => {
      if (country !== "Select country..." && country !== null) {
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

  const [cityData, setCityData] = useState([
    {
      id: "0",
      value: "0",
      name: "Select city...",
      disabled: true,
    },
  ]);
  useEffect(() => {
    (async () => {
      if (
        country !== "Select country..." &&
        state !== "Select state..." &&
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

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      console.log(values);

      setLoading(true);

      const data = {
        ...values,
        email: values.email.toLowerCase(),
        first_name: values.first_name.toLowerCase(),
        last_name: values.last_name.toLowerCase(),
      };
      if (values.phone_number && values.phone_number.length > 5) {
        data.phone_number = "+" + values.phone_number;
      } else {
        delete data.phone_number;
      }

      const res = await createStaffMember(data);

      setLoading(false);

      if (res?.data?.message) {
        toast.success(res.data.message);
        navigate("/staff");
      } else if (res?.error) {
        const errorMessages = [];

        for (const invalidParam of res?.error?.data?.invalid_params) {
          if (invalidParam?.name === "country") {
            errorMessages.push("Country is required.");
          } else if (invalidParam.name === "phone_number") {
            errorMessages.push("Phone number is not valid.");
          } else {
            errorMessages.push(invalidParam?.reason);
          }
        }

        if (errorMessages?.length > 0) {
          toast.error(errorMessages.join("\n"));
        } else {
          toast.error("An error occurred while creating the staff member.");
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");

      setLoading(false);
    }
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
        Create Staff User
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={staffSchema}
      >
        {(props) => {
          const { handleSubmit, values, setFieldValue } = props;

          if (values.country !== "Select country..." && values.country !== "") {
            setCountry(values.country);
          }
          if (values.state !== "Select state..." && values.state !== "") {
            setState(values.state);
          }
          const isPhoneNumberError = !!props.errors.phone_number;

          return (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={6} sx={{ marginTop: "5px" }}>
                {userData?.map(
                  (
                    { label, name, select, disabled, sensitive, placeholder },
                    index
                  ) => (
                    <>
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={3}
                        lg={4}
                        xl={4}
                        key={index}
                      >
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
                          <CustomInputField
                            fullWidth
                            name={name}
                            useName={true}
                            sensitive={sensitive}
                            label={label}
                            disabled={disabled}
                            sublabel="city"
                            sx={{ color: "black" }}
                            options={
                              name === "country"
                                ? countryData
                                : name === "city"
                                ? cityData
                                : name === "state"
                                ? stateData
                                : name === "gender"
                                ? genderData
                                : options
                            }
                            placeholder={placeholder}
                            select={select}
                          />
                        )}
                      </Grid>
                    </>
                  )
                )}

                <div style={{ margin: "50px 0 0 63px" }}>
                  <Grid item lg={12}>
                    <FormControlLabel
                      control={<Checkbox defaultChecked required />}
                      label="Is the phone number verified?"
                      // label={label}
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
                  <Grid item lg={12}>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="terms_and_conditions"
                    />
                  </Grid>
                  <Grid item lg={12}>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="age_consent"
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
                      textTransform: "capitalize",
                      "&:hover": {
                        backgroundColor: "#9277F7",
                      },
                    }}
                    type="submit"
                    loading={isLoading}
                  >
                    Create User
                  </LoadingButton>
                </div>
              </Grid>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CreateUser;
