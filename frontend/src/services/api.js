import axios from "axios"
const API = import.meta.env.VITE_API_URL || "http://localhost:5000"
const instance = axios.create({ baseURL: API })

instance.interceptors.request.use((config)=>{
  const token = localStorage.getItem("token")
  if(token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const getFeaturedHotels = () => instance.get("/api/hotels/featured");

export default instance
