import { Box, InputLabel } from "@mui/material";
import React, { memo } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import styled from "@emotion/styled";

const PhoneNumberMain = styled(Box)({
  "& input.form-control": {
    height: "53px",
    width: "100%",
    borderRadius: "16px",
    borderColor: "#9277F7",
    border: "3px solid #9277F7",
  },
  "& .react-tel-input .flag-dropdown": {
    borderRadius: "16px 0 0 16px",
    borderColor: "#9277F7",
    border: "3px solid #9277F7",
    background: "#fff",
    "&:hover": {
      borderRadius: "16px 0 0 16px",
      background: "#fff",
    },
    "&:focus": {
      borderRadius: "16px 0 0 16px",
      background: "#fff",
    },
  },
  "& .react-tel-input .selected-flag": {
    borderRadius: "16px 0 0 16px",
    "&:hover": {
      borderRadius: "16px 0 0 16px",
      background: "#fff",
    },
    "&:focus": {
      borderRadius: "16px 0 0 16px",
      background: "#fff",
    },
  },
  "& .react-tel-input .flag-dropdown.open .selected-flag": {
    borderRadius: "16px 0 0 16px",
  },
});

const PhoneNumberField = ({ title = "", phone, setPhone = () => {} }) => {
  return (
    <>
      <PhoneNumberMain>
        <InputLabel
          shrink
          sx={{ color: "black", fontWeight: "600", fontSize: "20px" }}
        >
          {title}
        </InputLabel>
        <PhoneInput
          country={"us"}
          value={phone}
          onChange={setPhone}
          countryCodeEditable={false}
        />
      </PhoneNumberMain>
    </>
  );
};

export default memo(PhoneNumberField);
