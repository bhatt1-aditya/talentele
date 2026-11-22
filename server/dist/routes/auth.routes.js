"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_js_1 = require("../controllers/auth.controller.js");
const auth_middleware_js_1 = require("../middlewares/auth.middleware.js");
const validate_middleware_js_1 = require("../middlewares/validate.middleware.js");
const router = (0, express_1.Router)();
// Public: Admin Login
router.post("/login", (0, validate_middleware_js_1.validateRequest)(auth_controller_js_1.loginSchema), auth_controller_js_1.AuthController.login);
// Protected: Get current administrator profile
router.get("/me", auth_middleware_js_1.requireAuth, auth_controller_js_1.AuthController.me);
exports.default = router;
