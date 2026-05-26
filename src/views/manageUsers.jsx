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
import Avatar from '@mui/material/Avatar';
import { stringToColor } from '../utils/styles.jsx';
import CheckIcon from '@mui/icons-material/Check';
import ReportIcon from '@mui/icons-material/Report';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { getAllUsers, changeUserRole, deleteUser } from "../app/api/auth.js";

export function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const decoded = jwtDecode(localStorage.getItem("token"));
  const currentUserId = decoded.id;

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getAllUsers();
        setUsers(res.data.users);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);

  const handleRoleChange = async (userId, newRole, currentRole) => {
    if (currentRole === "admin") return;
    try {
      setError("");
      await changeUserRole(userId, newRole);
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
      setSuccess("Role updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update role");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      setError("");
      await deleteUser(userId);
      setUsers(prev => prev.filter(u => u.id !== userId));
      setSuccess("User deleted successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete user");
    }
  };

  return (
    <Box sx={{ p: { xs: "12px", sm: "20px" }, display: "flex", flexDirection: "column", gap: "20px", minHeight: "100vh", backgroundColor: "#16171d" }}>

      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 1 }}>
        <Button variant="contained" onClick={() => navigate("/dashboard")} sx={{ backgroundColor: 'transparent', flexShrink: 0 }}>
          <img src="/hds.png" alt="logo" style={{ width: 80, height: 54, objectFit: "contain" }} />
        </Button>

        {/* Centered title on md+, hidden on mobile (shown below) */}
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
          Manage Users
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
          Manage Users
        </Typography>
      </Box>

      {success && <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">{success}</Alert>}
      {error && <Alert icon={<ReportIcon fontSize="inherit" />} severity="error">{error}</Alert>}

      {/* User grid */}
      <Box sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "repeat(auto-fit, minmax(260px, 1fr))" },
        gap: 2,
      }}>
        {users.map((user) => (
          <Card key={user.id} variant="outlined" sx={{ p: 2, position: "relative" }}>

            {user.role !== "admin" && user.id !== currentUserId && (
              <IconButton
                size="small"
                sx={{ position: "absolute", top: 8, right: 8 }}
                onClick={() => handleDeleteUser(user.id)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            )}

            <Stack spacing={1}>
              <Typography variant="h6">{user.name}</Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>{user.email}</Typography>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                <Typography>Role:</Typography>
                <Chip
                  label={user.role.toUpperCase()}
                  color={user.role === "admin" ? "error" : user.role === "staff" ? "warning" : "success"}
                  size="small"
                />
                <Avatar sx={{ bgcolor: stringToColor(user.name), ml: "auto" }}>
                  {user.name.charAt(0)}
                </Avatar>
              </Box>

              {user.role !== "admin" && user.id !== currentUserId && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                  <Typography variant="body2">Change role:</Typography>
                  <Select
                    size="small"
                    defaultValue={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value, user.role)}
                    sx={{ minWidth: 100 }}
                  >
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="staff">Staff</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </Select>
                </Box>
              )}
            </Stack>
          </Card>
        ))}
      </Box>
    </Box>
  );
}