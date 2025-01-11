import { NextFunction, Request, Response } from "express";
import db from "../database";
import HttpException from "../lib/HttpException";
import { SessionService } from "./session.service";
import { Session } from "../entity";
import { sign } from "../lib/jwt";
import bcrypt from 'bcrypt';
import { get, omit } from "lodash";
import { validationResult } from 'express-validator';


export class AuthService {

  static async createUserhandler(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let userByEmail = await db.users.findOne({ where: { email: req.body.email } });
    if (userByEmail !== null) {
      return next(new HttpException(404, "Email already used", { "field": "email" }))
    }
    let userByUsername = await db.users.findOne({ where: { username: req.body.username } });
    if (userByUsername !== null) {
      return next(new HttpException(404, "Username already used", { field: "username" }))
    }
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);
    const userData = { ...req.body };
    userData.username = userData.username.toLowerCase();
    userData.userAvatar = `https://robohash.org/${userData.firstname + userData.lastname + userData.username}.png`;
    userData.password = hashed;
    try {
      const user = await db.users.save(userData);
      console.log("user=>", user)
      return res.json(omit(user, 'password'));
    } catch (error) {
      return res.status(409).json(error);
    }
  }

  static async createUserSessionhandler(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    const user = await db.users.findOneBy({ email })
    if (!user) {
      return next(new HttpException(404, "Invalid Email or Password"));
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return next(new HttpException(404, "Invalid Email or Password"));
    }

    const session = (await SessionService.createSession(
      user.id,
      req.get('user-agent') || ''
    )) as (Session | null)
    console.log(session)
    if (!session)
      return next(new HttpException(404, "you are connected in other browser or something went wrong"));
    //create access token
    const accessToken = SessionService.createAccessToken({
      user: omit(user, 'password'),
      session,
    });
    //create refresh token
    const refreshToken = sign(omit(session, "user"), { expiresIn: '1y' }); // should be changed to 5m, only for tests

    res.cookie("accessToken", accessToken, {
      maxAge: 300000, // 5 minutes
      httpOnly: true,
      secure: false, // Set to true if using HTTPS (not needed for HTTP in development)
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 3.154e10, // 1 year
      httpOnly: true,
      secure: false, // Set to true if using HTTPS (not needed for HTTP in development)
    });

    //send refresh access token
    res.json({ accessToken, refreshToken });
  }

  static async invalidateUserSessionHandler(
    req: Request,
    res: Response
  ) {
    const session_id: string | undefined = get(req, 'user.session.session_id');

    const session = await Session.findOneBy({ session_id });
    if (!session)
      return res.json("session not found");
    session.valid = false;

    await session.remove();
    return res.sendStatus(200);
  }

  static async getUserSessionsHandler(req: Request, res: Response) {
    console.log("HELLO")
    const user_id = get(req, 'user.id');
    console.log(user_id)
    const session = await Session.findOne({ where: { user: { id: user_id }, valid: true } })
    return res.json(session);
  }

  static async getUserHandler(req: Request, res: Response) {
    const user = get(req, 'user');
    return res.json(user);
  }
} 
