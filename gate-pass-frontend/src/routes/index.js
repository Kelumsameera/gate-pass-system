// src/routes/index.js
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import SecurityDashboard from "../pages/SecurityDashboard";
import HRAdminDashboard from "../pages/HRAdminDashboard";
import ExecutiveDashboard from "../pages/ExecutiveDashboard";
import ManagerDashboard from "../pages/ManagerDashboard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/security" element={<SecurityDashboard />} />
      <Route path="/admin" element={<HRAdminDashboard />} />
      <Route path="/executive" element={<ExecutiveDashboard />} />
      <Route path="/manager" element={<ManagerDashboard />} />
    </Routes>
  );
}
