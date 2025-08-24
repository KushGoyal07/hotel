import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFeaturedHotels } from "../services/api";

export default function FeaturedHotels() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    getFeaturedHotels()
      .then((res) => setHotels(res.data))
      .catch((err) => console.error("Failed to fetch featured hotels:", err));
  }, []);

  if (hotels.length === 0) {
    return null; // Don't render anything if there are no featured hotels
  }

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-4">Featured Stays</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {hotels.map((h) => (
          <div key={h._id} className="card overflow-hidden">
            <img src={h.imageUrl} className="h-44 w-full object-cover" />
            <div className="p-4 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{h.name}</h3>
                <span className="text-yellow-500">★ {h.rating.toFixed(1)}</span>
              </div>
              <p className="text-gray-600 text-sm">
                {h.city}, {h.country}
              </p>
              <div className="pt-1">
                <span className="text-xl font-semibold text-primary">
                  ${h.pricePerNight.toFixed(2)}
                </span>
                <span className="text-sm text-gray-500"> / night</span>
              </div>
              <Link to={`/hotels/${h._id}`} className="btn-outline mt-2">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
