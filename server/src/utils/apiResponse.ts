import { Response } from "express";
import { ApiResponse } from "../types/index.js";

export function sendSuccess<T>(
  res: Response,
  data: T,
  message?: string,
  statusCode = 200,
  meta?: ApiResponse["meta"]
) {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
    meta,
  };
  return res.status(statusCode).json(response);
}

export function sendError(
  res: Response,
  error: string,
  statusCode = 400,
  details?: any
) {
  const response: ApiResponse = {
    success: false,
    error,
    data: details,
  };
  return res.status(statusCode).json(response);
}
