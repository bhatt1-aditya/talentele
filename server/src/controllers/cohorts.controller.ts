import { Request, Response } from "express";
import { z } from "zod";
import { CohortModel } from "../models/cohort.model.js";
import { sendError, sendSuccess } from "../utils/apiResponse.js";

export const createCohortSchema = z.object({
  body: z.object({
    slug: z.string().min(1, "Course slug is required"),
    courseTitle: z.string().min(2, "Course title is required"),
    category: z.string().min(1, "Category is required"),
    summary: z.string().min(5, "Summary is required"),
    tools: z.array(z.string()).min(1, "At least one tool is required"),
    schedule: z.string().min(2, "Schedule is required"),
    duration: z.string().min(2, "Duration is required"),
    mode: z.string().min(2, "Mode is required"),
    status: z.enum(["Admissions Open", "Fast-Filling Cohort", "Upcoming Batch", "Seats Limited"]),
    statusTone: z.enum(["emerald", "amber", "blue"]),
    highlights: z.string().min(2, "Highlights are required"),
    enrolledCount: z.number().int().nonnegative().optional(),
    maxSeats: z.number().int().positive().optional(),
    startDate: z.string().optional(),
  }),
});

export class CohortsController {
  static async getCohorts(req: Request, res: Response) {
    const cohorts = CohortModel.getAll();
    return sendSuccess(res, cohorts, "Upcoming training batches retrieved successfully");
  }

  static async getCohortById(req: Request, res: Response) {
    const id = req.params.id as string;
    const cohort = CohortModel.getById(id);

    if (!cohort) {
      return sendError(res, `Batch cohort with ID ${id} not found`, 404);
    }

    return sendSuccess(res, cohort, "Batch details retrieved successfully");
  }

  static async createCohort(req: Request, res: Response) {
    try {
      const cohort = CohortModel.create(req.body);
      return sendSuccess(res, cohort, "New training batch scheduled successfully", 201);
    } catch (err: any) {
      return sendError(res, err.message || "Failed to create batch", 500);
    }
  }

  static async updateCohort(req: Request, res: Response) {
    const id = req.params.id as string;
    const updated = CohortModel.update(id, req.body);

    if (!updated) {
      return sendError(res, `Batch cohort with ID ${id} not found`, 404);
    }

    return sendSuccess(res, updated, "Training batch updated successfully");
  }

  static async deleteCohort(req: Request, res: Response) {
    const id = req.params.id as string;
    const success = CohortModel.delete(id);

    if (!success) {
      return sendError(res, `Batch cohort with ID ${id} not found`, 404);
    }

    return sendSuccess(res, { id }, "Training batch deleted successfully");
  }
}
