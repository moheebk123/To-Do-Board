import { getAllTasks } from "../services/task.services.js";
import { getLatestLogs } from "../services/actionLog.services.js";
import { getAllUsers } from "../services/user.services.js";

export const setupSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("🟢 New client connected", socket.id);

    socket.on("tasksChanges", async () => {
      try {
        const tasks = await getAllTasks();
        const logs = await getLatestLogs();
        const users = await getAllUsers();
        io.emit("changesFetched", { tasks, logs, users });
      } catch (error) {
        console.error(
          "Error fetching tasks and action logs on socket event:",
          error
        );
      }
    });

    socket.on("userRegister", async () => {
      console.log("register called")
      try {
        const users = await getAllUsers();
        io.emit("usersFetched", { users });
      } catch (error) {
        console.error(
          "Error fetching tasks and action logs on socket event:",
          error
        );
      }
    });

    socket.on("disconnect", () => {
      console.log("🔴 Client disconnected", socket.id);
    });
  });
};
