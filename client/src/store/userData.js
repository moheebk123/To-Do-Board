import { createSlice } from "@reduxjs/toolkit";

const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    isCheckingAuth: true,
    isAuthenticated: false,
    userData: {},
  },
  reducers: {
    updateUser: (state, action) => {
      if (action.payload) {
        state.userData = action.payload;
        state.isAuthenticated = true;
        state.isCheckingAuth = false;
      } else {
        state.userData = {};
        state.isAuthenticated = false;
        state.isCheckingAuth = false;
      }
    }
  },
});

export const userDataActions = userDataSlice.actions;
export default userDataSlice;
