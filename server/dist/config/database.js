"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbState = void 0;
exports.connectDB = connectDB;
exports.disconnectDB = disconnectDB;
exports.isDbConnected = isDbConnected;
const dns_1 = __importDefault(require("dns"));
const mongoose_1 = __importDefault(require("mongoose"));
const env_js_1 = require("./env.js");
// Ensure Node.js uses Google / Cloudflare public DNS for Atlas SRV resolution on Windows
try {
    dns_1.default.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
    if (typeof dns_1.default.setDefaultResultOrder === "function") {
        dns_1.default.setDefaultResultOrder("ipv4first");
    }
}
catch (err) {
    console.warn("Notice: Custom DNS servers could not be set:", err.message);
}
exports.dbState = {
    isConnected: false,
    dbName: "",
    host: "",
};
/**
 * Connect to MongoDB with automated retry and event listeners
 */
async function connectDB() {
    const uri = env_js_1.config.mongodbUri;
    if (!uri) {
        console.warn("⚠️ MONGODB_URI is not set. MongoDB features will run in offline mode.");
        return false;
    }
    try {
        mongoose_1.default.set("strictQuery", true);
        // Event listeners
        mongoose_1.default.connection.on("connected", () => {
            exports.dbState.isConnected = true;
            exports.dbState.host = mongoose_1.default.connection.host;
            exports.dbState.dbName = mongoose_1.default.connection.name;
            console.log(`🍃 MongoDB Connected Successfully! Host: ${exports.dbState.host} | Database: ${exports.dbState.dbName}`);
        });
        mongoose_1.default.connection.on("error", (err) => {
            console.error("❌ MongoDB Connection Error:", err.message);
            exports.dbState.isConnected = false;
        });
        mongoose_1.default.connection.on("disconnected", () => {
            console.warn("⚠️ MongoDB Disconnected. Awaiting reconnection...");
            exports.dbState.isConnected = false;
        });
        // Attempt initial connection
        await mongoose_1.default.connect(uri, {
            serverSelectionTimeoutMS: 10000, // 10 seconds timeout
            family: 4, // Force IPv4 to prevent ECONNREFUSED on Windows SRV DNS resolution
        });
        exports.dbState.isConnected = true;
        exports.dbState.host = mongoose_1.default.connection.host;
        exports.dbState.dbName = mongoose_1.default.connection.name;
        return true;
    }
    catch (error) {
        exports.dbState.isConnected = false;
        console.warn(`----------------------------------------------------------------`);
        console.warn(`⚠️ Notice: MongoDB connection could not be established (${error.message}).`);
        console.warn(`👉 The server is operating with resilient local storage fallback.`);
        console.warn(`💡 To enable live MongoDB, start your local mongod service or`);
        console.warn(`   configure a MongoDB Atlas URI in server/.env:`);
        console.warn(`   MONGODB_URI="mongodb+srv://<user>:<pwd>@cluster.mongodb.net/talentele"`);
        console.warn(`----------------------------------------------------------------`);
        return false;
    }
}
/**
 * Disconnect cleanly during server shutdown
 */
async function disconnectDB() {
    if (mongoose_1.default.connection.readyState !== 0) {
        await mongoose_1.default.disconnect();
        console.log("🍃 MongoDB connection closed.");
    }
}
/**
 * Check whether MongoDB connection is currently active
 */
function isDbConnected() {
    return mongoose_1.default.connection.readyState === 1;
}
