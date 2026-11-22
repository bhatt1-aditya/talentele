"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = __importDefault(require("./app.js"));
const database_js_1 = require("./config/database.js");
const env_js_1 = require("./config/env.js");
const seed_js_1 = require("./config/seed.js");
async function bootstrap() {
    // 1. Start Express HTTP Server immediately
    const server = app_js_1.default.listen(env_js_1.config.port, () => {
        console.log(`=======================================================`);
        console.log(`🚀 Talentele Backend API Server Running!`);
        console.log(`📡 Local Port: http://localhost:${env_js_1.config.port}`);
        console.log(`🌍 Environment: ${env_js_1.config.nodeEnv}`);
        console.log(`🔗 Allowed Origins: ${env_js_1.config.clientOrigins.join(", ")}`);
        console.log(`📊 Health Endpoint: http://localhost:${env_js_1.config.port}/api/v1/health`);
        console.log(`=======================================================`);
    });
    // 2. Establish MongoDB connection (with automatic seeding on connect)
    (0, database_js_1.connectDB)().then(async (dbConnected) => {
        if (dbConnected) {
            await (0, seed_js_1.seedMongoDatabase)();
        }
    }).catch((err) => {
        console.error("Database initialization error:", err.message);
    });
    // Graceful termination handling
    const shutdown = async () => {
        console.log("\nGracefully stopping Talentele Backend Server...");
        await (0, database_js_1.disconnectDB)();
        server.close(() => {
            console.log("HTTP server closed.");
            process.exit(0);
        });
    };
    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);
    return server;
}
// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection Error:", err);
});
// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception Error:", err);
});
exports.default = bootstrap();
