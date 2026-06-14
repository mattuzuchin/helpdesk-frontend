'use client';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import CheckIcon from '@mui/icons-material/Check';
import ReportIcon from '@mui/icons-material/Report';
import * as Colors from '@mui/material/colors';
import { getProfile, updateProfile } from "../app/api/auth.js";

export function Profile() {
  const navigate = useNavigate();
  const decoded = jwtDecode(localStorage.getItem("token"));

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        const user = res.data.user;
        setName(user.name || "");
        setEmail(user.email || "");
        setRole(user.role || decoded.role);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      setError("");
      setSuccess("");
      setSaving(true);
      await updateProfile(name, email);
      setSuccess("Profile updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box sx={{ p: { xs: "12px", sm: "20px" }, display: "flex", flexDirection: "column", gap: "20px", minHeight: "100vh", backgroundColor: "#16171d" }}>

      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 1 }}>
        <Button variant="contained" onClick={() => navigate("/dashboard")} sx={{ backgroundColor: 'transparent', flexShrink: 0 }}>
          <img src="/hds.png" alt="logo" style={{ maxHeight: 60, width: "auto", display: "block" }} />
        </Button>

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
          My Profile
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            display: { xs: "block", md: "none" },
            width: "100%",
            textAlign: "center",
            fontWeight: 500,
          }}
        >
          My Profile
        </Typography>
      </Box>

      {success && <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">{success}</Alert>}
      {error && <Alert icon={<ReportIcon fontSize="inherit" />} severity="error">{error}</Alert>}

      {loading ? (
        <Typography>Loading profile...</Typography>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Card sx={{ borderRadius: 3, width: "100%", maxWidth: 480 }}>
            <CardContent>
              <Stack spacing={3} alignItems="center">

                <Avatar
                  src="/images2.jpg"
                  sx={{ bgcolor: Colors.deepOrange[500], width: 100, height: 100 }}
                />

                <Chip
                  label={role.toUpperCase()}
                  color={role === "admin" ? "error" : role === "staff" ? "warning" : "success"}
                  size="small"
                />

                <TextField
                  label="Full Name"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  label="Email"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
}