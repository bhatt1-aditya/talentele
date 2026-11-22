import dns from "dns";
import mongoose from "mongoose";
import { config } from "./env.js";

// Ensure Node.js uses Google / Cloudflare public DNS for Atlas SRV resolution on Windows
try {
  dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
  if (typeof (dns as any).setDefaultResultOrder === "function") {
    (dns as any).setDefaultResultOrder("ipv4first");
  }
} catch (err: any) {
  console.warn("Notice: Custom DNS servers could not be set:", err.message);
}

interface DbState {
  isConnected: boolean;
  dbName: string;
  host: string;
}

export const dbState: DbState = {
  isConnected: false,
  dbName: "",
  host: "",
};

/**
 * Connect to MongoDB with automated retry and event listeners
 */
export async function connectDB(): Promise<boolean> {
  const uri = config.mongodbUri;

  if (!uri) {
    console.warn("⚠️ MONGODB_URI is not set. MongoDB features will run in offline mode.");
    return false;
  }

  try {
    mongoose.set("strictQuery", true);

    // Event listeners
    mongoose.connection.on("connected", () => {
      dbState.isConnected = true;
      dbState.host = mongoose.connection.host;
      dbState.dbName = mongoose.connection.name;
      console.log(`🍃 MongoDB Connected Successfully! Host: ${dbState.host} | Database: ${dbState.dbName}`);
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB Connection Error:", err.message);
      dbState.isConnected = false;
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB Disconnected. Awaiting reconnection...");
      dbState.isConnected = false;
    });

    // Attempt initial connection
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000, // 10 seconds timeout
      family: 4, // Force IPv4 to prevent ECONNREFUSED on Windows SRV DNS resolution
    });

    dbState.isConnected = true;
    dbState.host = mongoose.connection.host;
    dbState.dbName = mongoose.connection.name;
    return true;
  } catch (error: any) {
    dbState.isConnected = false;
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
export async function disconnectDB(): Promise<void> {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    console.log("🍃 MongoDB connection closed.");
  }
}

/**
 * Check whether MongoDB connection is currently active
 */
export function isDbConnected(): boolean {
  return mongoose.connection.readyState === 1;
}
