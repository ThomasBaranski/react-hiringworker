import * as yup from "yup";
export const categorySchema = yup
  .object({
    name: yup
      .string()
      .required("Category name is required field")
      // .min(20, "Category must be minimum 20 characters")
      .max(50, " Category must be 50 characters or less"),
    // image: yup.string().required("Upload Photo is required field"),
  })
  .required();
