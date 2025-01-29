import { Request, Response, NextFunction } from 'express';

// personalized class for errors
export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

// error handling centralized middleware  
export const errorHandler = (
  err: AppError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message =
    err instanceof AppError && err.isOperational
      ? err.message
      : 'An unexpected error occurred';

  console.error('Error:', err);

  res.status(statusCode).json({
    status: 'error',
    message,
  });
};
