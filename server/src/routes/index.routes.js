import express from "express";
import { authRoutes } from "./auth.routes.js";
import { taskRoutes } from "./task.routes.js";
import { actionLogRoutes } from "./actionLog.routes.js";
import { userRoutes } from "./user.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/tasks", taskRoutes);
router.use("/logs", actionLogRoutes);
router.use("/users", userRoutes);

export default router;
