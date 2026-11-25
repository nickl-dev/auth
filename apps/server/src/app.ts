import { isProduction } from "./config/session";
import { sessionMiddleware } from "./config/session";
import authRoutes from "./routes/auth.routes";
import cors from "cors";
import express from "express";
import routes from "./routes/index";

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
app.set("trust proxy", 1);
app.use(sessionMiddleware);
app.use("/", routes);
app.use("/api/auth", authRoutes);

export default app;
