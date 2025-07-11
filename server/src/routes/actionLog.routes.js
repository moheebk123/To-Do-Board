import { Router } from "express";

import * as actionLogControllers from "../controllers/actionLog.controller.js";

const router = Router();

router.get("/latest", actionLogControllers.getLatestLogs);

export const actionLogRoutes = router;
