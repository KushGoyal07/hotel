import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  description: { type: String, default: "" },
  pricePerNight: { type: Number, required: true },
  rating: { type: Number, default: 4.5 },
  imageUrl: { type: String, default: "https://source.unsplash.com/800x600/?hotel,resort" },
  amenities: [{ type: String }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export default mongoose.model("Hotel", hotelSchema);
