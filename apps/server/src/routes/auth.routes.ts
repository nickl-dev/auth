import { db } from "../db";
import { eq } from "drizzle-orm";
import { isValidEmail, isValidPassword } from "../utils/validation";
import { Router } from "express";
import { toPublicUser } from "../utils/user";
import { users } from "../db/schema";
import bcrypt from "bcrypt";

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(401).json({ error: "Email and password are required" });

  const [user] = await db
    .select({
      id: users.id,
      email: users.email,
      passwordHash: users.passwordHash,
      createdAt: users.createdAt
    })
    .from(users)
    .where(eq(users.email, email));
  const ok = user && (await bcrypt.compare(password, user.passwordHash));
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  req.session.userId = user.id;
  req.session.save((err) => {
    if (err) return res.status(500).json({ error: "Session error" });
    res.status(200).json({ user: toPublicUser(user) });
  });
});

router.get("/me", async (req, res) => {
  if (!req.session.userId)
    return res.status(401).json({ error: "Not authorized" });

  const [user] = await db
    .select({
      id: users.id,
      email: users.email,
      passwordHash: users.passwordHash,
      createdAt: users.createdAt
    })
    .from(users)
    .where(eq(users.id, req.session.userId));

  if (!user) return res.status(401).json({ error: "Not authorized" });
  res.status(200).json({ user: toPublicUser(user) });
});

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(401).json({ error: "Email and password are required" });

  if (!isValidEmail(email) || !isValidPassword(password))
    return res.status(401).json({ error: "Invalid email and/or password" });

  const [existing] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email));

  if (existing) return res.status(409).json({ error: "Email already in use" });

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const [user] = await db
      .insert(users)
      .values({ email, passwordHash })
      .returning({
        id: users.id,
        email: users.email,
        passwordHash: users.passwordHash,
        createdAt: users.createdAt
      });

    req.session.userId = user.id;
    req.session.save((err) => {
      if (err) return res.status(500).json({ error: "Session error" });
      res.status(200).json({ user: toPublicUser(user) });
    });
  } catch (error) {
    res.status(500).json({ error: "Server error occured during registration" });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) res.status(500).json({ error: "Error occured during logout" });
    res.clearCookie("auth.sid");
    res.status(200).json({ message: "Logged out" });
  });
});

export default router;
