import mongoose from "mongoose";

const actionLogSchema = new mongoose.Schema(
  {
    who: {
      type: String,
      required: true,
    },
    taskTitle: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
      enum: [
        "CREATE",
        "UPDATE",
        "DELETE",
        "MOVE",
        "ASSIGN",
        "DRAG_DROP",
        "SMART_ASSIGN",
        "CONFLICT_RESOLVED",
      ],
    },
    details: {
      field: { type: String },
      before: { type: String },
      after: { type: String },
    },
  },
  { timestamps: true }
);

export const ActionLog = mongoose.model("actionLogs", actionLogSchema);
