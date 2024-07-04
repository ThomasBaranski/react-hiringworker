import * as yup from "yup";

export const loginSchema = yup
  .object({
    email: yup.string().email().required("Email is required field"),
    password: yup.string().required("Password is required field"),
  })
  .required();
