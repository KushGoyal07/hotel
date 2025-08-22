import express from "express";
import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create booking
router.post("/", protect, async (req, res) => {
  const { hotelId, checkIn, checkOut, guests = 1 } = req.body;
  const hotel = await Hotel.findById(hotelId);
  if (!hotel) return res.status(404).json({ message: "Hotel not found" });

  const inDate = new Date(checkIn);
  const outDate = new Date(checkOut);
  const nights = Math.max(1, Math.ceil((outDate - inDate) / (1000*60*60*24)));
  const totalPrice = nights * hotel.pricePerNight;

  const booking = await Booking.create({
    user: req.user._id,
    hotel: hotel._id,
    checkIn: inDate,
    checkOut: outDate,
    guests,
    totalPrice
  });
  res.status(201).json(booking);
});

// My bookings
router.get("/my", protect, async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).populate("hotel");
  res.json(bookings);
});

// Cancel booking
router.delete("/:id", protect, async (req, res) => {
  const booking = await Booking.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!booking) return res.status(404).json({ message: "Booking not found" });
  res.json({ message: "Cancelled" });
});

export default router;
