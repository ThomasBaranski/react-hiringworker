import { ErrorMessage, Formik } from "formik";
import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CustomInputField from "../../components/common/CustomInputField";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { LoadingButton } from "@mui/lab";
import { useCreateStaffMemberMutation } from "../../redux/services/staffManagment.service";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  useCityListQuery,
  useCountryListQuery,
  useLazyCityListQuery,
  useLazyStateListQuery,
  useStateListQuery,
} from "../../redux/services/countryStateCity.service";
import { useCreateNewCustomerMutation } from "../../redux/services/customer.service";
import PhoneNumberField from "../../components/common/PhoneNumberField";
import styled from "@emotion/styled";


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

  phone_number: Yup.string().test({
    name: "phoneOrEmailRequired",
    test: function (value) {
      const { email } = this.parent;
      return value || email;
    },
    message: "Either email or phone number is required",
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
  // {
  //   name: "kiosk_branch",
  //   label: "Kiosk Branch",
  //   placeholder: "Pleaser Enter kiosk branch",
  // },
  // {
  //   name: "username",
  //   label: "User Name:",
  //   placeholder: "Enter User Name",
  //   // disabled: true,
  // },
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
  // {
  //   name: "gender",
  //   label: "Gender",
  //   placeholder: "Enter gender",
  // },
];
const initialValues = {
  email: "",
  password: "",
  confirm_password: "",
  date_of_birth: "",
  first_name: "",
  last_name: "",
  // username: "",
  phone_number: "",
  state: "Select state...",
  city: "Select city...",
  country: "Select country...",
  terms_and_condition: true,
  // is_phone_number_verified: true,
  // is_email_verified: true,
  // is_active: true,
  age_consent: true,
};

const CreateCustomer = () => {
  const [createNewCustomer] = useCreateNewCustomerMutation();
  const [isLoading, setLoading] = useState(false);
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [getState] = useLazyStateListQuery();
  const [getCity] = useLazyCityListQuery();
  const { data: countriesData } = useCountryListQuery();
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
  const [countryData, setCountryData] = useState([
    {
      id: "0",
      value: "0",
      name: "Select country...",
      disabled: true,
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
  // console.log("_____________", countryData);
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
  // console.log("state useEff", state);
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

  const navigate = useNavigate();
  // const onSubmit = async (values) => {
  //   const data = {
  //     ...values,
  //     email: values.email.toLowerCase(),
  //     first_name: values.first_name.toLowerCase(),
  //     last_name: values.last_name.toLowerCase(),
  //   };
  //   const res = await createNewCustomer(data);
  //   console.log("api response", res);
  //   if (res?.data?.message) {
  //     toast.success(res?.data?.message);
  //     navigate("/customer");
  //   } else if (res?.error) {
  //     toast.error(res?.error?.data?.error?.email[0]);
  //   }
  // };

  const onSubmit = async (values) => {
    try {
      // Set loading state to true while the API call is in progress
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

      const res = await createNewCustomer(data);

      setLoading(false); // Set loading state back to false after the API call is completed

      if (res?.data?.message) {
        toast.success(res?.data?.message);
        navigate("/customer");
      } else if (res?.error) {
        const errorMessages = [];

        for (const field in res?.error?.data?.error) {
          errorMessages.push(...res.error.data.error[field]);
        }

        if (errorMessages?.length > 0) {
          toast.error(errorMessages.join("\n"));
        } else {
          toast.error("An error occurred while creating the customer.");
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");

      setLoading(false); // Ensure loading state is reset even if an error occurs
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
        Create New Customer
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={staffSchema}
      >
        {(props) => {
          const { handleSubmit, values, setFieldValue } = props;

          const isPhoneNumberError = !!props.errors.phone_number;

          if (values.country != "Select country..." && values.country != "") {
            setCountry(values.country);
          }
          if (values.state != "Select state..." && values.state != "") {
            setState(values.state);
          }

          return (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={6} sx={{ marginTop: "5px" }}>
                {userData?.map(
                  (
                    { label, name, select, disabled, sensitive, placeholder },
                    index
                  ) => {
                    return (
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
                    );
                  }
                )}

                <div style={{ margin: "50px 0 0 63px" }}>
                  {/* <Grid item lg={12}>
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
                  </Grid> */}
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

export default CreateCustomer;
