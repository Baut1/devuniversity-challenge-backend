"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.AppError = void 0;
// personalized class for errors
class AppError extends Error {
    constructor(message, statusCode = 500, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
// error handling centralized middleware  
const errorHandler = (err, req, res, next) => {
    const statusCode = err instanceof AppError ? err.statusCode : 500;
    const message = err instanceof AppError && err.isOperational
        ? err.message
        : 'An unexpected error occurred';
    console.error('Error:', err);
    res.status(statusCode).json({
        status: 'error',
        message,
    });
};
exports.errorHandler = errorHandler;
