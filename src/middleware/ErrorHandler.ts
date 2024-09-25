import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export const errorHandler: ErrorRequestHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode || 500;
  res?.status(statusCode).send({
    data: null,
    success: false,
    error: true,
    message: error.message || "Internal Server Error",
    status: statusCode,
    stack: process.env.NODE_ENV === "production" ? "" : error.stack,
  });
};

