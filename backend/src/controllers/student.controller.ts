import { Request, Response } from "express";

import prisma from "../db/db.config";
import { changePassword } from "../services/auth.service";
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

export const passwordChangeStudent = async (req: Request, res: Response) => {
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


export const updateProfile=async(req:Request,res:Response)=>{
  try {
    
  } catch (error) {
    console.log("error in addProfile:", error);
    res.status(404).json({ error: "internal server error" });
  }
}