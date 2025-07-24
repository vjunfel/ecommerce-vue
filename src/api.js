import axios from "axios";
import { useGlobalStore } from "@/stores/global";

const api = axios.create({
    baseURL: import.meta.env.VITE_PRODUCT_BOOKING_API,
});


api.interceptors.request.use((config) => {
    
    const global = useGlobalStore();

    if (global.user?.token) {
    config.headers.Authorization = `Bearer ${global.user.token}`;
  }
    return config;
});

export default api;