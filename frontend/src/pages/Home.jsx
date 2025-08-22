import { Link } from "react-router-dom"
export default function Home(){
  return (
    <main className="container-page py-8 space-y-12">
      <section className="relative">
        <img src="https://source.unsplash.com/1600x500/?hotel,resort,beach" className="h-72 w-full object-cover rounded-2xl" />
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
      <section>
        <h3 className="mb-4">Popular Destinations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["Paris","New York","Tokyo","Dubai","Rome","London"].map(c=>(
            <div key={c} className="card overflow-hidden">
              <img src={`https://source.unsplash.com/800x500/?${c},city`} className="h-40 w-full object-cover" />
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
