import crypto from "crypto";
import { Response } from "express";

import { sendEmail } from "../config/mailer";

export const handleForgotPassword = async (
  model: any,
  email: string,
  res: Response
) => {
  try {
    const user = await model.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "Email doesn't exist" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiration = new Date(Date.now() + 1 * 60 * 60 * 1000);

    await model.update({
      where: { email },
      data: {
        resetPasswordToken: resetToken,
        resetPasswordExpiresAt: resetTokenExpiration,
      },
    });

    const payload = {
      toMail: email,
      subject: "Reset Password",
      body: `${process.env.CLIENT_URL}/reset-password/${resetToken}`,
    };

    await sendEmail(payload);

    return res.status(200).json({
      message: "Check your email for the reset link.",
      payload
    });
  } catch (error) {
    console.error("Error in forgot password:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


