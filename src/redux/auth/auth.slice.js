import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../services";

const initialState = {
  token: "",
  user: null,
  userType: "admin",
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.token = "";
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        console.log("payloadAddmatcher", payload);
        state.token = payload.token;
        state.user = payload.user;
        state.userType = payload.user.user_type;
      }
    );
  },
});

export default authReducer.reducer;
export const { logOut } = authReducer.actions;
