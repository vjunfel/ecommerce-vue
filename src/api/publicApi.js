import axios from "axios";

console.log("BASE_URL_FROM_ENV", import.meta.env.VITE_API_BASE_URL);

// const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const VITE_API_BASE_URL = "https://vvro2vmufk.execute-api.us-west-2.amazonaws.com/production/";
// const VITE_API_BASE_URL = "http://localhost:4000/";

const publicApi = axios.create({
  baseURL: VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


export default publicApi;