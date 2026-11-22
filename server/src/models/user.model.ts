import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config/env.js";
import { AdminUser } from "../types/index.js";

export class UserModel {
  private static defaultAdmin: AdminUser = {
    id: "admin-master-01",
    email: config.admin.email,
    name: "Talentele Administrator",
    role: "superadmin",
    createdAt: "2026-01-01T00:00:00Z",
  };

  static async verifyCredentials(identifier: string, password: string): Promise<AdminUser | null> {
    const cleanInput = identifier.trim().toLowerCase().replace(/[\s\-\+]/g, "");
    const cleanAdminPhone = config.admin.phone.replace(/[\s\-\+]/g, "");
    const cleanAdminEmail = config.admin.email.trim().toLowerCase();

    // Check if input matches email or phone
    const isEmailMatch = identifier.trim().toLowerCase() === cleanAdminEmail;
    const isPhoneMatch =
      cleanInput === cleanAdminPhone ||
      cleanInput.endsWith(cleanAdminPhone) ||
      cleanAdminPhone.endsWith(cleanInput);

    if (!isEmailMatch && !isPhoneMatch) {
      return null;
    }

    // Direct password match or bcrypt comparison
    const isMatch =
      password === config.admin.password ||
      (await bcrypt.compare(password, config.admin.password).catch(() => false));

    if (!isMatch) {
      return null;
    }

    return this.defaultAdmin;
  }

  static generateToken(user: AdminUser): string {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn as any }
    );
  }

  static verifyToken(token: string): { id: string; email: string; role: string } | null {
    try {
      return jwt.verify(token, config.jwt.secret) as any;
    } catch {
      return null;
    }
  }

  static getProfile(): AdminUser {
    return this.defaultAdmin;
  }
}
