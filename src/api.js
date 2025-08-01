import axios from "axios";

console.log("BASE_URL ", import.meta.env.VITE_API_BASE_URL);

const api = axios.create({
  baseURL: "https://vvro2vmufk.execute-api.us-west-2.amazonaws.com/production/",
  // baseURL: "http://localhost:4000/",
  // baseURL: import.meta.env.VITE_API_BASE_URL,
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