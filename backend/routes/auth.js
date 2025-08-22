import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";
import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET || "dev_secret", { expiresIn: "7d" });

// Register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if(!name || !email || !password) return res.status(400).json({ message: "Missing fields" });
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "User already exists" });
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });
  res.json({ message: "Registered", user: { id: user._id, name: user.name, email: user.email } });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ message: "Invalid credentials" });
  const token = signToken(user._id);
  res.json({ token, user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin } });
});

// Current user
router.get("/me", protect, (req, res) => {
  res.json({ user: req.user });
});

// Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login" }),
  (req, res) => {
    const token = signToken(req.user._id);
    const redirectUrl = `${process.env.FRONTEND_URL || "http://localhost:5173"}/auth/callback?token=${token}`;
    res.redirect(redirectUrl);
  }
);

export default router;
