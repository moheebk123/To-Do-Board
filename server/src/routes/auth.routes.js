import { Router } from "express";
import * as authControllers from "../controllers/auth.controller.js";

const router = Router();

router.route("/register").post(authControllers.handleRegister);

router.route("/login").post(authControllers.handleLogin);

router.route("/logout").post(authControllers.handleLogout);

router.route("/check-auth").get(authControllers.handleUserSession);

export const authRoutes = router;
