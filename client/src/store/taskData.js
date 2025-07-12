import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "taskData",
  initialState: {
    tasks: [],
  },
  reducers: {
    updateTasks: (state, action) => {
      state.tasks = action.payload?.tasks || [];
    },
  },
});

export const taskActions = taskSlice.actions;
export default taskSlice;
