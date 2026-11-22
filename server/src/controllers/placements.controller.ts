import { Request, Response } from "express";
import { PlacementModel } from "../models/placement.model.js";
import { sendError, sendSuccess } from "../utils/apiResponse.js";

export class PlacementsController {
  static async getPlacements(req: Request, res: Response) {
    const placements = PlacementModel.getAll();
    return sendSuccess(res, placements, "Verified alumni placement records retrieved successfully");
  }

  static async createPlacement(req: Request, res: Response) {
    try {
      const placement = PlacementModel.create(req.body);
      return sendSuccess(res, placement, "Placement record created successfully", 201);
    } catch (err: any) {
      return sendError(res, err.message || "Failed to create placement record", 500);
    }
  }
}
