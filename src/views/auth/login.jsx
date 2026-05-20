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
import {login} from '../../app/api/auth.js';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from "jwt-decode"
export default function SignIn() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
        setError("");
        const response = await login(email.trimEnd(), password);
        const token = response.data.token;
        localStorage.setItem('token', token);
        let isAdmin = false;
        let isStaff = false;
        let isUser = false;
        if(!token) {
          return null;
        }
        if(token) {
          const decoded = jwtDecode(token);
          isAdmin = decoded.role === "admin";
          isStaff = decoded.role === "staff";
          isUser = decoded.role === "user";
        }
        if(isAdmin) {
          navigate('/dashboard/admin')
        } else if (isStaff) {
          navigate('/dashboard/staff')
        } else if (isUser) {
          navigate('/dashboard');
        }
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
    <div>
    <Box sx={{ minHeight: "100vh", alignItems: "center",justifyContent: "center", display: "flex", position: "center"}}>
    <Grid container
      justifyContent="center"
      alignItems="center"
    >
      <Grid size={{ xs: 12, md: 4 }}>
      </Grid>
        <Paper sx={{ p: 6 }}>
          <Stack spacing={3}>
            <Typography variant="h6">
              Login
            </Typography>
            <TextField
              label="Email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
            />
            {error && (
              <Typography color="error">
                {error}
              </Typography>
            )}
            <Button
              variant="contained"
              fullWidth
              onClick={handleLogin}
            >
              Login
            </Button>
            <MuiLink
              component={Link}
              to={'/register'}
            >
              Create an Account
            </MuiLink>
                        <MuiLink
              component={Link}
              to={'/forgotPW'}
            >
              Forgot Password
            </MuiLink>
          </Stack>
        </Paper>
      </Grid>
      
      </Box>
      </div>
  );
}