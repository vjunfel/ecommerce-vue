import axios from "axios";

console.log("BASE_URL_FROM_ENV", import.meta.env.VITE_API_BASE_URL);

// const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const VITE_API_BASE_URL = "https://vvro2vmufk.execute-api.us-west-2.amazonaws.com/production/";
// const VITE_API_BASE_URL = "http://localhost:4000/";

const api = axios.create({
  baseURL: VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  
  const token = localStorage.getItem("token");
  console.log("API RESPONSE TOKEN ===========>>> ", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

export default api;