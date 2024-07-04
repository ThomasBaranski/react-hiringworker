import * as yup from "yup";

export const forgotPasswordSchema = yup
  .object({
    email: yup.string().email().required("Email is required field"),
  })
  .required();
