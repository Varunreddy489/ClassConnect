import { Request, Response } from "express";

import prisma from "../db/db.config";
import {
  imageService,
  changePassword,
  handleForgotPassword,
  profileService
} from "../services";

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

export const updateProfilePic = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!req.files || !req.files.profile) {
      return res.status(400).json({ error: "No profile picture uploaded." });
    }

    const profile = req.files.profile;

    const result = await imageService(userId, prisma.student, profile);

    if (result.error) {
      return res.status(400).json({ errors: result.error });
    }

    return res.status(201).json({
      message: "Profile picture updated successfully",
      data: result.data,
    });
  } catch (error) {
    console.log("error in updateProfilePic:", error);
    res.status(404).json({ error: "internal server error" });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const body = req.body;

    const result = await profileService(userId, prisma.student, body);


    return res.status(201).json({
      message: "Profile updated successfully",
      data: result,
    })
  } catch (error) {
    console.log("error in updateProfile:", error);
    res.status(404).json({ error: "internal server error" });
  }
};


