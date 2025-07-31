import axios from "axios";

const api = axios.create({
  baseURL: "https://vvro2vmufk.execute-api.us-west-2.amazonaws.com/production/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true // optional, if using cookies
});

api.interceptors.request.use((config) => {
  
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

export default api;