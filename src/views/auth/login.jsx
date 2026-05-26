'use client';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import MuiLink from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { login } from '../../app/api/auth.js';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from 'react-router-dom';
import ReportIcon from '@mui/icons-material/Report';

let disableLogin = false;
function disableLoginField() {
  disableLogin = !disableLogin;
}

export default function SignIn() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setError("");
      const response = await login(email.trimEnd(), password);
      const token = response.data.token;
      localStorage.setItem('token', token);
      if (!token) return null;
      setSuccess("Login Success! Taking you to your dashboard now.");
      disableLoginField();
      setTimeout(() => {
        disableLoginField();
        navigate('/dashboard');
      }, 2500);
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
          <Typography variant="h6">Login</Typography>

          {!disableLogin && (
            <TextField
              label="Email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}
          {!disableLogin && (
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}
          {success && (
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
              {success}
            </Alert>
          )}
          {error && (
            <Alert icon={<ReportIcon fontSize="inherit" />} severity="error">
              {error}
            </Alert>
          )}
          {!disableLogin && (
            <Button variant="contained" fullWidth onClick={handleLogin}>
              Login
            </Button>
          )}
          <MuiLink component={Link} to="/register">
            Create an Account
          </MuiLink>
          <MuiLink component={Link} to="/forgotPW">
            Forgot Password
          </MuiLink>
        </Stack>
      </Paper>
    </Box>
  );
}