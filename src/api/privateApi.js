import axios from "axios";
import { useUserStore } from "@/stores/userStore";

// const VITE_API_BASE_URL = "https://vvro2vmufk.execute-api.us-west-2.amazonaws.com/production/";
const VITE_API_BASE_URL = "http://localhost:4000/";

const privateApi = axios.create({
  baseURL: VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

privateApi.interceptors.request.use((config) => {
  
  // const token = localStorage.getItem("token");
  // console.log("API RESPONSE TOKEN ===========>>> ", token);

  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }
  
  const userStore = useUserStore()
  const token = userStore.token;
  
  if (token && token !== "null") {
     config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default privateApi;