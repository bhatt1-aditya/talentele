"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load .env reliably whether started from root or server directory
dotenv_1.default.config();
dotenv_1.default.config({ path: path_1.default.resolve(process.cwd(), ".env") });
dotenv_1.default.config({ path: path_1.default.resolve(process.cwd(), "server/.env") });
exports.config = {
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
    mongodbUri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/talentele",
    storageDir: process.env.DATA_STORAGE_DIR || "./data_storage",
};
