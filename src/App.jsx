import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./views/auth/login.jsx";
import Dashboard from "./views/dashboard.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}