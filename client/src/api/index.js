import axios from "axios";
import { store } from "../store";

const api = axios.create({ baseURL: "http://localhost:5000/api/v1" });
api.defaults.headers.common["Authorization"] = store.getState().users.token;

export const loginUser = (loginData) => api.post("/auth/login", loginData);
export const getAllPosts = () => api.get("/goals");
