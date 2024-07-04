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
import * as yup from "yup";
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
import {
  useCreateSkilledWorkerReqMutation,
  useGetOccupationListQuery,
} from "../../redux/services/skillworker.service";
import * as Yup from "yup";
import styled from "@emotion/styled";
import PhoneNumberField from "../../components/common/PhoneNumberField";

// import { useCreateSkilledWorkerReqMutation } from "../../redux/services/skillworker.service";

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
  experience: Yup.number()
    .typeError("Experience must be a number")
    .positive("Experience must be a positive number")
    .integer("Experience must be an integer")
    .required("Experience is a required field"),
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
  description: Yup.string().required("Description is a required field"),
  education: Yup.string().required("Education is a required field"),
  state: Yup.string().required("State is a required field"),
  city: Yup.string().required("City is a required field"),
  gender: Yup.string().required("Gender is required field"),
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
    name: "description",
    label: "Description:",
    placeholder: "Description",
  },
  {
    name: "occupation",
    label: "Occupation:",
    placeholder: "Occupation",
    select: true,
  },
  {
    name: "experience",
    label: "Experience:",
    placeholder: "Experience",
  },
  {
    name: "education",
    label: "Education:",
    placeholder: "Education",
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
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  confirm_password: "",
  date_of_birth: "",
  phone_number: "",
  description: "",
  experience: "",
  state: "Select state...",
  city: "Select city...",
  country: "Select country...",
  terms_and_condition: true,
  gender: "",
  age_consent: true,
  education: "",
};

const CreateSkilled = () => {
  const [createSkilledWorkerReq] = useCreateSkilledWorkerReqMutation();
  const { data } = useGetOccupationListQuery();
  // console.log("data", data);
  const [createNewCustomer] = useCreateNewCustomerMutation();
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [getState] = useLazyStateListQuery();
  const [getCity] = useLazyCityListQuery();
  const { data: countriesData } = useCountryListQuery();
  const [fieldValue, setFieldValue] = useState();
  const [loading, setloading] = useState(false);

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
  const onSubmit = async (values) => {
    try {
      setloading(true);
      const data = {
        ...values,
        email: values.email.toLowerCase(),
        first_name: values.first_name.toLowerCase(),
        last_name: values.last_name.toLowerCase(),
        gender: values.gender,
      };
      if (values.phone_number && values.phone_number.length > 5) {
        data.phone_number = "+" + values.phone_number;
      } else {
        delete data.phone_number;
      }
      const res = await createSkilledWorkerReq(data);

      if (res?.data?.message) {
        toast.success(res?.data?.message);
        navigate("/skill");
      } else if (res?.error) {
        const errorMessages = [];
        for (const fieldName of Object.keys(res?.error?.data?.error)) {
          const fieldErrors = res?.error?.data?.error[fieldName];
          for (const error of fieldErrors) {
            errorMessages.push(`${fieldName}: ${error}`);
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
    } finally {
      setloading(false);
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
        Create New Skilled Worker
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={staffSchema}
      >
        {(props) => {
          const { handleSubmit, values, setFieldValue } = props;
          // console.log("values", values);
          if (values.country != "Select country..." && values.country != "") {
            setCountry(values.country);
          }
          if (values.state != "Select state..." && values.state != "") {
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
                              name == "country"
                                ? countryData
                                : name == "city"
                                ? cityData
                                : name == "state"
                                ? stateData
                                : name == "gender"
                                ? genderData
                                : data?.data
                            }
                            placeholder={placeholder}
                            select={select}
                          />
                        )}
                      </Grid>
                    </>
                  )
                )}
                {/* <PhoneInput
                  inputProps={{
                    name: "phone",
                    required: true,
                    autoFocus: true,
                  }}
                /> */}
                {/* <Box
                  sx={{
                    background: "white",
                    borderRadius: "24px",
                    padding: "2px 2px 2px 2px",
                  }}
                >
                  <Box
                    sx={{
                      background: "#fff",
                      borderRadius: "24px",
                      "& .react-tel-input": {
                        // "& .form-control ": {
                        "& :hover": {
                          // background: "#fff",
                        },
                        "& .selected-flag open ": {
                          background: "none",
                          ":hover": {
                            background: "transparent !important",
                          },
                          ":before": {
                            borderColor: "transparent !important",
                            boxShadow: "transparent !important",
                          },
                        },
                        "& .selected-flag": {
                          background: "none",
                        },
                        "& .selected-flag.open": {
                          ":hover": {
                            background: "transparent !important",
                          },
                          ":before": {
                            borderColor: "none",
                            boxShadow: "none",
                          },
                        },
                        "& .flag-dropdown.open": {
                          background: "transparent",
                          "& .selected-flag": {
                            background: "none",
                          },
                        },
                        "& .country-list": {
                          "& .search": {
                            background: "#fff",
                          },
                          "& :hover": {
                            background: "#fff",
                          },
                          "& .country.highlight": {
                            backgroundColor: "transparent",
                          },
                        },
                        // }
                      },
                    }}
                  >
                    <PhoneInput
                      country={"us"}
                      enableSearch={true}
                      // name={props.name}
                      // value={this.state.phone}
                      onChange={(phone) => setFieldValue("phoneNumber", phone)}
                      // {...field}
                      // {...props}
                      buttonStyle={{
                        backgroundColor: "#fff",
                        color: "black",
                        border: "none",
                        borderRadius: "24px",
                        paddingLeft: "10px",
                        ":hover": {
                          background: "transparent",
                        },
                      }}
                      inputStyle={{
                        backgroundColor: "#fff",
                        color: "black",
                        width: "100%",
                        border: "none",
                        borderRadius: "24px",
                      }}
                      dropdownStyle={{
                        backgroundColor: "#fff",
                        color: "black",
                        // border: "none",
                        // borderRadius: "24px",
                      }}
                      searchStyle={{
                        backgroundColor: "#fff",
                        color: "black",
                        // border: "none",
                        // borderRadius: "24px",
                      }}
                    />
                  </Box>
                </Box> */}

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
                    loading={loading}
                  >
                    Create Worker
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

export default CreateSkilled;
