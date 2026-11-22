import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";
import { sendError } from "../utils/apiResponse.js";

export function validateRequest(schema: AnyZodObject) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const issues = error.errors.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        }));
        return sendError(res, "Validation failed for request parameters", 422, issues);
      }
      return sendError(res, "Bad request", 400);
    }
  };
}
