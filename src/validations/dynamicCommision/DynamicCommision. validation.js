import * as yup from "yup";

const DynamicCommisionValidation = yup.object().shape({
  commission: yup
    .number()
    .typeError("Commission must be a number")
    .min(1, "Commission should not be less than 1 percent")
    .max(30, "Commission should be less than or equal to 30 percent")
    .required("Dynamic Commission is required"),
});

export default DynamicCommisionValidation;
