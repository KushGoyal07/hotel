import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../services/api"

export default function Listings(){
  const [hotels, setHotels] = useState([])
  const [q, setQ] = useState("")
  const [city, setCity] = useState("")
  const [rating, setRating] = useState("")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")

  async function load(){
    const res = await api.get("/api/hotels", { params: { q, city, rating, minPrice, maxPrice } })
    setHotels(res.data)
  }
  useEffect(()=>{ load() }, [])

  return (
    <main className="container-page py-8">
      <div className="flex items-end gap-3 mb-4">
        <input className="input" placeholder="Search hotels or city" value={q} onChange={e=>setQ(e.target.value)} />
        <input className="input" placeholder="City" value={city} onChange={e=>setCity(e.target.value)} />
        <select className="input" value={rating} onChange={e=>setRating(e.target.value)}>
          <option value="">Rating</option>
          <option value="4.0">4.0+</option>
          <option value="4.5">4.5+</option>
        </select>
        <input className="input" placeholder="Min $" type="number" value={minPrice} onChange={e=>setMinPrice(e.target.value)} />
        <input className="input" placeholder="Max $" type="number" value={maxPrice} onChange={e=>setMaxPrice(e.target.value)} />
        <button onClick={load} className="btn-primary">Search</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {hotels.map(h=> (
          <div key={h._id} className="card overflow-hidden">
            <img src={h.imageUrl} className="h-44 w-full object-cover" />
            <div className="p-4 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{h.name}</h3>
                <span className="text-yellow-500">★ {h.rating.toFixed(1)}</span>
              </div>
              <p className="text-gray-600 text-sm">{h.city}, {h.country}</p>
              <div className="pt-1">
                <span className="text-xl font-semibold text-primary">${h.pricePerNight.toFixed(2)}</span>
                <span className="text-sm text-gray-500"> / night</span>
              </div>
              <Link to={`/hotels/${h._id}`} className="btn-outline mt-2">View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
