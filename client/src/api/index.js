import axios from "axios";

const token = localStorage.getItem("token");

const api = axios.create({ baseURL: "http://localhost:5000/api/v1" });
api.defaults.headers.common["Authorization"] = token;

// Auth api's
export const loginUser = (loginData) => api.post("/auth/login", loginData);
export const registerUser = (registerData) =>
  api.post("/auth/register", registerData);

// Goals api's
export const getAllPosts = () => api.get("/goals");
