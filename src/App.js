import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Layout from "./components/layout/Layout";
import Category from "./pages/category/Category";

import ForgotPassword from "./pages/forgotPassword/forgotPassword";

// import "./App.css";
import Login from "./pages/login/Login";
import ResetPassowrd from "./pages/resetPassword/resetPassword";
import RoleManegement from "./pages/rolemanagement/RoleManagement";
import Dashboard from "./pages/dashboard/Dashboard";
import Reported from "./pages/reported/Reported";
import NewsLetter from "./pages/newsletter/NewsLetter";

import Skilled from "./pages/skilled/Skilled";
import Withdrawal from "./pages/withdrawal/Withdrawal";
import Earning from "./pages/earning/Earning";
import Staff from "./pages/staff/Staff";
import Customer from "./pages/customer/Customer";
import Dispute from "./pages/dispute/Dispute";
import ImportExport from "./pages/importexport/ImportExport";
import Dynamic from "./pages/dynamic/Dynamic";
import Orders from "./pages/orders/Orders";
import { Toaster } from "react-hot-toast";
import CustomerDetails from "./pages/customer/customerDetails";
import Protected from "./components/Protected";
import SkilledWorker from "./pages/skilled/SkiledWorker";
import Otp from "./pages/forgotPassword/Otp";
import ChangePassword from "./pages/changePassword/ChangePassword";
import CreateRole from "./pages/rolemanagement/CreateRole";

import Term from "./pages/terms&conditions/TermAndConditions";
import UpdateRole from "./pages/rolemanagement/UpdateRole";
import Role from "./pages/rolemanagement/Role";
import CreateUser from "./pages/staff/CreateUser";
import PrivacyPolicy from "./pages/privacy_policy/PrivacyPolicy";
import EditUser from "./pages/staff/EditUser";
import ViewUserProfile from "./pages/staff/ViewUserProfile";
import SubTabRole from "./pages/rolemanagement/SubTabRole";
import TopUpCustomer from "./pages/audit/TopUpCustomer";
import TopUpStaff from "./pages/audit/TopUpStaff";
import ReportSingleUser from "./pages/reported/reportSingleUser";
import StaffWithdraw from "./pages/withdrawal/StaffWithdraw";
import CustomerWithdraw from "./pages/withdrawal/customerWithdraw";
import CreateCustomer from "./pages/customer/CreateCustomer";
import EditCustomer from "./pages/customer/EditCustomer";
import Audit from "./pages/audit/Audit";
import TopUp from "./pages/topup/TopUp";
import UpdateTopUp from "./pages/topup/UpdateTopUp";
import CreateSkilled from "./pages/skilled/CreateSkiledWorker";
import EditSkilledWorker from "./pages/skilled/EditSkilledWorker";
import { useSelector } from "react-redux";
import { checkViewPermission } from "./utils/checkViewPermissions";
import { useEffect } from "react";
import Order from "./pages/orders/Order";
import UpdateWithdrawal from "./pages/withdrawal/UpdateWithdrawal";
import Notification from "./components/notification/Notification";
import WithdrawalAudit from "./pages/withdrawalaudit/WithdrawalAudit";
import SingleDisputePage from "./pages/dispute/SingleDispute";
import ContactUs from "./pages/contactus/ContactUs";
import SingleContactUs from "./pages/contactus/SingleContactUs";
import WithdrawalStaff from "./pages/withdrawalaudit/singlepage/WithdrawalStaff";
import Withdrawalskilledworker from "./pages/withdrawalaudit/singlepage/Withdrawalskilledworker";

// import  from "./components/permissionProtectedRoute/PermissionProtectedRoute";
// import PermissionProtectedRoute from "./components/permissionProtectedRoute/PermissionProtectedRoute";

