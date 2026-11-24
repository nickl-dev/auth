import express from "express";
import cors from "cors";
import routes from "./routes/index";
import authRoutes from "./routes/auth.routes";
import { sessionMiddleware } from "./config/session";

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);
app.use(express.json());
app.use(sessionMiddleware);
app.use("/", routes);
app.use("/api/auth", authRoutes);

export default app;
