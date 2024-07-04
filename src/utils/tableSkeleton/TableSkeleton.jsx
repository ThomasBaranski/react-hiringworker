import { Box, Skeleton } from "@mui/material";
import React from "react";
function TableSkeleton() {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, i) => (
        <Box key={i} sx={{ width: "100%" }}>
          <Skeleton
            animation="wave"
            sx={{ padding: "30px 0px", width: "100%" }}
          />
        </Box>
      ))}
    </>
  );
}

export default TableSkeleton;
