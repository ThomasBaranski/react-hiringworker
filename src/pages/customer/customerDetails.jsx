import React, { useMemo } from "react";
import styled from "@emotion/styled";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { ReactComponent as Setting } from "../../assets/images/setting.svg";
import { useLocation, useParams } from "react-router-dom";
import { isValidEntry } from "../../utils/ValidFormEntry";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { useSingleCustomerByIdQuery } from "../../redux/services/customer.service";
import { downloadExcel } from "react-export-table-to-excel";
// import { useSingleCustomerByIdQuery } from "../../redux/services/customer.service";
const customerData1 = [
  {
    key: 1,
    label: "Sr Id:",
    name: "customerData?.id",
  },
  {
    key: 2,
    label: "User Id:",
    name: "customerData?.user?.id",
  },
  {
    key: 3,
    label: "User Name:",
    name: "customerData?.user?.username",
  },
  {
    key: 4,
    label: "Email:",
    name: "customerData?.user?.email",
  },
  {
    key: 5,
    label: "First Name:",
    name: "customerData?.user?.first_name",
  },
  {
    key: 6,
    label: "Last Name:",
    name: "customerData?.user?.last_name",
  },
  {
    key: 126,
    label: "Gender:",
    name: "customerData?.user?.gender",
  },
  {
    key: 7,
    label: "Date of Birth:",
    name: "customerData?.user?.date_of_birth",
  },
  {
    key: 8,
    label: "Phone No:",
    name: "customerData?.user?.phone_number",
  },
  {
    key: 9,
    label: "Age Consent:",
    name: "customerData?.user?.age_consent",
  },
  {
    key: 10,
    label: "State:",
    name: "customerData?.user?.state",
  },
  {
    key: 11,
    label: "City:",
    name: "customerData?.user?.city",
  },
  {
    key: 12,
    label: "Country:",
    name: "customerData?.user?.country",
  },
  {
    key: 13,
    label: "Balance:",
    name: "customerData?.balance",
  },
  {
    key: 14,
    // label: "avg_rating :",
    label: "Rating:",
    name: "customerData?.average_star_rating",
  },
  {
    key: 15,
    label: "Total rating:",
    name: "customerData?.total_rating",
  },
  {
    key: 16,
    label: "Term and conditions:",
    name: "customerData?.user?.terms_and_condition",
  },
  {
    key: 17,
    label: "Active:",
    name: "customerData?.user?.is_active",
  },
  // {
  //   key: 18,
  //   label: "Quote:",
  //   name: "customerData?.quotes",
  // },
  {
    key: 19,
    label: "Total Topup Amount:",
    name: "customerData?.total_topup_amount",
  },
  {
    key: 20,
    label: "Currency:",
    name: "customerData?.balance_currency",
  },
];
// console.log("customerData1", customerData1);
const summary = [
  {
    id: 1,
    name: "Is the phone number verified?",
  },
  {
    id: 1,
    name: "Is email verified?",
  },
  {
    id: 1,
    name: "Is active?",
  },
];

const IsVarifyField = styled("div")({
  // width: "324px",
  marginTop: "20px",
  div: {
    height: "27px",
    gap: "5px",
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "27.24px",
    display: "flex",
    alignItems: "center",
  },
});
const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "green",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "16px ",
    color: "black",
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "21.79px",
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
const StyledListItem = styled(ListItem)({
  "& .MuiTypography-root": {
    fontWeight: "bold !important",
  },
  "& .MuiListItemButton-root": {
    borderRadius: "10px",
    color: "#fff",
  },
  "& .Mui-selected": {
    backgroundColor: "#fff !important",
    color: "#594DA0",
    "& .MuiListItemIcon-root": {
      stroke: "#594DA0",
      fill: "#594DA0",
    },
    fontWeight: "900 !important",
  },
});
const CustomerDetails = () => {
  const { id } = useParams();
  // const {data, {isLoading}}  = useSingleCustomerByIdQuery(id);

  // console.log("yehi ha", customerData);
  const { data } = useSingleCustomerByIdQuery(id);
  const customerData = data?.serialized_data;
  // console.log(
  //   "🚀 ~ file: customerDetails.jsx:209 ~ CustomerDetails ~ customerData:",
  //   customerData
  // );

  const handleDownloadExcel = () => {
    console.log("download excel");
    const header = [
      "Sr Id:",
      // "User ID",
      // "User Name",
      // "Email",
      // "First Name",
      // "Last Name",
      // "Date Of Birth",
    ];
    const body = [];
    customerData1?.map((row) =>
      body.push([
        row?.name?.id,
        // row?.uuid,
        // row?.user?.username,
        // row?.user?.email,
        // row?.user?.first_name,
        // row?.user?.last_name,
        // row?.user?.data_of_birth,
      ])
    );
    downloadExcel({
      fileName: "Report.xls",
      sheet: "Report.xls",
      tablePayload: { header, body: body },
    });
  };
  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          sx={{
            fontWeight: "700",
            fontSize: "40px",
            lineHeight: "64px",
            color: "#594DA0",
          }}
        >
          Customer Details
        </Typography>
        {/* <Button
          variant="contained"
          onClick={handleDownloadExcel}
          sx={{
            columnGap: 1,
            textTransform: "capitalize",
            width: "259px",
            height: "56px",
            fontSize: "28px",
            fontWeight: 600,
            lineHeight: "38.13px",
            "&:hover": {
              backgroundColor: "#9277F7",
            },
          }}
        >
          <FileUploadOutlinedIcon fontSize="large" />
          Export
        </Button> */}
      </Box>
      <Grid container spacing={2} sx={{ marginTop: "10px" }}>
        {customerData1.map((item) => (
          <Grid item xs={6} md={6} lg={4} xl={4}>
            <Typography
              sx={{ fontWeight: "600", fontSize: "24px", lineHeight: "24px" }}
            >
              {item.label}
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
              value={isValidEntry(eval(item.name))}
              variant="outlined"
            />
          </Grid>
        ))}
        <Grid item>
          <List>
            <IsVarifyField>
              {customerData?.user?.is_email_verified && (
                <div>
                  <Setting /> <span> Is email verified?</span>
                </div>
              )}
              {customerData?.user?.is_phone_number_verified && (
                <div>
                  <Setting /> <span>Is the phone number verified?</span>
                </div>
              )}
              {customerData?.user?.is_active && (
                <div>
                  <Setting /> <span>Is active?</span>
                </div>
              )}
            </IsVarifyField>
          </List>
        </Grid>
      </Grid>
    </div>
  );
};

export default CustomerDetails;
