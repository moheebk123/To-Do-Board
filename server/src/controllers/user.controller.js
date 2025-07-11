import * as userServices from "../services/user.services.js";

export const getAllUsers = async (_, res) => {
  try {
    const users = await userServices.getAllUsers();
    return res.status(200).json({ users, success: true, message: "User fetched successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to fetch users", success: false });
  }
};
