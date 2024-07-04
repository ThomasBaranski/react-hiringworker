import {
  Box,
  Button,
  Pagination,
  PaginationItem,
  Stack,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  TableBody,
  Avatar,
} from "@mui/material";
import React, { useState } from "react";
import { useFindWithdrawalByTypeQuery } from "../../redux/services/withdrawalAudit.service";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useEffect } from "react";
import TableSkeleton from "../../utils/tableSkeleton/TableSkeleton";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../components/common/StyledTable";
import WithdrawalauditStaff from "./WithdrawalauditStaff";
import WithdrawalauditCustomer from "./WithdrawalauditCustomer";
import WithdrawalauditSuperAdmin from "./WithdrawalauditSuperAdmin";

// import TopUpStaff from "./TopUpStaff";
// import TopUpCustomer from "./TopUpCustomer";
// import TopUpAdmin from "./TopUpAdmin";

const WithdrawalAudit = () => {
  const [lastClickedButton, setLastClickedButton] = useState("staff");
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  const [startdate, setstartdata] = useState(null);
  const [enddate, setenddate] = useState(null);
  const [searchquery, setsearchquery] = useState("");
  const {
    data: alldata,
    error,
    isLoading,
    refetch,
  } = useFindWithdrawalByTypeQuery({
    page: page,
    usertype: lastClickedButton,
    search2: searchquery,
  });

  const [component, setComponent] = useState("staff");

  const handleButtonClick = (button) => {
    setLastClickedButton(button);
    setComponent(button);
  };

  useEffect(() => {
    refetch();
  }, [component, refetch]);

  useEffect(() => {
    setData(alldata);
  }, [alldata, page]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    setPage(1);
  }, [component]);

  const handleSearch = (query) => {
    if (query) {
      setPage(1);
      setsearchquery(query);
    } else {
      setsearchquery("");
    }
  };

  return (
    <>
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
            marginBottom: "10px",
          }}
        >
          Withdrawal (Audit)
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
                lastClickedButton === "staff" ? "#9277F7" : "#9277F7",
              opacity: component === "staff" ? 1 : 0.5,
              "&:hover": {
                backgroundColor:
                  lastClickedButton === "staff" ? "#9277F7" : "#9277F7",
              },
            }}
            onClick={() => handleButtonClick("staff")}
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
                lastClickedButton === "skilled_worker" ? "#9277F7" : "#9277F7",
              opacity: component === "skilled_worker" ? 1 : 0.5,
            }}
            onClick={() => handleButtonClick("skilled_worker")}
          >
            skilled worker
          </Button>
          <Button
            variant="contained"
            sx={{
              width: "230px",
              height: "44px",
              borderRadius: "8px",
              textAlign: "center",
              backgroundColor:
                lastClickedButton === "admin" ? "#9277F7" : "#9277F7",
              opacity: component === "admin" ? 1 : 0.5,
            }}
            onClick={() => handleButtonClick("admin")}
          >
            Super Admin
          </Button>
        </Box>
      </Box>

      {component === "staff" && (
        <WithdrawalauditStaff
          data={data}
          isLoading={isLoading}
          page={page}
          setPage={setPage}
          handleSearch={handleSearch}
          TooltipText="Search By: Staff name, SW, Status"
        />
      )}
      {component === "skilled_worker" && (
        <WithdrawalauditCustomer
          data={data}
          isLoading={isLoading}
          page={page}
          setPage={setPage}
          handleSearch={handleSearch}
          TooltipText="Search By: SW, Admin, status "
        />
      )}
      {component === "admin" && (
        <WithdrawalauditSuperAdmin
          data={data}
          isLoading={isLoading}
          page={page}
          setPage={setPage}
          handleSearch={handleSearch}
          TooltipText="Search By: Super admin, SW, Withdrawal status"
        />
      )}
    </>
  );
};

export default WithdrawalAudit;
