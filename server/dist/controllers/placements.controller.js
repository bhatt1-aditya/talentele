"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlacementsController = void 0;
const placement_model_js_1 = require("../models/placement.model.js");
const apiResponse_js_1 = require("../utils/apiResponse.js");
class PlacementsController {
    static async getPlacements(req, res) {
        const placements = placement_model_js_1.PlacementModel.getAll();
        return (0, apiResponse_js_1.sendSuccess)(res, placements, "Verified alumni placement records retrieved successfully");
    }
    static async createPlacement(req, res) {
        try {
            const placement = placement_model_js_1.PlacementModel.create(req.body);
            return (0, apiResponse_js_1.sendSuccess)(res, placement, "Placement record created successfully", 201);
        }
        catch (err) {
            return (0, apiResponse_js_1.sendError)(res, err.message || "Failed to create placement record", 500);
        }
    }
}
exports.PlacementsController = PlacementsController;
