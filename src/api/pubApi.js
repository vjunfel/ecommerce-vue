import axios from "axios";

const VITE_API_BASE_URL = import.meta.process.env.VITE_JOB_TRACKER_API;
// const VITE_API_BASE_URL = "https://vvro2vmufk.execute-api.us-west-2.amazonaws.com/production/";

const publicApi = axios.create({
  baseURL: VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default publicApi;