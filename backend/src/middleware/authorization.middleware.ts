import { NextFunction, Request, Response } from "express";
import { User } from "../entity";

export const authorizeRole = (allowedRoles: Array<"vendor" | "customer" | "admin">) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as User;

    if (!user || !allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
};
