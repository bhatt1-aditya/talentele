"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const apiResponse_js_1 = require("../utils/apiResponse.js");
function errorHandler(err, req, res, next) {
    console.error("Unhandled Error Caught:", err);
    const statusCode = err.statusCode || (err.status && typeof err.status === "number" ? err.status : 500);
    const message = err.message || "Internal server error occurred";
    return (0, apiResponse_js_1.sendError)(res, message, statusCode, process.env.NODE_ENV === "development" ? err.stack : undefined);
}
