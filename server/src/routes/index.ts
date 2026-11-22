import { Router } from "express";
import { dbState, isDbConnected } from "../config/database.js";
import analyticsRoutes from "./analytics.routes.js";
import authRoutes from "./auth.routes.js";
import cohortsRoutes from "./cohorts.routes.js";
import coursesRoutes from "./courses.routes.js";
import leadsRoutes from "./leads.routes.js";
import placementsRoutes from "./placements.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/leads", leadsRoutes);
router.use("/cohorts", cohortsRoutes);
router.use("/courses", coursesRoutes);
router.use("/placements", placementsRoutes);
router.use("/analytics", analyticsRoutes);

// Health check endpoint
router.get("/health", (req, res) => {
  const connected = isDbConnected();
  res.status(200).json({
    status: "ok",
    service: "Talentele API Backend",
    database: {
      engine: "MongoDB",
      status: connected ? "connected" : "offline_fallback",
      host: connected ? dbState.host : undefined,
      database: connected ? dbState.dbName : undefined,
    },
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

export default router;
