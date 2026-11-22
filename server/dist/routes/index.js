"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_js_1 = require("../config/database.js");
const analytics_routes_js_1 = __importDefault(require("./analytics.routes.js"));
const auth_routes_js_1 = __importDefault(require("./auth.routes.js"));
const cohorts_routes_js_1 = __importDefault(require("./cohorts.routes.js"));
const courses_routes_js_1 = __importDefault(require("./courses.routes.js"));
const leads_routes_js_1 = __importDefault(require("./leads.routes.js"));
const placements_routes_js_1 = __importDefault(require("./placements.routes.js"));
const router = (0, express_1.Router)();
router.use("/auth", auth_routes_js_1.default);
router.use("/leads", leads_routes_js_1.default);
router.use("/cohorts", cohorts_routes_js_1.default);
router.use("/courses", courses_routes_js_1.default);
router.use("/placements", placements_routes_js_1.default);
router.use("/analytics", analytics_routes_js_1.default);
// Health check endpoint
router.get("/health", (req, res) => {
    const connected = (0, database_js_1.isDbConnected)();
    res.status(200).json({
        status: "ok",
        service: "Talentele API Backend",
        database: {
            engine: "MongoDB",
            status: connected ? "connected" : "offline_fallback",
            host: connected ? database_js_1.dbState.host : undefined,
            database: connected ? database_js_1.dbState.dbName : undefined,
        },
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    });
});
exports.default = router;
