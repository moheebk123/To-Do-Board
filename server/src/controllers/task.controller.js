import * as taskServices from "../services/task.services.js";
import * as actionLogServices from "../services/actionLog.services.js";

export const getAllTasks = async (_, res) => {
  try {
    const tasks = await taskServices.getAllTasks();
    return res.status(200).json({ tasks, success: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to fetch tasks", success: true });
  }
};

export const createTask = async (req, res) => {
  try {
    const {
      title,
      description = "",
      status = "Todo",
      priority = "Low",
      assignedTo = "",
    } = req.body;
    const task = await taskServices.createTask({
      title,
      description,
      status,
      priority,
      assignedTo,
    });

    await actionLogServices.createActionLog({
      who: req.user.userName,
      taskTitle: task.title,
      action: "CREATE",
      details: { field: "task", before: null, after: task.title },
    });

    return res
      .status(201)
      .json({ task, success: true, message: "Task created successfully" });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Task title must be unique", success: false });
    }
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to create task", success: false });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const existingTask = await taskServices.getTaskById(id);
    if (!existingTask) {
      return res
        .status(404)
        .json({ message: "Task not found", success: false });
    }

    if (
      new Date(updates.updatedAt).getTime() !==
      new Date(existingTask.updatedAt).getTime()
    ) {
      return res.status(409).json({
        message: "Conflict detected: Task was modified by someone else.",
        success: false,
        conflict: existingTask,
      });
    }

    const updatedTask = await taskServices.updateTask(id, updates);

    const logs = [];

    for (const key in updates) {
      const oldValue = existingTask[key];
      const newValue = updates[key];

      if (oldValue !== newValue) {
        logs.push({
          field: key,
          before: String(oldValue),
          after: String(newValue),
        });
      }
    }

    for (const change of logs) {
      await actionLogServices.createActionLog({
        who: req.user.userName,
        taskTitle: updatedTask.title,
        action: "UPDATE",
        details: change,
      });
    }

    return res
      .status(200)
      .json({
        task: updatedTask,
        success: true,
        message: "Task updated successfully",
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to update task", success: false });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await taskServices.deleteTask(id);

    await actionLogServices.createActionLog({
      who: req.user.userName,
      taskTitle: deleted.title,
      action: "DELETE",
      details: { field: "task", before: deleted.title, after: null },
    });

    return res
      .status(200)
      .json({ message: "Task deleted successfully", success: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to delete task", success: false });
  }
};

export const moveTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const existingTask = await taskServices.getTaskById(id);
    if (!existingTask) {
      return res
        .status(404)
        .json({ message: "Task not found", success: false });
    }

    const updatedTask = await taskServices.moveTask(id, status);

    await actionLogServices.createActionLog({
      who: req.user.userName,
      taskTitle: updatedTask.title,
      action: "MOVE",
      details: { field: "status", before: existingTask.status, after: status },
    });

    return res.status(200).json({
      task: updatedTask,
      message: "Task status changed successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to change task status", success: false });
  }
};

export const smartAssignTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await taskServices.getTaskById(id);
    if (!task)
      return res
        .status(404)
        .json({ message: "Task not found", success: false });

    const grouped = await taskServices.getAllActiveTasksGroupedByUser();

    if (!grouped.length) {
      return res
        .status(404)
        .json({ message: "No users available", success: false });
    }

    const leastUser = grouped.reduce((min, user) =>
      user.count < min.count ? user : min
    );

    const updated = await taskServices.assignTask(id, leastUser.userName);

    await actionLogServices.createActionLog({
      who: req.user.userName,
      taskTitle: updated.title,
      action: "SMART_ASSIGN",
      details: {
        field: "assignedTo",
        before: String(task.assignedTo),
        after: leastUser.userName,
      },
    });

    return res
      .status(200)
      .json({ task: updated, success: true, message: "Task assigned smartly" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Smart assign failed", success: false });
  }
};
