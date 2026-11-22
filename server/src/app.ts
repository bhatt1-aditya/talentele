import cors from "cors";
import express, { Application, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "./config/env.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import apiRoutes from "./routes/index.js";
import { sendError } from "./utils/apiResponse.js";

const app: Application = express();

// Security Headers
app.use(helmet());

// Cross-Origin Resource Sharing
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, postman)
      if (!origin) return callback(null, true);
      if (
        config.clientOrigins.includes("*") ||
        config.clientOrigins.includes(origin) ||
        origin.startsWith("http://localhost:") ||
        origin.startsWith("http://127.0.0.1:")
      ) {
        return callback(null, true);
      }
      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Request Parsing
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

// HTTP Request Logging
if (config.nodeEnv !== "test") {
  app.use(morgan(config.isProduction ? "combined" : "dev"));
}

// API Routes
app.use("/api/v1", apiRoutes);
app.use("/api", apiRoutes); // Convenience alias

// Root route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    name: "Talentele Backend API Server",
    version: "1.0.0",
    status: "online",
    documentation: "/api/v1/health",
    endpoints: {
      auth: "/api/v1/auth",
      leads: "/api/v1/leads",
      cohorts: "/api/v1/cohorts",
      courses: "/api/v1/courses",
      placements: "/api/v1/placements",
      analytics: "/api/v1/analytics/stats",
    },
  });
});

// 404 Handler for undefined routes
app.use((req: Request, res: Response) => {
  return sendError(
    res,
    `Resource not found on endpoint: [${req.method}] ${req.originalUrl}`,
    404
  );
});

// Global Error Handler
app.use(errorHandler);

export default app;
