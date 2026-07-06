import type { JwtPayload } from "jsonwebtoken";
import type { IUser } from "../modules/issue/issue.interface";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | IUser
    }
  }
}