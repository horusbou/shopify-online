import { get } from "lodash";
import db from "../database";
import { Session } from "../entity/Session.entity";
import { decode, sign } from "../lib/jwt";
import { User } from "../entity/User.entity";

export class SessionService {
  static async createSession(user_id: string, userAgent: string) {
    const user = await db.users.findOneBy({ id: user_id });
    if (!user)
      return null;
    try {
      const session = Session.create({
        valid: true,
        userAgent,
        user
      })
      await session.save();
      return session
    } catch (err) {
      return Session.findOne({ where: { user } })
    }
  }
  static createAccessToken({
    user,
    session,
  }: {
    user: Omit<User, 'password'>;
    session: Session
  }) {
    const accessToken = sign(
      { ...user, session: session.session_id },
      {
        expiresIn: '5m',

      }
    );
    return accessToken;
  }

  static async reIssueAccessToken({
    refreshToken,
  }: {
    refreshToken: string;
  }) {
    const { decoded } = decode(refreshToken);
    if (!decoded || !get(decoded, 'session_id')) return false;

    //get session
    const session = await Session.findOne({
      where: { session_id: get(decoded, 'session_id') }, relations: ['user']
    });
    if (!session)
      return false;
    if (!session.valid) return false;

    const user = await db.users.findOneBy({ id: session.user.id });
    if (!user) return false;

    const accessToken = SessionService.createAccessToken({ user, session });
    return accessToken;
  }
}
