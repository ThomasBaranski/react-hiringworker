import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";

import TopUpStaff from "./TopUpStaff";
import TopUpCustomer from "./TopUpCustomer";
import TopUpAdmin from "./TopUpAdmin";

const Audit = () => {
  const [lastClickedButton, setLastClickedButton] = useState("Staff");
  const [component, setComponent] = useState("Staff");

  const handleButtonClick = (button) => {
    setLastClickedButton(button);
    setComponent(button);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "40px",
            lineHeight: "64px",
            color: "#594DA0",
          }}
        >
          TopUp (Audit)
        </Typography>
        <Box
          sx={{
            // width: "386px",
            height: "44px",
            display: "flex",
            // justifyContent: "space-between",
            alignItems: "center",
            gap: "15px",
            marginBottom: "20px",
          }}
        >
          <Button
            variant="contained"
            sx={{
              width: "177px",
              height: "44px",
              borderRadius: "8px",
              textAlign: "center",
              backgroundColor:
                lastClickedButton === "Staff" ? "#9277F7" : "#9277F7",
              opacity: component === "Staff" ? 1 : 0.5,
              "&:hover": {
                backgroundColor:
                  lastClickedButton === "Staff" ? "#9277F7" : "#9277F7",
              },
            }}
            onClick={() => handleButtonClick("Staff")}
          >
            Staff
          </Button>
          <Button
            variant="contained"
            sx={{
              width: "177px",
              height: "44px",
              borderRadius: "8px",
              textAlign: "center",
              backgroundColor:
                lastClickedButton === "Customer" ? "#9277F7" : "#9277F7",
              opacity: component === "Customer" ? 1 : 0.5,
            }}
            onClick={() => handleButtonClick("Customer")}
          >
            Customer
          </Button>
          <Button
            variant="contained"
            sx={{
              width: "230px",
              height: "44px",
              borderRadius: "8px",
              textAlign: "center",
              backgroundColor:
                lastClickedButton === "Admin" ? "#9277F7" : "#9277F7",
              opacity: component === "Admin" ? 1 : 0.5,
            }}
            onClick={() => handleButtonClick("Admin")}
          >
            Super Admin
          </Button>
        </Box>
      </Box>

      {component === "Staff" && <TopUpStaff search="staff" />}
      {component === "Customer" && <TopUpCustomer search="customer" />}
      {component === "Admin" && <TopUpAdmin search="admin" />}
    </Box>
  );
};

export default Audit;
