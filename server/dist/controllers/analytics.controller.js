"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsController = void 0;
const cohort_model_js_1 = require("../models/cohort.model.js");
const lead_model_js_1 = require("../models/lead.model.js");
const placement_model_js_1 = require("../models/placement.model.js");
const apiResponse_js_1 = require("../utils/apiResponse.js");
class AnalyticsController {
    static async getDashboardStats(req, res) {
        const leadStats = lead_model_js_1.LeadModel.getStats();
        const cohorts = cohort_model_js_1.CohortModel.getAll();
        const placements = placement_model_js_1.PlacementModel.getAll();
        const summary = {
            kpis: {
                totalLeads: leadStats.totalLeads,
                newLeads: leadStats.newLeads,
                followUpLeads: leadStats.followUpLeads,
                enrolledLeads: leadStats.enrolledLeads,
                conversionRate: leadStats.conversionRate,
                activeCohorts: cohorts.length,
                verifiedPlacements: placements.length,
            },
            leadsByStatus: leadStats.byStatus,
            leadsByCourse: leadStats.byCourse,
            recentLeads: leadStats.recentLeads,
            activeCohorts: cohorts,
        };
        return (0, apiResponse_js_1.sendSuccess)(res, summary, "Dashboard overview analytics metrics retrieved successfully");
    }
}
exports.AnalyticsController = AnalyticsController;
