import { createSlice } from "@reduxjs/toolkit";

const actionLogSlice = createSlice({
  name: "actionLogData",
  initialState: {
    logs: [],
  },
  reducers: {
    updateActionLog: (state, action) => {
      state.logs = action.payload?.logs || [];
    },
  },
});

export const actionLogActions = actionLogSlice.actions;
export default actionLogSlice;
