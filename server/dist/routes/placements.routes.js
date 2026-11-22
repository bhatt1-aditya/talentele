"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const placements_controller_js_1 = require("../controllers/placements.controller.js");
const router = (0, express_1.Router)();
router.get("/", placements_controller_js_1.PlacementsController.getPlacements);
router.post("/", placements_controller_js_1.PlacementsController.createPlacement);
exports.default = router;
