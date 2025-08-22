import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import passport from "passport";

import connectDB from "./config/db.js";
import configurePassport from "./config/passport.js";
import authRoutes from "./routes/auth.js";
import hotelRoutes from "./routes/hotels.js";
import bookingRoutes from "./routes/bookings.js";

dotenv.config();
connectDB();
configurePassport();

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL?.split(",") || ["http://localhost:5173"], credentials: true }));
app.use(express.json());
app.use(passport.initialize());

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/bookings", bookingRoutes);

// Serve frontend build if available
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, "public");
app.use(express.static(publicDir));
app.get("*", (req, res) => {
  if (req.path.startsWith("/api")) return res.status(404).json({ message: "API route not found" });
  const indexFile = path.join(publicDir, "index.html");
  try { res.sendFile(indexFile); } catch { res.status(200).send("Backend running"); }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
