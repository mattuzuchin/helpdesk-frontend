'use client';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { BaseDashboard } from './baseDashboard.jsx';
import { useDashboardData } from '../../hooks/useDashboardData.js';
import { deleteTicket, closeTicket, claimTicket, reopenTicket } from '../../app/api/auth.js';
import { jwtDecode } from "jwt-decode";

// user dashboard
export function UserDashboard() {
  const { name, tickets, menuOpen, setMenuOpen, success, error, logOutUser, navigate } = useDashboardData();

  return (
    <BaseDashboard
      name={name}
      tickets={tickets}
      menuOpen={menuOpen}
      setMenuOpen={setMenuOpen}
      success={success}
      error={error}
      onLogout={logOutUser}
      navigate={navigate}
    />
  );
}

// staff dashboard
export function StaffDashboard() {
  const { name, tickets, setTickets, menuOpen, setMenuOpen, success, error, logOutUser, navigate } = useDashboardData();

  const handleDeleteTicket = async (ticketId) => {
    try {
      await deleteTicket(ticketId);
      setTickets(prev => prev.filter(t => t.id !== ticketId));
    } catch (err) {
      console.log(err);
    }
  };

  const handleReopenTicket = async (ticketId) => {
    try {
      await reopenTicket(ticketId);
      setTickets(prev =>
        prev.map(t =>
          t.id === ticketId
            ? { ...t, status: "open", closeDate: null, assignedTo: null }
            : t
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleCloseTicket = async (ticketId) => {
    try {
      await closeTicket(ticketId);
      setTickets(prev => prev.map(t =>
        t.id === ticketId ? { ...t, status: "closed" } : t
      ));
    } catch (err) {
      console.log(err);
    }
  };

  const handleClaimTicket = async (ticketId) => {
    try {
      await claimTicket(ticketId);
      const decoded = jwtDecode(localStorage.getItem("token"));
      setTickets(prev => prev.map(t =>
        t.id === ticketId ? { ...t, status: "claimed", assignedTo: { id: decoded.id } } : t
      ));
    } catch (err) {
      console.log(err);
    }
  };

  const staffActions = (
    <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="flex-end">
      <Button
        variant="contained"
        onClick={() => navigate("/dashboard/allTickets")}
        sx={{ backgroundColor: 'transparent', fontSize: { xs: 10, sm: 12 } }}
      >
        All Tickets
      </Button>
    </Stack>
  );

  return (
    <BaseDashboard
      name={name}
      tickets={tickets}
      menuOpen={menuOpen}
      setMenuOpen={setMenuOpen}
      success={success}
      error={error}
      onLogout={logOutUser}
      navigate={navigate}
      title={`${name}'s Staff Dashboard`}
      extraHeaderActions={staffActions}
      onDeleteTicket={handleDeleteTicket}
      onCloseTicket={handleCloseTicket}
      onClaimTicket={handleClaimTicket}
      onReopenTicket={handleReopenTicket}
    />
  );
}

// admin dashboard
export function AdminDashboard() {
  const { name, tickets, setTickets, menuOpen, setMenuOpen, success, error, logOutUser, navigate } = useDashboardData();

  const handleDeleteTicket = async (ticketId) => {
    try {
      await deleteTicket(ticketId);
      setTickets(prev => prev.filter(t => t.id !== ticketId));
    } catch (err) {
      console.log(err);
    }
  };

  const handleCloseTicket = async (ticketId) => {
    try {
      await closeTicket(ticketId);
      setTickets(prev => prev.map(t =>
        t.id === ticketId ? { ...t, status: "closed" } : t
      ));
    } catch (err) {
      console.log(err);
    }
  };

  const handleClaimTicket = async (ticketId) => {
    try {
      await claimTicket(ticketId);
      const decoded = jwtDecode(localStorage.getItem("token"));
      setTickets(prev => prev.map(t =>
        t.id === ticketId ? { ...t, status: "claimed", assignedTo: { id: decoded.id } } : t
      ));
    } catch (err) {
      console.log(err);
    }
  };

  const handleReopenTicket = async (ticketId) => {
    try {
      await reopenTicket(ticketId);
      setTickets(prev =>
        prev.map(t =>
          t.id === ticketId
            ? { ...t, status: "open", closeDate: null, assignedTo: null }
            : t
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const adminActions = (
    <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="flex-end">
      <Button
        variant="contained"
        onClick={() => navigate("/dashboard/allTickets")}
        sx={{ backgroundColor: 'transparent', fontSize: { xs: 10, sm: 12 } }}
      >
        All Tickets
      </Button>
      <Button
        variant="contained"
        onClick={() => navigate("/dashboard/manageUsers")}
        sx={{ backgroundColor: 'transparent', fontSize: { xs: 10, sm: 12 } }}
      >
        Manage Users
      </Button>
      <Button
        variant="contained"
        onClick={() => navigate("/dashboard/reassignTickets")}
        sx={{ backgroundColor: 'transparent', fontSize: { xs: 10, sm: 12 } }}
      >
        Reassign
      </Button>
    </Stack>
  );

  return (
    <BaseDashboard
      name={name}
      tickets={tickets}
      menuOpen={menuOpen}
      setMenuOpen={setMenuOpen}
      success={success}
      error={error}
      onLogout={logOutUser}
      navigate={navigate}
      title={`${name}'s Admin Dashboard`}
      extraHeaderActions={adminActions}
      onDeleteTicket={handleDeleteTicket}
      onCloseTicket={handleCloseTicket}
      onClaimTicket={handleClaimTicket}
      onReopenTicket={handleReopenTicket}
    />
  );
}