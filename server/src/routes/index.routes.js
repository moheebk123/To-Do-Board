import express from "express";
import { authRoutes } from "./auth.route.js";
import { taskRoutes } from "./task.route.js";
import { actionLogRoutes } from "./actionLog.route.js";
import { userRoutes } from "./user.route.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/tasks", taskRoutes);
router.use("/logs", actionLogRoutes);
router.use("/users", userRoutes);

export default router;
