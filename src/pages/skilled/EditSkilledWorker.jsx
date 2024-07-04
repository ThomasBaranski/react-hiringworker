import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import { ErrorMessage, Formik } from "formik";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CustomInputField from "../../components/common/CustomInputField";
import { LoadingButton } from "@mui/lab";

import {
  useCountryListQuery,
  useLazyCityListQuery,
  useLazyStateListQuery,
} from "../../redux/services/countryStateCity.service";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  useGetOccupationListQuery,
  useGetSingleSkillWorkerDetailByIdQuery,
  useUpdateSkilledWorkerReqMutation,
} from "../../redux/services/skillworker.service";
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
  // {
  //   name: "password",
  //   label: "Password:",
  //   placeholder: "**********",
  //   sensitive: true,
  // },
  // {
  //   name: "confirm_password",
  //   label: "Confirm Password:",
  //   placeholder: "**********",
  //   sensitive: true,
  // },

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
    disabled: true,
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

const EditSkilledWorker = () => {
  const { id } = useParams();
  console.log("id params", id);
  const [updateSkilledWorkerReq] = useUpdateSkilledWorkerReqMutation();
  const { data: occupationList } = useGetOccupationListQuery();
  const { data } = useGetSingleSkillWorkerDetailByIdQuery(id);
  console.log("data esiiit", data);
  const navigate = useNavigate();
  const [userObject, setUserObject] = useState(null);
  // const { data } = useSingleCustomerByIdQuery(id);
  const { data: countriesData } = useCountryListQuery();

  const [getState] = useLazyStateListQuery();
  const [getCity] = useLazyCityListQuery();
  const location = useLocation();
  const [state, setState] = useState(null);
  const [country, setCountry] = useState(null);
  const [occValue, seOccValue] = useState(null);
  // console.log("path location", location?.pathname.split("/").at(-1));
  const path = location?.pathname.split("/").at(-1);
  const [loading, setloading] = useState(false);
  // console.log("path location Dataa", path);

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
  const [occupation, setOccupation] = useState([
    {
      id: "0",
      value: "0",
      name: "Select occupation...",
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
    if (occupationList?.data) {
      setOccupation([
        {
          id: "0",
          value: "0",
          name: "Select country...",
          disabled: true,
        },
        ...occupationList?.data,
      ]);
    }
  }, [occupationList]);

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
        console.log(" res", res);
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

  useEffect(() => {
    if (data) {
      setUserObject({
        first_name: data?.user?.first_name,
        last_name: data?.user?.last_name,
        email: data?.user?.email,
        gender: data?.user?.gender,
        date_of_birth: data?.user?.date_of_birth,
        country: data?.user?.country,
        state: data?.user?.state,
        city: data?.user?.city,
        phone_number: data?.user?.country_code + data?.user?.phone_number,
        description: data?.description,
        education: data?.education,
        occupation: data?.occupation?.name,
        experience: data?.experience,
      });
    }
  }, [data]);

  const handleUpdate = async (values) => {
    const keysData = Object.keys(values);
    let valuesToSend = {};

    if (values.experience) {
      const experienceValue = parseInt(values.experience, 10);
      if (isNaN(experienceValue) || experienceValue <= 0) {
        toast.error("Please enter a valid positive number for experience.");
        return;
      }
    }

    if (values.education) {
      const validEducation = /^[A-Za-z\s]+$/.test(values.education);
      if (!validEducation) {
        toast.error(
          "Please enter a valid education (letters and spaces only)."
        );
        return;
      }
    }

    keysData.forEach((item) => {
      if (item === "phone_number") {
        if (values?.phone_number.length > 5) {
          valuesToSend.phone_number = "+" + values[item];
        } else if (
          userObject?.phone_number &&
          userObject?.phone_number.length > 5
        ) {
          valuesToSend.phone_number = ""; // Clear the phone_number
        }
      } else if (values[item] !== userObject[item]) {
        valuesToSend[item] = values[item];
      }
    });

    if (
      values.phone_number ==
      data?.user?.country_code + data?.user?.phone_number
    ) {
      delete valuesToSend.phone_number;
    }

    const res = await updateSkilledWorkerReq({
      data: valuesToSend,
      id: id,
    });

    if (res?.data?.message) {
      toast.success(res?.data?.message);
      navigate("/skill");
    } else if (res?.error) {
      toast.error(res?.error?.data?.error?.date_of_birth[0]);
    } else if (res?.error) {
      toast.error(res.error?.data?.error?.phone_number[0]);
    }
  };

  return (
    <Box>
      <Typography
        sx={{
          fontWeight: "700",
          fontSize: "40px",
          lineHeight: "64px",
          color: "#594DA0",
          marginTop: "8px",
        }}
      >
        Edit Skilled Worker Management
      </Typography>
      <Formik
        initialValues={userObject}
        enableReinitialize={true}
        onSubmit={handleUpdate}
      >
        {({ values, handleSubmit, handleChange, errors, setFieldValue }) => {
          if (
            values?.occupation != "Select occupation..." &&
            values?.occupation != ""
          ) {
            seOccValue(values?.occupation);
          }
          if (values?.country != "Select country..." && values?.country != "") {
            setCountry(values?.country);
          }
          if (values?.state != "Select state..." && values?.state != "") {
            setState(values?.state);
          }
          const isPhoneNumberError = !!errors.phone_number;

          return (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={6} sx={{ marginTop: "5px" }}>
                {userData &&
                  userData?.map(
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
                                  phone={values?.phone_number || ""}
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
                                useName={true}
                                sensitive={sensitive}
                                label={label}
                                disabled={disabled}
                                sublabel="city"
                                sx={{ color: "black" }}
                                placeholder={placeholder}
                                select={select}
                                options={
                                  name == "country"
                                    ? countryData
                                    : name == "city"
                                    ? cityData
                                    : name == "occupation"
                                    ? occupation
                                    : name == "gender"
                                    ? genderData
                                    : stateData
                                }
                              />
                            </>
                          )}
                        </Grid>
                      </>
                    )
                  )}
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
                    // loading={isLoading}
                  >
                    Update User
                  </LoadingButton>
                </div>
              </Grid>
            </form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default EditSkilledWorker;
