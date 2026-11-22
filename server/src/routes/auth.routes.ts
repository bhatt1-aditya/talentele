import { Router } from "express";
import { AuthController, loginSchema } from "../controllers/auth.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { validateRequest } from "../middlewares/validate.middleware.js";

const router = Router();

// Public: Admin Login
router.post("/login", validateRequest(loginSchema), AuthController.login);

// Protected: Get current administrator profile
router.get("/me", requireAuth, AuthController.me);

export default router;
