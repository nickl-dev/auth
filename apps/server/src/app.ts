import express from "express";
import cors from "cors";
import routes from "./routes/index";
import authRoutes from "./routes/auth.routes";
import { sessionMiddleware } from "./config/session";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);
app.use(sessionMiddleware);
app.use("/", routes);
app.use("/api/auth", authRoutes);

export default app;
