import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/user.model.js";
import { sendError } from "../utils/apiResponse.js";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return sendError(
      res,
      "Authentication required. Missing or malformed Bearer token in Authorization header.",
      401
    );
  }

  const token = authHeader.split(" ")[1];
  const decoded = UserModel.verifyToken(token);

  if (!decoded) {
    return sendError(
      res,
      "Invalid or expired authentication token. Please re-authenticate.",
      401
    );
  }

  req.user = decoded;
  next();
}
