import { NextFunction, Request, Response } from "express";
import { sign, decode } from "../lib/jwt";
import db from "../database";
import { User } from "../entity";
import { omit } from "lodash";

async function deserializeUser(req: Request, res: Response, next: NextFunction) {
  const { accessToken, refreshToken } = req.cookies;

  /*if (!accessToken) {
    return next();
  }*/

  const { decoded: payload, expired } = decode(accessToken);

  // For a valid access token
  if (payload) {
    // @ts-ignore
    req.user = payload;
    return next();
  }

  // expired but valid access token

  const { decoded: refresh } =
    expired && refreshToken ? decode(refreshToken) : { decoded: null };

  if (!refresh) {
    return next();
  }

  // @ts-ignore
  const session = await getSession(refresh.session_id);


  if (!session) {
    return next();
  }

  let user:Omit<User,"password"> = {...omit(await db.users.findOneBy({session:{session_id:session.session_id}}),"password")}

  const newAccessToken = sign({...user,session:session.session_id}, { expiresIn: "5m" });

  res.cookie("accessToken", newAccessToken, {
    maxAge: 300000, // 5 minutes
    httpOnly: true,
  });

  // @ts-ignore
  req.user = decode(newAccessToken).decoded;

  return next();
}

async function getSession(session_id: string) {
  const session = await db.sessions.findOneBy({ session_id })

  return session && session.valid ? session : null;
}

export default deserializeUser;
