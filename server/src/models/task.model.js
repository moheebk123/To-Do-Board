import mongoose from "mongoose";

const forbiddenTitles = [
  "todo",
  "to-do",
  "to_do",
  "in progress",
  "in-progress",
  "in_progress",
  "done",
];

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator: function (v) {
          return !forbiddenTitles.includes(v.toLowerCase());
        },
        message: "Title must not match column names (Todo, In Progress, Done)",
      },
    },
    description: {
      type: String,
      default: "",
    },
    assignedTo: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["Todo", "In Progress", "Done"],
      default: "Todo",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model("task", taskSchema);
