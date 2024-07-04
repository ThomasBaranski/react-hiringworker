import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { usePolicyQuery } from "../../redux/services/privacy&policy.service";
import PolicyTextEditor from "../../components/common/PolicyTextEditor";

const PrivacyPolicy = () => {
  const { isFetching } = usePolicyQuery();
  return (
    <div>
      <Typography
        sx={{
          fontWeight: "700",
          fontSize: "40px",
          lineHeight: "64px",
          color: "#594DA0",
        }}
      >
        Privacy Policy
      </Typography>

      {isFetching ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="400px"
        >
          <CircularProgress />
        </Box>
      ) : (
        <PolicyTextEditor />
      )}
    </div>
  );
};

export default PrivacyPolicy;
