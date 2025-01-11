import { Request, Response, NextFunction } from "express";

const checkRole = (requiredRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: No user information found" });
    }

    if (!requiredRoles.includes(user.role)) {
      return res.status(403).json({ message: "Forbidden: You do not have access to this resource" });
    }

    next();
  };
};

export default checkRole;
