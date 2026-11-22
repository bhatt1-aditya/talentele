"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = requireAuth;
const user_model_js_1 = require("../models/user.model.js");
const apiResponse_js_1 = require("../utils/apiResponse.js");
function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return (0, apiResponse_js_1.sendError)(res, "Authentication required. Missing or malformed Bearer token in Authorization header.", 401);
    }
    const token = authHeader.split(" ")[1];
    const decoded = user_model_js_1.UserModel.verifyToken(token);
    if (!decoded) {
        return (0, apiResponse_js_1.sendError)(res, "Invalid or expired authentication token. Please re-authenticate.", 401);
    }
    req.user = decoded;
    next();
}
