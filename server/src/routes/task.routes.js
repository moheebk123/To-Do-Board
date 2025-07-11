import { Router } from "express";
import * as taskControllers from "../controllers/task.controller.js";

const router = Router();

router
  .route("/")
  .get(taskControllers.getAllTasks)
  .post(taskControllers.createTask);

router
  .route("/:id")
  .put(taskControllers.updateTask)
  .delete(taskControllers.deleteTask);

router.patch("/:id/move", taskControllers.moveTask);

router.patch("/:id/assign", taskControllers.assignTask);

router.post("/:id/smart-assign", taskControllers.smartAssignTask);

export const taskRoutes = router;
