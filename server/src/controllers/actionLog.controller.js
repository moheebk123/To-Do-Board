import * as actionLogServices from "../services/actionLog.services.js";

export const getLatestLogs = async (_, res) => {
  try {
    const logs = await actionLogServices.getLatestLogs(20);

    return res.status(200).json({ logs });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch action logs" });
  }
};
