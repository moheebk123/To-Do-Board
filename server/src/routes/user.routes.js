import { Router } from "express";
import * as userControllers from "../controllers/user.controller.js";

const router = Router();

router.get("/", userControllers.getAllUsers);

router.get("/least-busy", userControllers.getLeastBusyUser);

export const userRoutes = router;
