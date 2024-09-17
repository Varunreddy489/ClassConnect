import { Request, Response } from "express";

import prisma from "../db/db.config";
import { handleForgotPassword } from "../services/mail.service";

export const forgotPasswordStudent = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    await handleForgotPassword(prisma.student, email, res);
  } catch (error) {
    console.log("error in forgotPasswordStudent:", error);
    res.status(404).json({ error: "internal server error" });
  }
};
