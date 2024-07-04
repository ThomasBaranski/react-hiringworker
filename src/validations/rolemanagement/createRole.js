import * as yup from "yup";
export const roleValidationSchema = yup.object({
  username: yup
    .string()
    .required("Name is required")
    // .min(20, "User name must be minimum 20 characters")
    .max(50, "User name must be less than 50 characters "),
  // email: yup
  //   .string()
  //   .email("Please enter a valid email")
  //   .required("Email is required"),
  role: yup.string().required("Role is required"),
});
export const createRoleValidationSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    // .min(20, "User name must be minimum 20 characters")
    .max(50, "User name must be less than 50 characters "),
});
