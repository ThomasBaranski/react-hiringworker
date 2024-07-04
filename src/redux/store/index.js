import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { changePasswordApi } from "../services/changePassword.services";
import { dashboardApi } from "../services/dashboard.service";
import { filterApi } from "../services/filter.service";
import { forgotApi } from "../services/forgot.service";
import { loginApi } from "../services/login.service";
import { ratingApi } from "../services/rating.service";
import { resetApi } from "../services/reset.service";
import { skillWokerApi } from "../services/skillworker.service";
import { categoryApi } from "../services/category.service";
import { userPermissionsApi } from "../services/roleManagement/roleManagement.service";
import { newsLetterApi } from "../services/newsletter.service";
import { termPolicyApi } from "../services/term&condition.service";
import { privacyPolicyApi } from "../services/privacy&policy.service";
import { customerApi } from "../services/customer.service";
import { StaffManagmentApi } from "../services/staffManagment.service";
// import { CityApi } from "../services/city.service";
// import { StateApi } from "../services/state.service";
// import { CountryApi } from "../services/country.service";
import { dynamicCommisionApi } from "../services/dynamicCommision.service";
import permissionsSlice from "../slices/permissions.slice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { importApi } from "../services/import.service";
import assignRoleReducerSlice from "../services/roleManagement/roleManagement.slice";
import { CountryStateCityApi } from "../services/countryStateCity.service";
import { reportedUserApi } from "../services/reportedUser.service";
import { topUpApi } from "../services/topup.service";
import { auditApi } from "../services/audit.service";
import { ordersApi } from "../services/order.service";
import { withdrawalApi } from "../services/withdrawal.service";
import { disputeApi } from "../services/dispute.service";
import { contactusApi } from "../services/contactus.servics";
import { earningApi } from "../services/earning.service";
import { withdrawalAuditApi } from "../services/withdrawalAudit.service";

const reducer = combineReducers({
  assignRoleReducerSlice,
  [loginApi.reducerPath]: loginApi.reducer,
  [forgotApi.reducerPath]: forgotApi.reducer,
  [resetApi.reducerPath]: resetApi.reducer,
  [skillWokerApi.reducerPath]: skillWokerApi.reducer,
  [changePasswordApi.reducerPath]: changePasswordApi.reducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer,
  [filterApi.reducerPath]: filterApi.reducer,
  [ratingApi.reducerPath]: ratingApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [userPermissionsApi.reducerPath]: userPermissionsApi.reducer,
  [newsLetterApi.reducerPath]: newsLetterApi.reducer,
  [termPolicyApi.reducerPath]: termPolicyApi.reducer,
  [privacyPolicyApi.reducerPath]: privacyPolicyApi.reducer,
  [customerApi.reducerPath]: customerApi.reducer,
  [StaffManagmentApi.reducerPath]: StaffManagmentApi.reducer,
  // [CityApi.reducerPath]: CityApi.reducer,
  // [StateApi.reducerPath]: StateApi.reducer,
  // [CountryApi.reducerPath]: CountryApi.reducer,
  [CountryStateCityApi.reducerPath]: CountryStateCityApi.reducer,
  [dynamicCommisionApi.reducerPath]: dynamicCommisionApi.reducer,
  [importApi.reducerPath]: importApi.reducer,
  [reportedUserApi.reducerPath]: reportedUserApi.reducer,
  [topUpApi.reducerPath]: topUpApi.reducer,
  [withdrawalApi.reducerPath]: withdrawalApi.reducer,
  [auditApi.reducerPath]: auditApi.reducer,
  [ordersApi.reducerPath]: ordersApi.reducer,
  [disputeApi.reducerPath]: disputeApi.reducer,
  [earningApi.reducerPath]: earningApi.reducer,
  [contactusApi.reducerPath]: contactusApi.reducer,
  [withdrawalAuditApi.reducerPath]: withdrawalAuditApi.reducer,
  Permissions: permissionsSlice,
});
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["Permissions"],
};
const persistedReducer = persistReducer(persistConfig, reducer);
const Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      loginApi.middleware,
      forgotApi.middleware,
      resetApi.middleware,
      skillWokerApi.middleware,
      changePasswordApi.middleware,
      dashboardApi.middleware,
      filterApi.middleware,
      ratingApi.middleware,
      categoryApi.middleware,
      userPermissionsApi.middleware,
      newsLetterApi.middleware,
      termPolicyApi.middleware,
      // asignRoleApi.middleware,
      privacyPolicyApi.middleware,
      customerApi.middleware,
      StaffManagmentApi.middleware,
      // CityApi.middleware,
      // StateApi.middleware,
      // CountryApi.middleware,
      CountryStateCityApi.middleware,
      dynamicCommisionApi.middleware,
      importApi.middleware,
      reportedUserApi.middleware,
      topUpApi.middleware,
      withdrawalApi.middleware,
      auditApi.middleware,
      ordersApi.middleware,
      disputeApi.middleware,
      contactusApi.middleware,
      earningApi.middleware,
      withdrawalAuditApi.middleware,
    ]),
});

export const persistor = persistStore(Store);
export default Store;
