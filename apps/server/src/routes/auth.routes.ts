import { Router } from "express";
import { User, users } from "../db/users";
import bcrypt from "bcrypt";
import { randomUUID } from "node:crypto";
import { isValidEmail, isValidPassword } from "../utils/validation";

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(401).json({ error: "Email and password are required" });

  const user = users.find((u) => u.email === email);

  if (!user || !(await bcrypt.compare(password, user.password_hash)))
    return res.status(401).json({ error: "Invalid credentials" });

  req.session.regenerate((err) => {
    if (err) return res.status(500).json({ error: "Session error" });

    req.session.user = {
      id: user?.id,
      email: user?.email
    };

    console.log({
      route: "/login",
      user: req.session.user,
      sessionId: req.sessionID
    });
    res.json({ user: req.session.user });
  });
});

router.get("/me", (req, res) => {
  if (req.session.user) {
    res.json({ user: req.session.user });
    console.log({
      route: "/me",
      user: req.session.user,
      sessionId: req.sessionID
    });
  } else {
    res.status(401).json({ error: "Not authorized" });
    console.log({ route: "/me", error: "Not authorized" });
  }
});

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(401).json({ error: "Email and password are required" });

  if (!isValidEmail(email) || !isValidPassword(password))
    return res.status(401).json({ error: "Invalid email and/or password" });

  const userExists = users.some((u) => u.email === email);

  if (userExists)
    return res.status(409).json({ error: "Email already in use" });

  try {
    const password_hash = await bcrypt.hash(password, 10);
    const newUser: User = {
      id: randomUUID(),
      email,
      password_hash,
      created_at: new Date().toISOString()
    };

    users.push(newUser);

    req.session.regenerate((err) => {
      if (err) return res.status(500).json({ error: "Session error" });

      req.session.user = {
        id: newUser?.id,
        email: newUser?.email
      };

      console.log({
        route: "/register",
        users,
        email,
        password,
        sessionId: req.sessionID
      });
      res.status(201).json({ user: req.session.user });
    });
  } catch (error) {
    res.status(500).json({ error: "Server error occured during registration" });
  }
});

router.post("/logout", (req, res) => {
  console.log({ route: "/logout", sessionId: req.session });
  req.session.destroy((err) => {
    if (err) res.status(500).json({ error: "Error occured during logout" });
    res.clearCookie("auth.sid");
    res.status(200).json({ message: "Logged out" });
    console.log({ route: "/logout", sessionId: req.session });
  });
});

export default router;
