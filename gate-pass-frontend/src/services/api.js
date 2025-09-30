// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL || "https://your-backend.vercel.app/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api; // add default export

export const login = (data) => api.post("/auth/login", data);
export const requestPass = (data) => api.post("/gatepass/request", data);
export const approvePassExecutive = (passId, status) =>
  api.post(`/gatepass/approve/executive/${passId}`, { status });
export const approvePassManager = (passId, status) =>
  api.post(`/gatepass/approve/manager/${passId}`, { status });
export const getPass = (status) => api.get(`/gatepass?status=${status}`);
export const getPassById = (passId) => api.get(`/gatepass/${passId}`);
export const verifyPass = (passId, data) =>
  api.post(`/gatepass/verify/${passId}`, data);
export const getUsers = () => api.get("/admin/users");
export const createUser = (data) => api.post("/admin/users", data);
export const getReports = () => api.get("/admin/reports");
export const getAuditTrail = (passId) => api.get(`/gatepass/audit/${passId}`);
