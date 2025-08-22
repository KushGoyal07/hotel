import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setError("");
    try {
      await api.post("/api/auth/register", { name, email, password });
      nav("/login");
    } catch (e) {
      setError(e.response?.data?.message || "Register failed");
    }
  }

  return (
    <main className="container-page py-12 max-w-lg">
      <div className="card p-6">
        <h2 className="mb-2">Create an account</h2>
        <form onSubmit={submit} className="space-y-3">
          <input 
            className="input" 
            placeholder="Full Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
          <input 
            className="input" 
            placeholder="Email" 
            type="email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            className="input" 
            placeholder="Password" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button className="btn-primary w-full" type="submit">
            Register
          </button>
        </form>
        <div className="text-sm text-gray-600 mt-3">
          Already have an account?{" "}
          <Link to="/login" className="text-primary">
            Login
          </Link>
        </div>
      </div>
    </main>
  );
}