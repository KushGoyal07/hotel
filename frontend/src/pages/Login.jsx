import { useState } from "react"
import { Link } from "react-router-dom"
import api from "../services/api"
import { useAuth } from "../context/AuthContext"

const API = import.meta.env.VITE_API_URL || "http://localhost:5000"

export default function Login(){
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  async function submit(e){
    e.preventDefault()
    setError("")
    try {
      const res = await api.post("/api/auth/login", { email, password })
      login(res.data.token)
    } catch (e) {
      setError(e.response?.data?.message || "Login failed")
    }
  }

  function google(){
    window.location.href = `${API}/api/auth/google`
  }

  return (
    <main className="container-page py-12 max-w-lg">
      <div className="card p-6">
        <h2 className="mb-2">Welcome back</h2>
        <p className="text-gray-600 mb-4">Login to continue</p>
        <form onSubmit={submit} className="space-y-3">
          <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button className="btn-primary w-full" type="submit">Login</button>
        </form>
        <button onClick={google} className="btn-outline w-full mt-3">Login with Google</button>
        <div className="text-sm text-gray-600 mt-3">No account? <Link to="/register" className="text-primary">Register</Link></div>
      </div>
    </main>
  );
}