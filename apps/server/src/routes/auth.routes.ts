import { Router } from "express";

const router = Router();

router.get("/login", (req, res) => {
  res.status(200).json({ status: "login" });
});

router.get("/register", (req, res) => {
  res.status(200).json({ status: "register" });
});

router.get("/logout", (req, res) => {
  res.status(200).json({ status: "logout" });
});

export default router;
