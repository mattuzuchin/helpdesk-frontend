'use client';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiLink from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { forgotPW } from '../../app/api/auth.js';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import ReportIcon from '@mui/icons-material/Report';

export default function ForgotPassword() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleForgotPW = async () => {
    try {
      setError("");
      await forgotPW(email);
      setSuccess("If that email exists, a reset link has been sent to your inbox.");
    } catch (err) {
      console.log(err);
      const message =
        err.response?.data?.message ||
        err.message ||
        "Something went wrong";
      setError(message);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", alignItems: "center", justifyContent: "center", display: "flex", px: { xs: 2, sm: 0 } }}>
      <Paper sx={{ p: { xs: 3, sm: 6 }, width: { xs: "100%", sm: "auto" }, maxWidth: { xs: 480, sm: "none" } }}>
        <Stack spacing={3}>
          <Typography variant="h6">Forgot Password? Enter Email Below:</Typography>

          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {success ? (
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
              {success}
            </Alert>
          ) : (
            <>
              {error && (
                <Alert icon={<ReportIcon fontSize="inherit" />} severity="error">
                  {error}
                </Alert>
              )}
              <Button variant="contained" fullWidth onClick={handleForgotPW}>
                Reset
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