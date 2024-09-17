import { Request, Response } from "express";

export const shareEmail = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log("error in shareEmail:", error);
    res.status(404).json({ error: "internal server error" });
  }
};
