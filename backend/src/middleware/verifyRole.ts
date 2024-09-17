import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
  user?: { userId: string; role: string };
}

export const verifyRole = (roles: string[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies["token"];
      if (!token) {
        return res.status(401).json({ message: "Token is missing" });
      }

      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

      req.user = { userId: decoded.userId, role: decoded.role };

      if (!roles.includes(decoded.role)) {
        return res
          .status(403)
          .json({ message: "Access denied: Unauthorized role" });
      }

      next();
    } catch (error) {
      console.error("Error in role verification:", error);
      return res.status(401).json({ message: "Invalid or missing token" });
    }
  };
};
