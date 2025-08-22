import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function AuthCallback(){
  const [params] = useSearchParams()
  const nav = useNavigate()
  const { login } = useAuth()
  useEffect(()=>{
    const token = params.get("token")
    if(token){
      login(token)
      nav("/dashboard", { replace: true })
    } else {
      nav("/login", { replace: true })
    }
  }, [])
  return <main className="container-page py-8"><p>Signing you in...</p></main>
}
