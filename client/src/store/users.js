import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
  },
  reducers: {
    updateUsers: (state, action) => {
      state.users = action.payload?.users || [];
    },
  },
});

export const usersActions = usersSlice.actions;
export default usersSlice;
