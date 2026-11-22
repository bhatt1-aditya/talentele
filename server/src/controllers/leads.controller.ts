import { Request, Response } from "express";
import { z } from "zod";
import { LeadModel } from "../models/lead.model.js";
import { sendError, sendSuccess } from "../utils/apiResponse.js";
import { exportLeadsToCsv } from "../utils/csvExporter.js";

export const createLeadSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Full name must be at least 2 characters"),
    phone: z.string().min(8, "Valid phone number is required"),
    email: z.string().email("Valid email address is required"),
    course: z.string().min(1, "Course slug is required"),
    courseLabel: z.string().optional(),
    source: z.string().optional(),
    message: z.string().optional(),
  }),
});

export const updateLeadSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    phone: z.string().min(8).optional(),
    email: z.string().email().optional(),
    course: z.string().optional(),
    courseLabel: z.string().optional(),
    source: z.string().optional(),
    status: z.enum(["new", "contacted", "follow-up", "enrolled", "closed"]).optional(),
    message: z.string().optional(),
    counsellorNotes: z.string().optional(),
  }),
  params: z.object({
    id: z.string().min(1, "Lead ID parameter is required"),
  }),
});

export class LeadsController {
  static async getLeads(req: Request, res: Response) {
    try {
      const { search, status, course, page, limit, sortBy, sortOrder } = req.query;

      const result = LeadModel.getAll({
        search: search as string,
        status: status as string,
        course: course as string,
        page: page ? parseInt(page as string, 10) : undefined,
        limit: limit ? parseInt(limit as string, 10) : undefined,
        sortBy: sortBy as any,
        sortOrder: sortOrder as any,
      });

      return sendSuccess(
        res,
        result.leads,
        "Candidate enquiries retrieved successfully",
        200,
        {
          total: result.total,
          page: result.page,
          limit: result.limit,
          totalPages: result.totalPages,
        }
      );
    } catch (err: any) {
      return sendError(res, err.message || "Failed to retrieve enquiries", 500);
    }
  }

  static async getLeadById(req: Request, res: Response) {
    const id = req.params.id as string;
    const lead = LeadModel.getById(id);

    if (!lead) {
      return sendError(res, `Enquiry with ID ${id} not found`, 404);
    }

    return sendSuccess(res, lead, "Lead details retrieved successfully");
  }

  static async createLead(req: Request, res: Response) {
    try {
      const newLead = LeadModel.create(req.body);
      return sendSuccess(res, newLead, "Enquiry received successfully. Our academic counsellor will reach out shortly.", 201);
    } catch (err: any) {
      return sendError(res, err.message || "Failed to submit enquiry", 500);
    }
  }

  static async updateLead(req: Request, res: Response) {
    const id = req.params.id as string;
    const updated = LeadModel.update(id, req.body);

    if (!updated) {
      return sendError(res, `Enquiry with ID ${id} not found`, 404);
    }

    return sendSuccess(res, updated, "Candidate enquiry updated successfully");
  }

  static async deleteLead(req: Request, res: Response) {
    const id = req.params.id as string;
    const success = LeadModel.delete(id);

    if (!success) {
      return sendError(res, `Enquiry with ID ${id} not found`, 404);
    }

    return sendSuccess(res, { id }, "Enquiry record deleted successfully");
  }

  static async exportCsv(req: Request, res: Response) {
    try {
      const { status, course } = req.query;
      const { leads } = LeadModel.getAll({
        status: status as string,
        course: course as string,
      });

      const csvData = exportLeadsToCsv(leads);
      const filename = `talentele_enquiries_${new Date().toISOString().slice(0, 10)}.csv`;

      res.setHeader("Content-Type", "text/csv; charset=utf-8");
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      return res.status(200).send(csvData);
    } catch (err: any) {
      return sendError(res, "Failed to generate CSV export", 500);
    }
  }
}
