import bcrypt from "bcryptjs";
import { Response } from "express";
import { sendEmail } from "../config/mailer";

export const changePassword = async (
  model: any,
  token: string,
  newPassword: string,
  confirmPassword: string,
  res: Response
) => {
  try {
    const user = await model.findFirst({
      where: {
        resetPasswordToken: token,
        resetPasswordExpiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await model.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
        resetPasswordToken: undefined,
        resetPasswordExpiresAt: undefined,
      },
    });

    const payload = {
      toMail: user.email,
      subject: "Password Changed Successfully",
      body: "Your password has been changed successfully. Please try to use long secured password.",
    };

    await sendEmail(payload)

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error in changePassword:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
