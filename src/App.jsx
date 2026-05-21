import { Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Login from "./views/auth/login.jsx";
import {StaffDashboard, AdminDashboard, UserDashboard} from "./views/auth/dashboard.jsx";
import {CreateTicket} from "./views/createTicket.jsx";
import {TicketView} from "./views/ticketView.jsx";
import Register from "./views/auth/register.jsx";
import ForgotPW from "./views/auth/forgotPW.jsx";
import ResetPassword from "./views/auth/resetPW.jsx";
import { ProtectedRoute } from "./components/protectedRoute.jsx";
import { AllTickets } from "./views/allTickets.jsx";
import { ManageUsers } from "./views/manageUsers.jsx";
import {ReassignTickets} from "./views/reassignTickets.jsx";
function DashboardRouter() {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);

  if (decoded.role === "admin") return <AdminDashboard />;
  if (decoded.role === "staff") return <StaffDashboard />;
  return <UserDashboard />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgotPW" element={<ForgotPW />} />
      <Route path="/register" element={<Register />} />
      <Route path="/resetPassword" element={<ResetPassword />} />
      <Route path="/dashboard" element={
        <ProtectedRoute><DashboardRouter /></ProtectedRoute>
      } />
      <Route path="/dashboard/allTickets" element={
        <ProtectedRoute><AllTickets /></ProtectedRoute>
      } />
      <Route path="/dashboard/createTicket" element={
        <ProtectedRoute><CreateTicket /></ProtectedRoute>
      } />
      <Route path="/dashboard/ticketView/:id" element={
        <ProtectedRoute><TicketView /></ProtectedRoute>
      } />
      <Route path="/dashboard/manageUsers" element={
        <ProtectedRoute><ManageUsers /></ProtectedRoute>
      } />    
      <Route path="/dashboard/reassignTickets" element={
        <ProtectedRoute><ReassignTickets /></ProtectedRoute>
      } />  
    </Routes>
  );
}