// import RoleList from "./pages/rolemanagement/RoleList";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = useSelector((state) => state);

  // console.log("stat.Permission", state.Permissions);
  // console.log("location.pathname", location.pathname);

  // const isAllowed = checkViewPermission(
  //   location.pathname,
  //   state.Permissions?.user_permissions
  // );

  useEffect(() => {
    if (state.Permissions.user_type == "admin") return;
    if (!state.Permissions?.user_permissions) return;
    if (location.pathname == "/login") return;
    const isAllowed = checkViewPermission(
      location.pathname,
      state.Permissions?.user_permissions
    );
    if (!isAllowed) {
      navigate("/forbidden");
    }
  }, [location.pathname, state.Permissions?.user_permissions]);

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/otp" element={<Otp />} />

        <Route path="/reset" element={<ResetPassowrd />} />
        <Route path="/change" element={<ChangePassword />} />
        <Route path="/roleman" element={<Role />} />

        <Route path="/" element={<Protected Component={Layout} />}>
          <Route path="/createuser" element={<CreateUser />} />
          <Route path="/edituser/:id" element={<EditUser />} />
          <Route path="/viewprofile/:id" element={<ViewUserProfile />} />
          <Route path="/createrole" element={<CreateRole />} />
          <Route path="/updaterole/:id" element={<UpdateRole />} />
          <Route path="/category" element={<Category />} />
          {/* <Route path="/manage" element={<RoleList />} /> */}
          <Route path="/terms-conditions" element={<Term />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/role" element={<RoleManegement />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/report" element={<Reported />} />
          <Route
            path="/singlereporteduser/:id"
            element={<ReportSingleUser />}
          />
          <Route path="/news" element={<NewsLetter />} />
          <Route path="/manage" element={<SubTabRole />} />
          <Route
            path="/audit"
            element={<Audit Protected Component={Audit} />}
          />
          <Route
            path="/withdrawal-audit"
            element={<WithdrawalAudit Protected Component={WithdrawalAudit} />}
          />
          <Route
            path="/topup"
            element={<TopUp Protected Component={TopUp} />}
          />
          <Route
            path="/updatetop/:id"
            element={<UpdateTopUp Protected Component={UpdateTopUp} />}
          />
          <Route
            path="/topupcustomer"
            element={<TopUpCustomer Component={TopUpCustomer} />}
          />
          <Route
            path="/topupstaff"
            element={<TopUpStaff Protected Component={TopUpStaff} />}
          />
          <Route
            path="/skill"
            element={<Skilled Protected Component={Skilled} />}
          />
          <Route path="/skillprofile/:id" element={<SkilledWorker />} />
          <Route
            path="/withdraw"
            element={<Withdrawal Protected Component={Withdrawal} />}
          />
          <Route
            path="/update-withdrawal/:id"
            element={
              <UpdateWithdrawal Protected Component={UpdateWithdrawal} />
            }
          />
          <Route
            path="/withdrawal-staff/:id"
            element={<WithdrawalStaff Protected Component={WithdrawalStaff} />}
          />
          <Route
            path="/withdrawal-skilled-worker/:id"
            element={<Withdrawalskilledworker />}
          />
          <Route path="/staffwihdraw" element={<StaffWithdraw />} />
          <Route path="/customerwithdraw" element={<CustomerWithdraw />} />
          <Route path="/earning" element={<Earning />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/dispute" element={<Dispute />} />
          <Route path="/dispute/:id" element={<SingleDisputePage />} />
          <Route path="/importexport" element={<ImportExport />} />
          <Route path="/dynamic" element={<Dynamic />} />
          <Route path="/order" element={<Orders />} />
          <Route path="/order/:id" element={<Order />} />
          <Route path="/skilled-worker" element={<CreateSkilled />} />
          <Route
            path="/edit-skilled-worker/:id"
            element={<EditSkilledWorker />}
          />
          <Route path="/customerdetails/:id" element={<CustomerDetails />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="customercreate" element={<CreateCustomer />} />
          <Route path="/editcustomer/:id" element={<EditCustomer />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/contact-us/:id" element={<SingleContactUs />} />
        </Route>
        <Route
          path="/forbidden"
          element={
            <div
              style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1>403</h1>
              <h3>Forbidden Access</h3>
              <p>Sorry, you don't have permission to access this page. </p>
            </div>
          }
        />

        <Route
          path="*"
          element={
            <div
              style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1>404</h1>
              <h3>Not Found</h3>
              <p>The Resource request could not be found on this server</p>
            </div>
          }
        />
      </Routes>
      {/* <Notification /> */}
      <Toaster />
    </div>
  );
}

export default App;
