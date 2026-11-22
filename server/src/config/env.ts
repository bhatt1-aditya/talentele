import path from "path";
import dotenv from "dotenv";

// Load .env reliably whether started from root or server directory
dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), ".env") });
dotenv.config({ path: path.resolve(process.cwd(), "server/.env") });

export const config = {
  port: parseInt(process.env.PORT || "5000", 10),
  nodeEnv: process.env.NODE_ENV || "development",
  isProduction: process.env.NODE_ENV === "production",
  clientOrigins: (process.env.CLIENT_ORIGIN || "http://localhost:3000,http://127.0.0.1:3000")
    .split(",")
    .map((o) => o.trim()),
  jwt: {
    secret: process.env.JWT_SECRET || "talentele_default_secret_key_2026",
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  },
  admin: {
    email: process.env.ADMIN_EMAIL || "admin@talentele.com",
    phone: process.env.ADMIN_PHONE || "9437012849",
    password: process.env.ADMIN_PASSWORD || "Talentele@Admin2026",
  },
  mongodbUri:
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/talentele",
  storageDir: process.env.DATA_STORAGE_DIR || "./data_storage",
};
