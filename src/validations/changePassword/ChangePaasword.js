import * as yup from "yup";
export const changePasswordSchema = yup
  .object({
    old_password: yup
      .string()
      .required("Password is required field")
      .max(15, "Must be 15 characters or less"),
    new_password: yup
      .string()
      .required("Password is required field")
      .max(15, "Must be 15 characters or less"),
    confirm_new_password: yup
      .string()
      .required("Confirm new password field is required field")
      .max(15, "Must be 15 characters or less"),
  })
  .required();
