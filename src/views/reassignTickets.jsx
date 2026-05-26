'use client';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CheckIcon from '@mui/icons-material/Check';
import ReportIcon from '@mui/icons-material/Report';
import { getAllUsers, getAllTickets, reassignTicket } from "../app/api/auth.js";

export function ReassignTickets() {
  const [tickets, setTickets] = useState([]);
  const [staffUsers, setStaffUsers] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [pendingAssign, setPendingAssign] = useState({});
  const navigate = useNavigate();
  const decoded = jwtDecode(localStorage.getItem("token"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ticketsRes, usersRes] = await Promise.all([
          getAllTickets(),
          getAllUsers(),
        ]);
        setTickets(ticketsRes.data.tickets);
        setStaffUsers(usersRes.data.users.filter(u => u.role === "staff"));
      } catch (err) {
        console.error(err);
        setError("Failed to load data.");
      }
    };
    fetchData();
  }, []);

  const handleReassign = async (ticketId) => {
    const newAssigneeId = pendingAssign[ticketId];
    if (!newAssigneeId) return;
    try {
      setError("");
      await reassignTicket(ticketId, newAssigneeId);
      setTickets(prev =>
        prev.map(t => {
          if (t.id !== ticketId) return t;
          const newAssignee = staffUsers.find(u => u.id === newAssigneeId);
          return { ...t, assignedToId: newAssigneeId, assignedTo: newAssignee };
        })
      );
      setPendingAssign(prev => ({ ...prev, [ticketId]: "" }));
      setSuccess("Ticket reassigned successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reassign ticket.");
    }
  };

  const statusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "open":        return "success";
      case "claimed":
      case "in progress": return "warning";
      case "closed":      return "error";
      default:            return "default";
    }
  };

  return (
    <Box sx={{ p: { xs: "12px", sm: "20px" }, display: "flex", flexDirection: "column", gap: "20px", minHeight: "100vh", backgroundColor: "#16171d" }}>

      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 1, position: "relative" }}>
        <Button variant="contained" onClick={() => navigate("/dashboard")} sx={{ backgroundColor: 'transparent', flexShrink: 0 }}>
          <img src="/uw.png" alt="logo" style={{ width: 80, height: 54, objectFit: "contain" }} />
        </Button>

        {/* Centered title on md+ */}
        <Typography
          variant="h5"
          sx={{
            display: { xs: "none", md: "block" },
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            pointerEvents: "none",
          }}
        >
          Reassign Tickets
        </Typography>

        {/* Mobile title */}
        <Typography
          variant="subtitle1"
          sx={{
            display: { xs: "block", md: "none" },
            width: "100%",
            textAlign: "center",
            fontWeight: 500,
          }}
        >
          Reassign Tickets
        </Typography>
      </Box>

      {success && <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">{success}</Alert>}
      {error   && <Alert icon={<ReportIcon fontSize="inherit" />} severity="error">{error}</Alert>}

      {/* Ticket grid */}
      <Box sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "repeat(auto-fit, minmax(300px, 1fr))" },
        gap: 2,
      }}>
        {tickets.length === 0 && (
          <Typography color="text.secondary">No tickets found.</Typography>
        )}
        {tickets.map((ticket) => (
          <Card key={ticket.id} variant="outlined" sx={{ p: 2 }}>
            <Stack spacing={1}>

              {/* Title + status */}
              <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 1 }}>
                <Typography variant="h6" sx={{ wordBreak: "break-word", flex: 1 }}>
                  {ticket.title}
                </Typography>
                <Chip
                  label={ticket.status?.toUpperCase()}
                  color={statusColor(ticket.status)}
                  size="small"
                  sx={{ flexShrink: 0 }}
                />
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{
                display: "-webkit-box", WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical", overflow: "hidden",
              }}>
                {ticket.description}
              </Typography>

              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                {ticket.openDate && (
                  <Typography variant="caption" color="text.secondary">
                    Opened: {new Date(ticket.openDate).toLocaleDateString()}
                  </Typography>
                )}
                {ticket.closeDate && (
                  <Typography variant="caption" color="text.secondary">
                    Closed: {new Date(ticket.closeDate).toLocaleDateString()}
                  </Typography>
                )}
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                <Typography variant="body2">Currently Assigned to:</Typography>
                <Chip
                  label={ticket.assignedTo?.name || "Unassigned"}
                  size="small"
                  variant="outlined"
                />
              </Box>

              {/* Reassign controls — hide for closed tickets */}
              {ticket.status?.toLowerCase() !== "closed" && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                  <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>Reassign to:</Typography>
                  <Select
                    size="small"
                    displayEmpty
                    value={pendingAssign[ticket.id] ?? ""}
                    onChange={(e) =>
                      setPendingAssign(prev => ({ ...prev, [ticket.id]: e.target.value }))
                    }
                    sx={{ flex: 1, minWidth: 120 }}
                  >
                    <MenuItem value="" disabled>Select staff…</MenuItem>
                    {staffUsers
                      .filter(u => u.id !== ticket.assignedToId)
                      .map(u => (
                        <MenuItem key={u.id} value={u.id}>{u.name}</MenuItem>
                      ))}
                  </Select>
                  <Button
                    variant="contained"
                    size="small"
                    disabled={!pendingAssign[ticket.id]}
                    onClick={() => handleReassign(ticket.id)}
                  >
                    Save
                  </Button>
                </Box>
              )}

            </Stack>
          </Card>
        ))}
      </Box>
    </Box>
  );
}