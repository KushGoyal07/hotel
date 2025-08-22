import { useState } from "react"
import api from "../services/api"

export default function Dashboard(){
  const [form, setForm] = useState({
    name:"", city:"", country:"", description:"",
    pricePerNight:"", imageUrl:"", amenities:"Wi-Fi,Pool,Spa"
  })
  const [message, setMessage] = useState("")
  const update = (k,v)=> setForm(prev=>({...prev, [k]:v}))

  async function submit(e){
    e.preventDefault()
    setMessage("")
    const payload = {
      ...form,
      pricePerNight: Number(form.pricePerNight),
      amenities: form.amenities.split(",").map(s=>s.trim()).filter(Boolean),
      imageUrl: form.imageUrl || `https://source.unsplash.com/1200x800/?hotel,${form.city||"city"}`
    }
    const res = await api.post("/api/hotels", payload)
    if(res.status===201) setMessage("Hotel added!")
  }

  return (
    <main className="container-page py-8 max-w-3xl">
      <div className="card p-6 space-y-3">
        <h2 className="mb-2">Add New Hotel</h2>
        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input className="input" placeholder="Hotel Name" value={form.name} onChange={e=>update("name", e.target.value)} required />
          <input className="input" placeholder="City" value={form.city} onChange={e=>update("city", e.target.value)} required />
          <input className="input" placeholder="Country" value={form.country} onChange={e=>update("country", e.target.value)} required />
          <input className="input" placeholder="Price per Night" type="number" value={form.pricePerNight} onChange={e=>update("pricePerNight", e.target.value)} required />
          <input className="input md:col-span-2" placeholder="Image URL (optional)" value={form.imageUrl} onChange={e=>update("imageUrl", e.target.value)} />
          <textarea className="input md:col-span-2 h-28" placeholder="Description" value={form.description} onChange={e=>update("description", e.target.value)} />
          <input className="input md:col-span-2" placeholder="Amenities (comma separated)" value={form.amenities} onChange={e=>update("amenities", e.target.value)} />
          <button className="btn-primary md:col-span-2" type="submit">Add Hotel</button>
        </form>
        {message && <div className="text-green-600">{message}</div>}
      </div>
    </main>

      );
}
