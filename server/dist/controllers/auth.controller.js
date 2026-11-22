"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = exports.loginSchema = void 0;
const zod_1 = require("zod");
const user_model_js_1 = require("../models/user.model.js");
const apiResponse_js_1 = require("../utils/apiResponse.js");
exports.loginSchema = zod_1.z.object({
    body: zod_1.z.object({
        identifier: zod_1.z.string().min(1, "Admin phone number or email is required").optional(),
        email: zod_1.z.string().optional(),
        phone: zod_1.z.string().optional(),
        password: zod_1.z.string().min(1, "Password is required"),
    }),
});
class AuthController {
    static async login(req, res) {
        const { identifier, email, phone, password } = req.body;
        const loginId = identifier || phone || email;
        if (!loginId) {
            return (0, apiResponse_js_1.sendError)(res, "Admin mobile number or email is required to sign in", 400);
        }
        const user = await user_model_js_1.UserModel.verifyCredentials(loginId, password);
        if (!user) {
            return (0, apiResponse_js_1.sendError)(res, "Invalid admin number or password. Please verify credentials.", 401);
        }
        const token = user_model_js_1.UserModel.generateToken(user);
        return (0, apiResponse_js_1.sendSuccess)(res, {
            token,
            user,
        }, "Authentication successful. Welcome to Talentele Admin API.");
    }
    static async me(req, res) {
        if (!req.user) {
            return (0, apiResponse_js_1.sendError)(res, "Unauthorized", 401);
        }
        const profile = user_model_js_1.UserModel.getProfile();
        return (0, apiResponse_js_1.sendSuccess)(res, profile, "Current authenticated administrator profile");
    }
}
exports.AuthController = AuthController;
