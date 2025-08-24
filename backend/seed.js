import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Hotel from "./models/Hotel.js";

dotenv.config();
await connectDB();

const hotels = [
  { name: "Grand Hyatt Resort", city: "Miami", country: "USA", pricePerNight: 350, rating: 4.8, featured: true, imageUrl: "https://source.unsplash.com/1200x800/?resort,miami", amenities: ["Free Wi-Fi","Pool","Spa","Gym"] },
  { name: "Sunset Boutique", city: "Paris", country: "France", pricePerNight: 220, rating: 4.6, featured: true, imageUrl: "https://source.unsplash.com/1200x800/?hotel,paris", amenities: ["Breakfast","Shuttle","Pet-Friendly"] },
  { name: "Urban Retreat Suites", city: "New York", country: "USA", pricePerNight: 280, rating: 4.5, imageUrl: "https://source.unsplash.com/1200x800/?hotel,newyork", amenities: ["Gym","City View","Wi-Fi"] },
  { name: "Mountain View Lodge", city: "Aspen", country: "USA", pricePerNight: 180, rating: 4.3, imageUrl: "https://source.unsplash.com/1200x800/?lodge,mountain", amenities: ["Breakfast","Ski-In/Out","Parking"] },
  { name: "Beachside Paradise", city: "Cancun", country: "Mexico", pricePerNight: 400, rating: 4.7, imageUrl: "https://source.unsplash.com/1200x800/?beach,resort", amenities: ["Beach","Pool Bar","Kids Club"] }
];

await Hotel.deleteMany({});
await Hotel.insertMany(hotels);
console.log("Seeded hotels:", hotels.length);
process.exit(0);
