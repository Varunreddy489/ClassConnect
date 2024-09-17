import { Request, Response } from "express";

import prisma from "../db/db.config";
import { handleForgotPassword } from "../services/mail.service";

export const forgotPasswordTeacher = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    await handleForgotPassword(prisma.teacher, email, res);
  } catch (error) {
    console.log("error in forgotPasswordTeacher:", error);
    res.status(404).json({ error: "internal server error" });
  }
};
