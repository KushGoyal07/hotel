import { Link, NavLink } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Navbar(){
  const { user, logout } = useAuth()
  return (
    <header className="bg-white border-b">
      <div className="container-page h-16 flex items-center justify-between">
        <Link to="/" className="font-semibold text-primary text-xl">BookingHub</Link>
        <nav className="flex items-center gap-4 text-gray-700">
          <NavLink to="/listings" className={({isActive})=> isActive?"text-primary":""}>Hotels</NavLink>
          {user && <NavLink to="/dashboard" className={({isActive})=> isActive?"text-primary":""}>Dashboard</NavLink>}
          {user && <NavLink to="/bookings" className={({isActive})=> isActive?"text-primary":""}>My Bookings</NavLink>}
        </nav>
        <div className="flex gap-2">
          {!user ? (
            <>
              <Link to="/login" className="btn-outline">Login</Link>
              <Link to="/register" className="btn-primary">Register</Link>
            </>
          ) : (
            <>
              <span className="hidden sm:block text-gray-600">Hi, {user.name.split(" ")[0]}</span>
              <button className="btn-outline" onClick={logout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
