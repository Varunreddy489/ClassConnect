import { Request, Response } from "express";

import prisma from "../db/db.config";
import { handleForgotPassword } from "../services/mail.service";

export const forgotPasswordAdmin = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    await handleForgotPassword(prisma.admin, email, res);
  } catch (error) {
    console.log("error in forgotPasswordAdmin:", error);
    res.status(404).json({ error: "internal server error" });
  }
};
