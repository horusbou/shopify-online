import { User } from "../../entity/User.entity";


declare global {
  namespace Express {
    interface Request {
      user?: User,
      file?: {
        fieldname: string;
        originalname: string;
        encoding: string;
        mimetype: string;
        size: number;
        destination: string;
        filename: string;
        path: string;
      }
    }
  }
}
