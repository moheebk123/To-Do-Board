import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
    assignedTasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "task",
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.model("user", userSchema);
