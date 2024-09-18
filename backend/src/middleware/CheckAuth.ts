import { NextFunction, Request, Response } from "express";

export const checkIsAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.cookie;
    console.log(token);
  } catch (error) {
    console.error("error in checkIsAuth:", error);
    return res.status(500).json(error);
  }
};
