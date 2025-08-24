import express from "express";
import Hotel from "../models/Hotel.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// List + basic filters
router.get("/", async (req, res) => {
  const { q, minPrice, maxPrice, city, rating } = req.query;
  const filter = {};
  if (q) {
    filter.$or = [
      { name: new RegExp(q, "i") },
      { city: new RegExp(q, "i") },
      { country: new RegExp(q, "i") }
    ];
  }
  if (city) filter.city = new RegExp(city, "i");
  if (rating) filter.rating = { $gte: Number(rating) };
  if (minPrice || maxPrice) filter.pricePerNight = {};
  if (minPrice) filter.pricePerNight.$gte = Number(minPrice);
  if (maxPrice) filter.pricePerNight.$lte = Number(maxPrice);

  const hotels = await Hotel.find(filter).sort({ createdAt: -1 });
  res.json(hotels);
});

// Get featured hotels
router.get("/featured", async (req, res) => {
  const hotels = await Hotel.find({ featured: true }).sort({ createdAt: -1 }).limit(5);
  res.json(hotels);
});

// Get by id
router.get("/:id", async (req, res) => {
  const hotel = await Hotel.findById(req.params.id);
  if (!hotel) return res.status(404).json({ message: "Hotel not found" });
  res.json(hotel);
});

// Create (protected)
router.post("/", protect, async (req, res) => {
  const { name, city, country, description, pricePerNight, imageUrl, amenities = [] } = req.body;
  const hotel = await Hotel.create({
    name, city, country, description, pricePerNight,
    imageUrl: imageUrl || "https://source.unsplash.com/1200x800/?hotel,resort",
    amenities, createdBy: req.user._id
  });
  res.status(201).json(hotel);
});

// Update
router.put("/:id", protect, async (req, res) => {
  const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!hotel) return res.status(404).json({ message: "Hotel not found" });
  res.json(hotel);
});

// Delete
router.delete("/:id", protect, async (req, res) => {
  const hotel = await Hotel.findByIdAndDelete(req.params.id);
  if (!hotel) return res.status(404).json({ message: "Hotel not found" });
  res.json({ message: "Deleted" });
});

export default router;
