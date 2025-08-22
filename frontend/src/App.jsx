import { Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Listings from "./pages/Listings"
import HotelDetail from "./pages/HotelDetail"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import MyBookings from "./pages/MyBookings"
import AuthCallback from "./pages/AuthCallback"
import { AuthProvider, useAuth } from "./context/AuthContext"

function Protected({ children }){
  const { token } = useAuth()
  if(!token) return <Navigate to="/login" replace />
  return children
}

export default function App(){
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/hotels/:id" element={<HotelDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
        <Route path="/bookings" element={<Protected><MyBookings /></Protected>} />
        <Route path="/auth/callback" element={<AuthCallback />} />
      </Routes>
    </AuthProvider>
  )
}
