import { Router } from "express";
import { checkDatabaseConnection } from "../repositories/health.repository";

const router = Router();

router.get("/health", async (req, res) => {
  try {
    await checkDatabaseConnection();
    res.status(200).json({ status: "ok", database: "connected" });
  } catch (error) {
    res.status(500).json({
      status: "error",
      database: "unavailable"
    });
  }
});

export default router;
