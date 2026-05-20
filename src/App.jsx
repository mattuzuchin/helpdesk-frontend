import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./views/auth/login.jsx";
import {StaffDashboard, AdminDashboard, UserDashboard} from "./views/auth/dashboard.jsx";
import {CreateTicket} from "./views/createTicket.jsx";
import {TicketView} from "./views/ticketView.jsx";
import Register from "./views/auth/register.jsx";
import ForgotPW from "./views/auth/forgotPW.jsx";
import ResetPassword from "./views/auth/resetPW.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgotPW" element={<ForgotPW />} />
      <Route path="/register" element={<Register />} />
      <Route path="/resetPW" element={
        <ProtectedRoute><ResetPassword /></ProtectedRoute>
      } />
      <Route path="/dashboard" element={
        <ProtectedRoute><UserDashboard /></ProtectedRoute>
      } />
      <Route path="/dashboard/admin" element={
        <ProtectedRoute><AdminDashboard /></ProtectedRoute>
      } />
      <Route path="/dashboard/staff" element={
        <ProtectedRoute><StaffDashboard /></ProtectedRoute>
      } />
      <Route path="/dashboard/createTicket" element={
        <ProtectedRoute><CreateTicket /></ProtectedRoute>
      } />
      <Route path="/dashboard/ticketView/:id" element={
        <ProtectedRoute><TicketView /></ProtectedRoute>
      } />
      
    </Routes>
  );
}