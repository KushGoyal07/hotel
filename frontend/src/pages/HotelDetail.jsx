import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import api from "../services/api"
import { useAuth } from "../context/AuthContext"

export default function HotelDetail(){
  const { id } = useParams()
  const [hotel, setHotel] = useState(null)
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState(2)
  const { token } = useAuth()
  const nav = useNavigate()

  useEffect(()=>{
    api.get(`/api/hotels/${id}`).then(res=> setHotel(res.data))
  }, [id])

  if(!hotel) return <main className="container-page py-8"><p>Loading...</p></main>

  const nights = checkIn && checkOut ? Math.max(1, Math.ceil((new Date(checkOut)-new Date(checkIn))/(1000*60*60*24))) : 1
  const total = nights * hotel.pricePerNight

  async function book(){
    if(!token) return nav("/login")
    const res = await api.post("/api/bookings", { hotelId: id, checkIn, checkOut, guests })
    if(res.status === 201) nav("/bookings")
  }

  return (
    <main className="container-page py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <img src={hotel.imageUrl} className="h-80 w-full object-cover rounded-2xl" />
        <div className="card p-6">
          <h2 className="mb-1">{hotel.name}</h2>
          <div className="text-gray-600">{hotel.city}, {hotel.country} • <span className="text-yellow-500">★ {hotel.rating}</span></div>
          <p className="mt-4">{hotel.description}</p>
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Amenities</h4>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-1 text-gray-600">
              {hotel.amenities?.map((a,i)=> <li key={i}>• {a}</li>)}
            </ul>
          </div>
        </div>
      </div>
      <aside className="card p-6 h-fit space-y-3">
        <div className="text-2xl font-semibold text-primary">${hotel.pricePerNight.toFixed(2)} <span className="text-sm text-gray-500">/ night</span></div>
        <input type="date" className="input" value={checkIn} onChange={e=>setCheckIn(e.target.value)} />
        <input type="date" className="input" value={checkOut} onChange={e=>setCheckOut(e.target.value)} />
        <input type="number" className="input" min="1" value={guests} onChange={e=>setGuests(Number(e.target.value))} />
        <div className="text-sm text-gray-600">Total: <span className="font-semibold text-black">${total.toFixed(2)}</span></div>
        <button onClick={book} className="btn-primary w-full">Book Now</button>
      </aside>
    </main>

    );
}
