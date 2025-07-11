import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";

export const createTask = async (taskData) => {
  return await Task.create(taskData);
};

export const getAllTasks = async () => {
  return await Task.find().sort({ createdAt: -1 });
};

export const getTaskById = async (taskId) => {
  return await Task.findById(taskId);
};

export const updateTask = async (taskId, updatedData) => {
  return await Task.findByIdAndUpdate(taskId, updatedData, { new: true });
};

export const deleteTask = async (taskId) => {
  return await Task.findByIdAndDelete(taskId);
};

export const moveTask = async (taskId, newStatus) => {
  return await Task.findByIdAndUpdate(
    taskId,
    { status: newStatus },
    { new: true }
  );
};

export const assignTask = async (taskId, userName) => {
  return await Task.findByIdAndUpdate(
    taskId,
    { assignedTo: userName },
    { new: true }
  );
};

export const getAllActiveTasksGroupedByUser = async () => {
  return await User.aggregate([
    {
      $lookup: {
        from: "tasks",
        localField: "userName",
        foreignField: "assignedTo",
        as: "activeTasks",
        pipeline: [{ $match: { status: { $ne: "Done" } } }],
      },
    },
    {
      $project: {
        userName: "$userName",
        count: { $size: "$activeTasks" },
      },
    },
  ]);
};
