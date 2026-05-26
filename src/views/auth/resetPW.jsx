'use client';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiLink from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { resetPW, verifyResetToken } from '../../app/api/auth.js';
import ReportIcon from '@mui/icons-material/Report';
import Alert from '@mui/material/Alert';

export default function ResetPassword() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [tokenValid, setTokenValid] = useState(null);

  useEffect(() => {
    if (!token) return navigate("/login");
    const verifyToken = async () => {
      try {
        await verifyResetToken(token);
        setTokenValid(true);
      } catch (err) {
        setTokenValid(false);
      }
    };
    verifyToken();
  }, [token, navigate]);

  const handleResetPW = async () => {
    try {
      setError("");
      if (!token) { setError("Invalid reset link"); return; }
      if (newPassword !== confirmPassword) { setError("Passwords do not match"); return; }
      await resetPW(token, newPassword);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Something went wrong";
      setError(message);
    }
  };

  if (tokenValid === null) return <Typography sx={{ p: 3 }}>Loading...</Typography>;

  if (tokenValid === false) return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", px: { xs: 2, sm: 0 } }}>
      <Paper sx={{ p: { xs: 3, sm: 6 }, width: { xs: "100%", sm: "auto" }, maxWidth: { xs: 480, sm: "none" } }}>
        <Stack spacing={2}>
          <Typography color="error">This reset link is invalid or has already been used.</Typography>
          <MuiLink component={Link} to="/login">Back to Login</MuiLink>
        </Stack>
      </Paper>
    </Box>
  );

  return (
    <Box sx={{ minHeight: "100vh", alignItems: "center", justifyContent: "center", display: "flex", px: { xs: 2, sm: 0 } }}>
      <Paper sx={{ p: { xs: 3, sm: 6 }, width: { xs: "100%", sm: "auto" }, maxWidth: { xs: 480, sm: "none" } }}>
        <Stack spacing={3}>
          <Typography variant="h6">Reset Your Password</Typography>

          {success ? (
            <Typography color="success.main">
              Password reset successful! Redirecting to login...
            </Typography>
          ) : (
            <>
              <TextField
                label="New Password"
                type="password"
                fullWidth
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <TextField
                label="Confirm Password"
                type="password"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {error && (
                <Alert icon={<ReportIcon fontSize="inherit" />} severity="error">
                  {error}
                </Alert>
              )}
              <Button variant="contained" fullWidth onClick={handleResetPW}>
                Reset Password
              </Button>
            </>
          )}

          <MuiLink component={Link} to="/login">
            Back to Login
          </MuiLink>
        </Stack>
      </Paper>
    </Box>
  );
}