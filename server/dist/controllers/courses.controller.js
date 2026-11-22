"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesController = void 0;
const course_model_js_1 = require("../models/course.model.js");
const apiResponse_js_1 = require("../utils/apiResponse.js");
class CoursesController {
    static async getCourses(req, res) {
        const { category } = req.query;
        const courses = course_model_js_1.CourseModel.getAll(category);
        return (0, apiResponse_js_1.sendSuccess)(res, courses, "Courses retrieved successfully");
    }
    static async getCourseBySlug(req, res) {
        const slug = req.params.slug;
        const course = course_model_js_1.CourseModel.getBySlug(slug);
        if (!course) {
            return (0, apiResponse_js_1.sendError)(res, `Course with slug '${slug}' not found`, 404);
        }
        return (0, apiResponse_js_1.sendSuccess)(res, course, "Course details retrieved successfully");
    }
    static async createCourse(req, res) {
        try {
            const data = req.body;
            if (!data.slug || !data.title) {
                return (0, apiResponse_js_1.sendError)(res, "Course slug and title are required", 400);
            }
            const newCourse = course_model_js_1.CourseModel.create(data);
            return (0, apiResponse_js_1.sendSuccess)(res, newCourse, "Course created successfully", 201);
        }
        catch (err) {
            return (0, apiResponse_js_1.sendError)(res, err.message || "Failed to create course", 500);
        }
    }
    static async updateCourse(req, res) {
        try {
            const slug = req.params.slug;
            const updated = course_model_js_1.CourseModel.update(slug, req.body);
            if (!updated) {
                return (0, apiResponse_js_1.sendError)(res, `Course with slug '${slug}' not found`, 404);
            }
            return (0, apiResponse_js_1.sendSuccess)(res, updated, "Course updated successfully");
        }
        catch (err) {
            return (0, apiResponse_js_1.sendError)(res, err.message || "Failed to update course", 500);
        }
    }
    static async deleteCourse(req, res) {
        try {
            const slug = req.params.slug;
            const deleted = course_model_js_1.CourseModel.delete(slug);
            if (!deleted) {
                return (0, apiResponse_js_1.sendError)(res, `Course with slug '${slug}' not found`, 404);
            }
            return (0, apiResponse_js_1.sendSuccess)(res, { slug }, "Course deleted successfully");
        }
        catch (err) {
            return (0, apiResponse_js_1.sendError)(res, err.message || "Failed to delete course", 500);
        }
    }
}
exports.CoursesController = CoursesController;
