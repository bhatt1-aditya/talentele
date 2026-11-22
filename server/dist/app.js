"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const env_js_1 = require("./config/env.js");
const errorHandler_middleware_js_1 = require("./middlewares/errorHandler.middleware.js");
const index_js_1 = __importDefault(require("./routes/index.js"));
const apiResponse_js_1 = require("./utils/apiResponse.js");
const app = (0, express_1.default)();
// Security Headers
app.use((0, helmet_1.default)());
// Cross-Origin Resource Sharing
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, postman)
        if (!origin)
            return callback(null, true);
        if (env_js_1.config.clientOrigins.includes("*") ||
            env_js_1.config.clientOrigins.includes(origin) ||
            origin.startsWith("http://localhost:") ||
            origin.startsWith("http://127.0.0.1:")) {
            return callback(null, true);
        }
        return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
// Request Parsing
app.use(express_1.default.json({ limit: "5mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "5mb" }));
// HTTP Request Logging
if (env_js_1.config.nodeEnv !== "test") {
    app.use((0, morgan_1.default)(env_js_1.config.isProduction ? "combined" : "dev"));
}
// API Routes
app.use("/api/v1", index_js_1.default);
app.use("/api", index_js_1.default); // Convenience alias
// Root route
app.get("/", (req, res) => {
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
app.use((req, res) => {
    return (0, apiResponse_js_1.sendError)(res, `Resource not found on endpoint: [${req.method}] ${req.originalUrl}`, 404);
});
// Global Error Handler
app.use(errorHandler_middleware_js_1.errorHandler);
exports.default = app;
