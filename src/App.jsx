import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./views/auth/login.jsx";
import {StaffDashboard, AdminDashboard, UserDashboard} from "./views/auth/dashboard.jsx";
import {CreateTicket} from "./views/createTicket.jsx";
import {TicketView} from "./views/ticketView.jsx";
import Register from "./views/auth/register.jsx";
import ForgotPW from "./views/auth/login.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgotPW" element={<ForgotPW />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/dashboard/admin" element={<AdminDashboard />} />
      <Route path="/dashboard/staff" element={<StaffDashboard />} />
      <Route path="/dashboard/createTicket" element={<CreateTicket />} />
      <Route path="/dashboard/ticketView/:id" element={<TicketView />} />
    </Routes>
  );
}