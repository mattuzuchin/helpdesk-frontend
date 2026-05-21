'use client';
import { useEffect, useState } from "react";
import { getAllTickets, deleteTicket, closeTicket, reopenTicket, claimTicket } from "../app/api/auth.js";
import { BaseDashboard } from "./auth/baseDashboard.jsx";
import { useDashboardData } from "../hooks/useDashboardData.js";
import { jwtDecode } from "jwt-decode";
export function AllTickets() {
  const [tickets, setTickets] = useState([]);
  const { name, menuOpen, setMenuOpen, success, error, logOutUser, navigate } = useDashboardData();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getAllTickets();
        setTickets(res.data.tickets);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);

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

  const handleReopenTicket = async (ticketId) => {
    try {
      await reopenTicket(ticketId);
      setTickets(prev => prev.map(t =>
        t.id === ticketId ? { ...t, status: "open", closeDate: null } : t
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
      title="All Tickets"
      onDeleteTicket={handleDeleteTicket}
      onCloseTicket={handleCloseTicket}
      onReopenTicket={handleReopenTicket}
      onClaimTicket={handleClaimTicket}
    />
  );
}