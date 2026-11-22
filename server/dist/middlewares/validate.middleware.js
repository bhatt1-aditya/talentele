"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = validateRequest;
const zod_1 = require("zod");
const apiResponse_js_1 = require("../utils/apiResponse.js");
function validateRequest(schema) {
    return async (req, res, next) => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            return next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const issues = error.errors.map((e) => ({
                    field: e.path.join("."),
                    message: e.message,
                }));
                return (0, apiResponse_js_1.sendError)(res, "Validation failed for request parameters", 422, issues);
            }
            return (0, apiResponse_js_1.sendError)(res, "Bad request", 400);
        }
    };
}
