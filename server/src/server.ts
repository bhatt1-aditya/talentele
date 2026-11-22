import app from "./app.js";
import { connectDB, disconnectDB, isDbConnected } from "./config/database.js";
import { config } from "./config/env.js";
import { seedMongoDatabase } from "./config/seed.js";

async function bootstrap() {
  // 1. Start Express HTTP Server immediately
  const server = app.listen(config.port, () => {
    console.log(`=======================================================`);
    console.log(`🚀 Talentele Backend API Server Running!`);
    console.log(`📡 Local Port: http://localhost:${config.port}`);
    console.log(`🌍 Environment: ${config.nodeEnv}`);
    console.log(`🔗 Allowed Origins: ${config.clientOrigins.join(", ")}`);
    console.log(`📊 Health Endpoint: http://localhost:${config.port}/api/v1/health`);
    console.log(`=======================================================`);
  });

  // 2. Establish MongoDB connection (with automatic seeding on connect)
  connectDB().then(async (dbConnected) => {
    if (dbConnected) {
      await seedMongoDatabase();
    }
  }).catch((err) => {
    console.error("Database initialization error:", err.message);
  });

  // Graceful termination handling
  const shutdown = async () => {
    console.log("\nGracefully stopping Talentele Backend Server...");
    await disconnectDB();
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
process.on("unhandledRejection", (err: any) => {
  console.error("Unhandled Rejection Error:", err);
});

// Handle uncaught exceptions
process.on("uncaughtException", (err: any) => {
  console.error("Uncaught Exception Error:", err);
});

export default bootstrap();
