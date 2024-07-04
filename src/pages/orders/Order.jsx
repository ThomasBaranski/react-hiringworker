import { Box, Typography, TextField, Grid } from "@mui/material";
import React from "react";
import styled from "@emotion/styled";
import { isValidEntry } from "../../utils/ValidFormEntry";
import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../../redux/services/order.service";

const DetailsMain = styled(Box)({
  "& p": {
    fontSize: "16px",
  },
});

const CssTextField = styled(TextField)({
  width: "100%",
  "& label.Mui-focused": {
    color: "green",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "16px ",
    width: "100%",
    marginTop: "8px",
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "21.79px",
    background: "#9277F7",
    color: "#fff",
    "& fieldset": {
      borderColor: "#9277F7",
    },
    "&:hover fieldset": {
      borderColor: "#9277F7",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#9277F7",
    },
    input: {
      color: "#fff !important",
      "&:disabled": {
        color: "#fff",
        WebkitTextFillColor: "#fff !important",
      },
      "&::placeholder": {
        textOverflow: "ellipsis !important",
        // color: "#9277F780",
        color: "#9277F780",
        fontWeight: "500",
        fontsize: "14px",
        lineHeight: "22.4px",
      },
    },
  },
});

const Order = () => {
  const { id } = useParams();
  const { data: order, isLoading } = useGetOrderByIdQuery(id);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          sx={{
            fontWeight: "700",
            fontSize: "40px",
            lineHeight: "64px",
            color: "#594DA0",
          }}
        >
          Order Management Details
        </Typography>
      </Box>
      <DetailsMain>
        <Grid container spacing={2} sx={{ marginTop: "10px" }}>
          {isLoading && <p>Loading...</p>}

          {!isLoading && order && (
            <>
              <Grid item xs={6} md={6} lg={4} xl={4}>
                <Typography
                  sx={{
                    fontWeight: "600",
                    fontSize: "24px",
                    lineHeight: "24px",
                  }}
                >
                  Order Id:
                </Typography>
                <CssTextField
                  // sx={{
                  //   width: { xs: "90%", sm: "320px" },
                  //   height: "60px",
                  //   // marginTop: "36px",
                  //   border: "16px",
                  //   backgroundColor: "#9277F7",
                  //   // borderRadius: "16px",
                  // }}
                  disabled
                  value={isValidEntry(
                    `${
                      order?.serialized_data?.id
                        ? "#" + order?.serialized_data?.id
                        : ""
                    }`
                  )}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6} md={6} lg={4} xl={4}>
                <Typography
                  sx={{
                    fontWeight: "600",
                    fontSize: "24px",
                    lineHeight: "24px",
                  }}
                >
                  Type of order:
                </Typography>
                <CssTextField
                  value={isValidEntry(
                    `${
                      order?.serialized_data?.order_type
                        ? order?.serialized_data?.order_type
                        : ""
                    }`
                  )}
                  variant="outlined"
                  disabled
                />
              </Grid>
              <Grid item xs={6} md={6} lg={4} xl={4}>
                <Typography
                  sx={{
                    fontWeight: "600",
                    fontSize: "24px",
                    lineHeight: "24px",
                  }}
                >
                  Total price:
                </Typography>
                <CssTextField
                  // sx={{
                  //   width: { xs: "90%", sm: "320px" },
                  //   height: "60px",
                  //   // marginTop: "36px",
                  //   border: "16px",
                  //   backgroundColor: "#9277F7",
                  //   // borderRadius: "16px",
                  // }}
                  value={isValidEntry(
                    `${
                      order?.serialized_data?.paid_amount
                        ? order?.serialized_data?.paid_amount +
                          " " +
                          order?.serialized_data?.amount_currency +
                          " (" +
                          order?.serialized_data?.amount_in_customer_currency +
                          " " +
                          order?.serialized_data?.customer?.currency_code +
                          ")"
                        : ""
                    }`
                  )}
                  variant="outlined"
                  disabled
                />
              </Grid>
              <Grid item xs={6} md={6} lg={4} xl={4}>
                <Typography
                  sx={{
                    fontWeight: "600",
                    fontSize: "24px",
                    lineHeight: "24px",
                  }}
                >
                  Current status of the order:
                </Typography>
                <CssTextField
                  // sx={{
                  //   width: { xs: "90%", sm: "320px" },
                  //   height: "60px",
                  //   // marginTop: "36px",
                  //   border: "16px",
                  //   backgroundColor: "#9277F7",
                  //   // borderRadius: "16px",
                  // }}
                  value={isValidEntry(
                    `${
                      order?.serialized_data?.status
                        ? order?.serialized_data?.status
                        : ""
                    }`
                  )}
                  variant="outlined"
                  disabled
                />
              </Grid>
              <Grid item xs={6} md={6} lg={4} xl={4}>
                <Typography
                  sx={{
                    fontWeight: "600",
                    fontSize: "24px",
                    lineHeight: "24px",
                  }}
                >
                  SW name:
                </Typography>
                <CssTextField
                  // sx={{
                  //   width: { xs: "90%", sm: "320px" },
                  //   height: "60px",
                  //   // marginTop: "36px",
                  //   border: "16px",
                  //   backgroundColor: "#9277F7",
                  //   // borderRadius: "16px",
                  // }}
                  value={isValidEntry(
                    `${
                      order?.serialized_data?.skilled_worker
                        ? order?.serialized_data?.skilled_worker?.first_name +
                          " " +
                          order?.serialized_data?.skilled_worker?.last_name
                        : ""
                    }`
                  )}
                  variant="outlined"
                  disabled
                />
              </Grid>
              <Grid item xs={6} md={6} lg={4} xl={4}>
                <Typography
                  sx={{
                    fontWeight: "600",
                    fontSize: "24px",
                    lineHeight: "24px",
                  }}
                >
                  Customer name:
                </Typography>
                <CssTextField
                  // sx={{
                  //   width: { xs: "90%", sm: "320px" },
                  //   height: "60px",
                  //   // marginTop: "36px",
                  //   border: "16px",
                  //   backgroundColor: "#9277F7",
                  //   // borderRadius: "16px",
                  // }}
                  value={isValidEntry(
                    `${
                      order?.serialized_data?.quote?.customer
                        ? order?.serialized_data?.quote?.customer
                        : ""
                    }`
                  )}
                  variant="outlined"
                  disabled
                />
              </Grid>
              <Grid item xs={6} md={6} lg={4} xl={4}>
                <Typography
                  sx={{
                    fontWeight: "600",
                    fontSize: "24px",
                    lineHeight: "24px",
                  }}
                >
                  Paid milestones amt:
                </Typography>
                <CssTextField
                  // sx={{
                  //   width: { xs: "90%", sm: "320px" },
                  //   height: "60px",
                  //   // marginTop: "36px",
                  //   border: "16px",
                  //   backgroundColor: "#9277F7",
                  //   // borderRadius: "16px",
                  // }}

                  value={`${
                    order?.serialized_data?.paid_amount !== undefined
                      ? order?.serialized_data?.paid_amount +
                        " " +
                        order?.serialized_data?.amount_currency +
                        " (" +
                        order?.serialized_data
                          ?.paid_amount_in_customer_currency +
                        " " +
                        order?.serialized_data?.customer?.currency_code +
                        ")"
                      : "N/A"
                  }`}
                  variant="outlined"
                  disabled
                />
              </Grid>
              <Grid item xs={6} md={6} lg={4} xl={4}>
                <Typography
                  sx={{
                    fontWeight: "600",
                    fontSize: "24px",
                    lineHeight: "24px",
                  }}
                >
                  Remaining milestones amt:
                </Typography>
                <CssTextField
                  // sx={{
                  //   width: { xs: "90%", sm: "320px" },
                  //   height: "60px",
                  //   // marginTop: "36px",
                  //   border: "16px",
                  //   backgroundColor: "#9277F7",
                  //   // borderRadius: "16px",
                  // }}
                  value={`${
                    order?.serialized_data?.remaining_amount !== undefined
                      ? order?.serialized_data?.remaining_amount
                      : "N/A"
                  }`}
                  variant="outlined"
                  disabled
                />
              </Grid>
              <Grid item xs={6} md={6} lg={4} xl={4}>
                <Typography
                  sx={{
                    fontWeight: "600",
                    fontSize: "24px",
                    lineHeight: "24px",
                  }}
                >
                  Current Status:
                </Typography>
                <CssTextField
                  // sx={{
                  //   width: { xs: "90%", sm: "320px" },
                  //   height: "60px",
                  //   // marginTop: "36px",
                  //   border: "16px",
                  //   backgroundColor: "#9277F7",
                  //   // borderRadius: "16px",
                  // }}
                  value={isValidEntry(
                    `${
                      order?.serialized_data?.is_on_going ? "Active" : "Closed"
                    }`
                  )}
                  variant="outlined"
                  disabled
                />
              </Grid>
              <Grid item xs={6} md={6} lg={4} xl={4}>
                <Typography
                  sx={{
                    fontWeight: "600",
                    fontSize: "24px",
                    lineHeight: "24px",
                  }}
                >
                  Created time:
                </Typography>
                <CssTextField
                  // sx={{
                  //   width: { xs: "90%", sm: "320px" },
                  //   height: "60px",
                  //   // marginTop: "36px",
                  //   border: "16px",
                  //   backgroundColor: "#9277F7",
                  //   // borderRadius: "16px",
                  // }}
                  value={isValidEntry(
                    `${
                      order?.serialized_data?.created_at
                        ? new Date(
                            order?.serialized_data?.created_at
                          ).toLocaleTimeString()
                        : ""
                    }`
                  )}
                  variant="outlined"
                  disabled
                />
              </Grid>
              <Grid item xs={6} md={6} lg={4} xl={4}>
                <Typography
                  sx={{
                    fontWeight: "600",
                    fontSize: "24px",
                    lineHeight: "24px",
                  }}
                >
                  Accepted time:
                </Typography>
                <CssTextField
                  // sx={{
                  //   width: { xs: "90%", sm: "320px" },
                  //   height: "60px",
                  //   // marginTop: "36px",
                  //   border: "16px",
                  //   backgroundColor: "#9277F7",
                  //   // borderRadius: "16px",
                  // }}
                  value={isValidEntry(
                    `${
                      order?.serialized_data?.accepted_at
                        ? new Date(
                            order?.serialized_data?.accepted_at
                          ).toLocaleTimeString()
                        : ""
                    }`
                  )}
                  variant="outlined"
                  disabled
                />
              </Grid>
            </>
          )}
        </Grid>
      </DetailsMain>
    </>
  );
};

export default Order;
