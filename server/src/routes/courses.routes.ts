import { Router } from "express";
import { CoursesController } from "../controllers/courses.controller.js";

const router = Router();

router.get("/", CoursesController.getCourses);
router.get("/:slug", CoursesController.getCourseBySlug);
router.post("/", CoursesController.createCourse);
router.patch("/:slug", CoursesController.updateCourse);
router.put("/:slug", CoursesController.updateCourse);
router.delete("/:slug", CoursesController.deleteCourse);

export default router;
