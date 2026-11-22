import { Request, Response } from "express";
import { CohortModel } from "../models/cohort.model.js";
import { LeadModel } from "../models/lead.model.js";
import { PlacementModel } from "../models/placement.model.js";
import { sendSuccess } from "../utils/apiResponse.js";

export class AnalyticsController {
  static async getDashboardStats(req: Request, res: Response) {
    const leadStats = LeadModel.getStats();
    const cohorts = CohortModel.getAll();
    const placements = PlacementModel.getAll();

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

    return sendSuccess(res, summary, "Dashboard overview analytics metrics retrieved successfully");
  }
}
