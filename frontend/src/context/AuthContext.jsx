import React, { createContext, useContext, useEffect, useState } from "react"
import api from "../services/api"

const AuthContext = createContext(null)
export function AuthProvider({ children }){
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [user, setUser] = useState(null)

  useEffect(()=>{
    if(!token) return setUser(null)
    api.get("/api/auth/me").then(res=> setUser(res.data.user)).catch(()=> setUser(null))
  }, [token])

  const login = (jwt)=>{ localStorage.setItem("token", jwt); setToken(jwt) }
  const logout = ()=>{ localStorage.removeItem("token"); setToken(null); setUser(null) }

  return <AuthContext.Provider value={{ token, user, login, logout }}>{children}</AuthContext.Provider>
}
export const useAuth = ()=> useContext(AuthContext)
