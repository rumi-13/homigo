import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // switches between .env and .env.production automatically
  withCredentials: true, // keeps cookies/session for login
});

export default api;
