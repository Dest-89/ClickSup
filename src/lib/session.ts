import { IronSessionOptions } from "iron-session";

export interface SessionData {
  user?: {
    email: string;
    isAdmin: boolean;
  };
}

export const sessionOptions: IronSessionOptions = {
  password: process.env.SESSION_SECRET as string,
  cookieName: "clickbank_supplement_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
