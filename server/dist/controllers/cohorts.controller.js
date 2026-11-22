"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CohortsController = exports.createCohortSchema = void 0;
const zod_1 = require("zod");
const cohort_model_js_1 = require("../models/cohort.model.js");
const apiResponse_js_1 = require("../utils/apiResponse.js");
exports.createCohortSchema = zod_1.z.object({
    body: zod_1.z.object({
        slug: zod_1.z.string().min(1, "Course slug is required"),
        courseTitle: zod_1.z.string().min(2, "Course title is required"),
        category: zod_1.z.string().min(1, "Category is required"),
        summary: zod_1.z.string().min(5, "Summary is required"),
        tools: zod_1.z.array(zod_1.z.string()).min(1, "At least one tool is required"),
        schedule: zod_1.z.string().min(2, "Schedule is required"),
        duration: zod_1.z.string().min(2, "Duration is required"),
        mode: zod_1.z.string().min(2, "Mode is required"),
        status: zod_1.z.enum(["Admissions Open", "Fast-Filling Cohort", "Upcoming Batch", "Seats Limited"]),
        statusTone: zod_1.z.enum(["emerald", "amber", "blue"]),
        highlights: zod_1.z.string().min(2, "Highlights are required"),
        enrolledCount: zod_1.z.number().int().nonnegative().optional(),
        maxSeats: zod_1.z.number().int().positive().optional(),
        startDate: zod_1.z.string().optional(),
    }),
});
class CohortsController {
    static async getCohorts(req, res) {
        const cohorts = cohort_model_js_1.CohortModel.getAll();
        return (0, apiResponse_js_1.sendSuccess)(res, cohorts, "Upcoming training batches retrieved successfully");
    }
    static async getCohortById(req, res) {
        const id = req.params.id;
        const cohort = cohort_model_js_1.CohortModel.getById(id);
        if (!cohort) {
            return (0, apiResponse_js_1.sendError)(res, `Batch cohort with ID ${id} not found`, 404);
        }
        return (0, apiResponse_js_1.sendSuccess)(res, cohort, "Batch details retrieved successfully");
    }
    static async createCohort(req, res) {
        try {
            const cohort = cohort_model_js_1.CohortModel.create(req.body);
            return (0, apiResponse_js_1.sendSuccess)(res, cohort, "New training batch scheduled successfully", 201);
        }
        catch (err) {
            return (0, apiResponse_js_1.sendError)(res, err.message || "Failed to create batch", 500);
        }
    }
    static async updateCohort(req, res) {
        const id = req.params.id;
        const updated = cohort_model_js_1.CohortModel.update(id, req.body);
        if (!updated) {
            return (0, apiResponse_js_1.sendError)(res, `Batch cohort with ID ${id} not found`, 404);
        }
        return (0, apiResponse_js_1.sendSuccess)(res, updated, "Training batch updated successfully");
    }
    static async deleteCohort(req, res) {
        const id = req.params.id;
        const success = cohort_model_js_1.CohortModel.delete(id);
        if (!success) {
            return (0, apiResponse_js_1.sendError)(res, `Batch cohort with ID ${id} not found`, 404);
        }
        return (0, apiResponse_js_1.sendSuccess)(res, { id }, "Training batch deleted successfully");
    }
}
exports.CohortsController = CohortsController;
