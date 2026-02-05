import { IUser } from "../auth/models/auth.models.ts";

declare global {
  namespace Express {
    interface User extends IUser {}
  }
}
