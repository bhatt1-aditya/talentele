import { NextFunction, Request, Response } from "express";
import { sendError } from "../utils/apiResponse.js";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("Unhandled Error Caught:", err);

  const statusCode = err.statusCode || (err.status && typeof err.status === "number" ? err.status : 500);
  const message = err.message || "Internal server error occurred";

  return sendError(res, message, statusCode, process.env.NODE_ENV === "development" ? err.stack : undefined);
}
