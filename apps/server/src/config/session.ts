import session from "express-session";

const isProduction = process.env.NODE_ENV === "production";
const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret || sessionSecret.length < 32) {
  throw new Error("SESSION_SECRET must be at least 32 characters long");
}

export const sessionMiddleware = session({
  name: "auth.sid",
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false, // Only save sessions when modified (e.g., on login)
  cookie: {
    httpOnly: true, // Prevents client-side JS from reading the cookie
    secure: isProduction, // Set to true in production (requires HTTPS)
    sameSite: "lax", // Protects against basic CSRF
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
});
