"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const analytics_controller_js_1 = require("../controllers/analytics.controller.js");
const router = (0, express_1.Router)();
router.get("/stats", analytics_controller_js_1.AnalyticsController.getDashboardStats);
exports.default = router;
