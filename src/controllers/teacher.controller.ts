import { Request, Response } from "express";

import prisma from "../db/db.config";
import { changePassword } from "../services/auth.service";
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

export const passwordChangeTeacher = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { newPassword, confirmPassword } = req.body;
    await changePassword(
      prisma.student,
      token,
      newPassword,
      confirmPassword,
      res
    );
  } catch (error) {
    console.log("error in forgotPasswordStudent:", error);
    res.status(404).json({ error: "internal server error" });
  }
};
