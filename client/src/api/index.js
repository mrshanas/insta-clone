import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:5000/api/v1" });

// Attach each request with a Bearer token
api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.authorization = `Bearer ${JSON.parse(token).token}`;
  }
  return req;
});

// Auth api's
export const loginUser = (loginData) => api.post("/auth/login", loginData);
export const registerUser = (registerData) =>
  api.post("/auth/register", registerData);

// Goals api's
export const getAllGoals = () => api.get("/goals");
export const createGoal = (goalData) => api.post("/create_goal", goalData);
