import axios from "axios";

// Use .env variable if available, otherwise fallback
// Make sure your backend runs on port 5000 (or update accordingly)
const BASE_URL =
  import.meta.env.VITE_API_URL || 
  (import.meta.env.MODE === "development" ? "http://localhost:5002/api" : "/api");

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000, // optional: timeout for requests
});

export default api;
