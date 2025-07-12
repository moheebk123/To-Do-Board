import { configureStore } from "@reduxjs/toolkit";
import alertSlice, { alertActions } from "./alert";
import userDataSlice, { userDataActions } from "./userData";
import actionLogSlice, { actionLogActions } from "./actionLog";
import taskSlice, { taskActions } from "./taskData";
import usersSlice, { usersActions } from "./users";

export const store = configureStore({
  reducer: {
    showAlert: alertSlice.reducer,
    userData: userDataSlice.reducer,
    actionLogData: actionLogSlice.reducer,
    taskData: taskSlice.reducer,
    users: usersSlice.reducer,
  },
});

export {
  alertActions,
  userDataActions,
  actionLogActions,
  taskActions,
  usersActions,
};
