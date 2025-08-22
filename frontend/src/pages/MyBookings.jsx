import { useEffect, useState } from "react"
import api from "../services/api"

export default function MyBookings(){
  const [bookings, setBookings] = useState([])
  async function load(){
    const res = await api.get("/api/bookings/my")
    setBookings(res.data)
  }
  useEffect(()=>{ load() }, [])

  async function cancel(id){
    await api.delete(`/api/bookings/${id}`)
    load()
  }

  return (
    <main className="container-page py-8">
      <h2 className="mb-4">My Bookings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bookings.map(b=> (
          <div key={b._id} className="card p-4 flex gap-3 items-start">
            <img src={b.hotel.imageUrl} className="w-32 h-24 object-cover rounded-lg" />
            <div className="flex-1">
              <div className="font-semibold">{b.hotel.name}</div>
              <div className="text-sm text-gray-600">{new Date(b.checkIn).toDateString()} → {new Date(b.checkOut).toDateString()}</div>
              <div className="text-sm text-gray-600">Guests: {b.guests}</div>
              <div className="text-primary font-semibold mt-1">${b.totalPrice.toFixed(2)}</div>
              <button onClick={()=>cancel(b._id)} className="btn-outline mt-2">Cancel</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
