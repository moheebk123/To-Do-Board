import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "showAlert",
  initialState: {
    show: false,
    type: "",
    message: "",
  },
  reducers: {
    showAlert: (state, action) => {
      if (action.payload) {
        state.show = action.payload.show;
        state.type = action.payload.type;
        state.message = action.payload.message;
      } else {
        // Reset to default state
        state.show = false;
        state.type = "";
        state.message = "";
      }
    },
  },
});

export const alertActions = alertSlice.actions;
export default alertSlice;
