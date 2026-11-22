"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadsController = exports.updateLeadSchema = exports.createLeadSchema = void 0;
const zod_1 = require("zod");
const lead_model_js_1 = require("../models/lead.model.js");
const apiResponse_js_1 = require("../utils/apiResponse.js");
const csvExporter_js_1 = require("../utils/csvExporter.js");
exports.createLeadSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2, "Full name must be at least 2 characters"),
        phone: zod_1.z.string().min(8, "Valid phone number is required"),
        email: zod_1.z.string().email("Valid email address is required"),
        course: zod_1.z.string().min(1, "Course slug is required"),
        courseLabel: zod_1.z.string().optional(),
        source: zod_1.z.string().optional(),
        message: zod_1.z.string().optional(),
    }),
});
exports.updateLeadSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2).optional(),
        phone: zod_1.z.string().min(8).optional(),
        email: zod_1.z.string().email().optional(),
        course: zod_1.z.string().optional(),
        courseLabel: zod_1.z.string().optional(),
        source: zod_1.z.string().optional(),
        status: zod_1.z.enum(["new", "contacted", "follow-up", "enrolled", "closed"]).optional(),
        message: zod_1.z.string().optional(),
        counsellorNotes: zod_1.z.string().optional(),
    }),
    params: zod_1.z.object({
        id: zod_1.z.string().min(1, "Lead ID parameter is required"),
    }),
});
class LeadsController {
    static async getLeads(req, res) {
        try {
            const { search, status, course, page, limit, sortBy, sortOrder } = req.query;
            const result = lead_model_js_1.LeadModel.getAll({
                search: search,
                status: status,
                course: course,
                page: page ? parseInt(page, 10) : undefined,
                limit: limit ? parseInt(limit, 10) : undefined,
                sortBy: sortBy,
                sortOrder: sortOrder,
            });
            return (0, apiResponse_js_1.sendSuccess)(res, result.leads, "Candidate enquiries retrieved successfully", 200, {
                total: result.total,
                page: result.page,
                limit: result.limit,
                totalPages: result.totalPages,
            });
        }
        catch (err) {
            return (0, apiResponse_js_1.sendError)(res, err.message || "Failed to retrieve enquiries", 500);
        }
    }
    static async getLeadById(req, res) {
        const id = req.params.id;
        const lead = lead_model_js_1.LeadModel.getById(id);
        if (!lead) {
            return (0, apiResponse_js_1.sendError)(res, `Enquiry with ID ${id} not found`, 404);
        }
        return (0, apiResponse_js_1.sendSuccess)(res, lead, "Lead details retrieved successfully");
    }
    static async createLead(req, res) {
        try {
            const newLead = lead_model_js_1.LeadModel.create(req.body);
            return (0, apiResponse_js_1.sendSuccess)(res, newLead, "Enquiry received successfully. Our academic counsellor will reach out shortly.", 201);
        }
        catch (err) {
            return (0, apiResponse_js_1.sendError)(res, err.message || "Failed to submit enquiry", 500);
        }
    }
    static async updateLead(req, res) {
        const id = req.params.id;
        const updated = lead_model_js_1.LeadModel.update(id, req.body);
        if (!updated) {
            return (0, apiResponse_js_1.sendError)(res, `Enquiry with ID ${id} not found`, 404);
        }
        return (0, apiResponse_js_1.sendSuccess)(res, updated, "Candidate enquiry updated successfully");
    }
    static async deleteLead(req, res) {
        const id = req.params.id;
        const success = lead_model_js_1.LeadModel.delete(id);
        if (!success) {
            return (0, apiResponse_js_1.sendError)(res, `Enquiry with ID ${id} not found`, 404);
        }
        return (0, apiResponse_js_1.sendSuccess)(res, { id }, "Enquiry record deleted successfully");
    }
    static async exportCsv(req, res) {
        try {
            const { status, course } = req.query;
            const { leads } = lead_model_js_1.LeadModel.getAll({
                status: status,
                course: course,
            });
            const csvData = (0, csvExporter_js_1.exportLeadsToCsv)(leads);
            const filename = `talentele_enquiries_${new Date().toISOString().slice(0, 10)}.csv`;
            res.setHeader("Content-Type", "text/csv; charset=utf-8");
            res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
            return res.status(200).send(csvData);
        }
        catch (err) {
            return (0, apiResponse_js_1.sendError)(res, "Failed to generate CSV export", 500);
        }
    }
}
exports.LeadsController = LeadsController;
