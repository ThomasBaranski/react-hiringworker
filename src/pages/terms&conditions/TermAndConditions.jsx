import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import TermTextEditor from "../../components/common/TermsTextEditor";
// import { useTermsQuery } from "../../redux/services/term&condition.service";
// import TermsTextEditor from "../../components/common/TermsTextEditor";
import { usePrivacyQuery } from "../../redux/services/term&condition.service";
const Term = () => {
  const { data, isFetching } = usePrivacyQuery();
  console.log(data);
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
        Terms & Conditions
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
        <>
          <TermTextEditor />
        </>
      )}
    </div>
  );
};

export default Term;
