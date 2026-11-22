"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_js_1 = require("../config/env.js");
class UserModel {
    static defaultAdmin = {
        id: "admin-master-01",
        email: env_js_1.config.admin.email,
        name: "Talentele Administrator",
        role: "superadmin",
        createdAt: "2026-01-01T00:00:00Z",
    };
    static async verifyCredentials(identifier, password) {
        const cleanInput = identifier.trim().toLowerCase().replace(/[\s\-\+]/g, "");
        const cleanAdminPhone = env_js_1.config.admin.phone.replace(/[\s\-\+]/g, "");
        const cleanAdminEmail = env_js_1.config.admin.email.trim().toLowerCase();
        // Check if input matches email or phone
        const isEmailMatch = identifier.trim().toLowerCase() === cleanAdminEmail;
        const isPhoneMatch = cleanInput === cleanAdminPhone ||
            cleanInput.endsWith(cleanAdminPhone) ||
            cleanAdminPhone.endsWith(cleanInput);
        if (!isEmailMatch && !isPhoneMatch) {
            return null;
        }
        // Direct password match or bcrypt comparison
        const isMatch = password === env_js_1.config.admin.password ||
            (await bcryptjs_1.default.compare(password, env_js_1.config.admin.password).catch(() => false));
        if (!isMatch) {
            return null;
        }
        return this.defaultAdmin;
    }
    static generateToken(user) {
        return jsonwebtoken_1.default.sign({
            id: user.id,
            email: user.email,
            role: user.role,
        }, env_js_1.config.jwt.secret, { expiresIn: env_js_1.config.jwt.expiresIn });
    }
    static verifyToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, env_js_1.config.jwt.secret);
        }
        catch {
            return null;
        }
    }
    static getProfile() {
        return this.defaultAdmin;
    }
}
exports.UserModel = UserModel;
