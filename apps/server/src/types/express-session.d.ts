import "express-session";

interface SessionUser {
  email: string;
  id: string;
}

declare module "express-session" {
  interface SessionData {
    user?: SessionUser;
  }
}
