import express from "express";
import cors from "cors";
import routes from "./routes/index";
import authRoutes from "./routes/auth.routes";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/", routes);
app.use("/api/auth", authRoutes);

export default app;
