import { ActionLog } from "../models/actionLog.model.js";

export const createActionLog = async (logData) => {
  return await ActionLog.create(logData);
};

export const getLatestLogs = async (limit = 20) => {
  return await ActionLog.find().sort({ createdAt: -1 }).limit(limit);
};
