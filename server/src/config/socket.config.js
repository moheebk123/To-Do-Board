import { getAllTasks } from "../services/task.services.js";
import { getLatestLogs } from "../services/actionLog.services.js";

export const setupSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("🟢 New client connected", socket.id);

    socket.on("tasksChanges", async () => {
      console.log("called")
      try {
        const tasks = await getAllTasks();
        const logs = await getLatestLogs();
        io.emit("changesFetched", { tasks, logs });
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
