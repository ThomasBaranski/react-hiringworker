import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assignRoleList: [],
};

const assignRoleReducerSlice = createSlice({
  name: "assingRoleList",
  initialState,
  reducers: {
    assignRolesList: (state, { payload }) => {
      // console.log("state assignROlelist payload", payload);
      state.assignRoleList = payload;
    },
  },
});

export default assignRoleReducerSlice.reducer;
export const { assignRolesList } = assignRoleReducerSlice.actions;
