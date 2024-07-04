import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  all_permissions: [],
  user_permissions: [],
  user_type: "admin",
  user_info: {},
};

const permissionsSlice = createSlice({
  name: "permissionsSlice",
  initialState,
  reducers: {
    setAllPermissions: (state, { payload }) => {
      state.all_permissions = payload;
    },
    setUserPermissions: (state, { payload }) => {
      // console.log("state p", payload);
      state.user_permissions = payload;
    },
    setUserType: (state, { payload }) => {
      // console.log("state p", payload);
      state.user_type = payload;
    },
    setUserinfo: (state, { payload }) => {
      state.user_info = payload;
    },
  },
});

export default permissionsSlice.reducer;
export const {
  setAllPermissions,
  setUserPermissions,
  setUserType,
  setUserinfo,
} = permissionsSlice.actions;
