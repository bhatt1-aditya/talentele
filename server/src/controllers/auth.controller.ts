import { Request, Response } from "express";
import { z } from "zod";
import { AuthenticatedRequest } from "../middlewares/auth.middleware.js";
import { UserModel } from "../models/user.model.js";
import { sendError, sendSuccess } from "../utils/apiResponse.js";

export const loginSchema = z.object({
  body: z.object({
    identifier: z.string().min(1, "Admin phone number or email is required").optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    password: z.string().min(1, "Password is required"),
  }),
});

export class AuthController {
  static async login(req: Request, res: Response) {
    const { identifier, email, phone, password } = req.body;
    const loginId = identifier || phone || email;

    if (!loginId) {
      return sendError(res, "Admin mobile number or email is required to sign in", 400);
    }

    const user = await UserModel.verifyCredentials(loginId, password);
    if (!user) {
      return sendError(res, "Invalid admin number or password. Please verify credentials.", 401);
    }

    const token = UserModel.generateToken(user);

    return sendSuccess(
      res,
      {
        token,
        user,
      },
      "Authentication successful. Welcome to Talentele Admin API."
    );
  }

  static async me(req: AuthenticatedRequest, res: Response) {
    if (!req.user) {
      return sendError(res, "Unauthorized", 401);
    }

    const profile = UserModel.getProfile();
    return sendSuccess(res, profile, "Current authenticated administrator profile");
  }
}
