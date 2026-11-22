import { Router } from "express";
import { AnalyticsController } from "../controllers/analytics.controller.js";

const router = Router();

router.get("/stats", AnalyticsController.getDashboardStats);

export default router;
