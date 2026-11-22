import { Request, Response } from "express";
import { CourseModel } from "../models/course.model.js";
import { sendError, sendSuccess } from "../utils/apiResponse.js";

export class CoursesController {
  static async getCourses(req: Request, res: Response) {
    const { category } = req.query;
    const courses = CourseModel.getAll(category as string);
    return sendSuccess(res, courses, "Courses retrieved successfully");
  }

  static async getCourseBySlug(req: Request, res: Response) {
    const slug = req.params.slug as string;
    const course = CourseModel.getBySlug(slug);

    if (!course) {
      return sendError(res, `Course with slug '${slug}' not found`, 404);
    }

    return sendSuccess(res, course, "Course details retrieved successfully");
  }

  static async createCourse(req: Request, res: Response) {
    try {
      const data = req.body;
      if (!data.slug || !data.title) {
        return sendError(res, "Course slug and title are required", 400);
      }
      const newCourse = CourseModel.create(data);
      return sendSuccess(res, newCourse, "Course created successfully", 201);
    } catch (err: any) {
      return sendError(res, err.message || "Failed to create course", 500);
    }
  }

  static async updateCourse(req: Request, res: Response) {
    try {
      const slug = req.params.slug as string;
      const updated = CourseModel.update(slug, req.body);
      if (!updated) {
        return sendError(res, `Course with slug '${slug}' not found`, 404);
      }
      return sendSuccess(res, updated, "Course updated successfully");
    } catch (err: any) {
      return sendError(res, err.message || "Failed to update course", 500);
    }
  }

  static async deleteCourse(req: Request, res: Response) {
    try {
      const slug = req.params.slug as string;
      const deleted = CourseModel.delete(slug);
      if (!deleted) {
        return sendError(res, `Course with slug '${slug}' not found`, 404);
      }
      return sendSuccess(res, { slug }, "Course deleted successfully");
    } catch (err: any) {
      return sendError(res, err.message || "Failed to delete course", 500);
    }
  }
}
