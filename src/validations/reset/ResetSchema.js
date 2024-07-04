import * as yup from "yup";
export const resetSchema = yup
  .object({
    verification_key: yup.string().email().required("key is required field"),
    new_password: yup.string().required("Password is required field"),
    confirm_new_password: yup.string().required("Password is required field"),
  })
  .required();
