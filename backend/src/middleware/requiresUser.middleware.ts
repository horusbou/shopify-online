import { Request, Response, NextFunction } from 'express';

const requiresUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // @ts-ignore
  if (!req.user) {
    return res.status(403).send("Invalid session");
  }
  return next();
};

export default requiresUser;
