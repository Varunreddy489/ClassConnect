import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
  user: { id: number; role: string };
}

export const verifyRole = (roles: string[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          message: "Access denied: Unauthorized role",
        });
      }

      next();
    } catch (error) {
      console.error("Error in role verification:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
};
