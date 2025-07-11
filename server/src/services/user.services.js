import { User } from "../models/user.model.js";

export const createUser = async (newUser) => {
  return await User.create(newUser);
};

export const getUserByUserName = async (userName) => {
  return await User.findOne({ userName });
};

export const getUserById = async (userId) => {
  return await User.findById(userId);
};

export const getAllUsers = async () => {
  return await User.find({}, { password: 0, refreshToken: 0 });
};

export const updateRefreshToken = async (userId, refreshToken = "") => {
  await User.findByIdAndUpdate(userId, { $set: { refreshToken } });
};
