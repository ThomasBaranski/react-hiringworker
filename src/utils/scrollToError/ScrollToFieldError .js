import { useFormikContext } from "formik";
import { getFieldErrorNames } from "./transformObjectToDotNotation";
import { useEffect } from "react";

export const ScrollToFieldError = () => {
  const { submitCount, isValid, errors } = useFormikContext();

  useEffect(() => {
    if (isValid) return;

    const fieldErrorNames = getFieldErrorNames(errors);
    if (fieldErrorNames.length <= 0) return;

    const element = document.querySelector(
      `input[name='${fieldErrorNames[0]}']`
    );
    if (!element) return;

    // Scroll to first known error into view
    element.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [submitCount]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
};
