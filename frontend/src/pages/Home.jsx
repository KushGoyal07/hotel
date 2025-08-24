import { Link } from "react-router-dom"
import FeaturedHotels from "../components/FeaturedHotels";
export default function Home(){
  return (
    <main className="container-page py-8 space-y-12">
      <section className="relative">
  <img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1120&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="h-72 w-full object-cover rounded-2xl" />
        <div className="card p-6 absolute left-1/2 -translate-x-1/2 -bottom-8 w-11/12 md:w-4/5">
          <h2 className="mb-3">Find your perfect stay</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <input className="input" placeholder="Destination e.g. Paris" />
            <input className="input" type="date" />
            <input className="input" type="date" />
            <Link to="/listings" className="btn-primary">Search Hotels</Link>
          </div>
        </div>
      </section>

      <FeaturedHotels />

      <section>
        <h3 className="mb-4">Popular Destinations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["Paris","New York","Tokyo","Dubai","Rome","London"].map(c=>(
            <div key={c} className="card overflow-hidden">
              <img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1120&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="h-40 w-full object-cover" />
              <div className="p-4">
                <h4 className="font-semibold">{c}</h4>
                <p className="text-sm text-gray-600">Curated stays in {c}.</p>
                <Link to="/listings" className="btn-outline mt-3">View Hotels</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
