"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSuccess = sendSuccess;
exports.sendError = sendError;
function sendSuccess(res, data, message, statusCode = 200, meta) {
    const response = {
        success: true,
        message,
        data,
        meta,
    };
    return res.status(statusCode).json(response);
}
function sendError(res, error, statusCode = 400, details) {
    const response = {
        success: false,
        error,
        data: details,
    };
    return res.status(statusCode).json(response);
}
