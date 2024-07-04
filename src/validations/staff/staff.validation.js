import * as yup from "yup";

const staffSchema = yup.object({
  // name: yup
  //   .string()
  //   .required(" Username is required field")
  //   .max(15, " Category must be 15 characters or less"),
  email: yup.string().required("Email is required field"),
  password: yup.string().required("Password is required field"),
  confirm_password: yup.string().required("Confirm password is required field"),
  city: yup.string().required("City is required field"),
  age_consent: yup.string().required("Age consent is required field"),
  date_of_birth: yup.string().required("Date of birth is required field"),
  first_name: yup.string().required("First name is required field"),
  last_name: yup.string().required("Last name is required field"),
  username: yup.string().required("Username is required field"),
  state: yup.string().required("State is required field"),
  city: yup.string().required("City is required field"),
  country: yup.string().required("Country is required field"),
  phone_number: yup.string().required("Phone number is required field"),
  uuid: yup.string().required("UUID is required field"),
  id: yup.string().required("ID is required field"),
  is_active: yup.string().required("Is active is required field"),
  is_email_verified: yup.string().required("Email verified is required field"),
  is_phone_number_verified: yup
    .string()
    .required("Phone number verified is required field"),
  terms_and_conditions: yup
    .string()
    .required("Terms and conditions is required field"),
});

export default staffSchema;
