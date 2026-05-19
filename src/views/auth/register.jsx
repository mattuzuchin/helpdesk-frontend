'use client';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiLink from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useState } from 'react';
import {register} from '../../app/api/auth.js';
import { useNavigate } from 'react-router-dom';
export default function Register() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const handleRegistration = async () => {
    try {
        setError("");
        const response = await register(name, email, password);
        const token = response.data.token;
        localStorage.setItem('token', token);
        console.log(email);
        navigate('/login');
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
    <Box sx={{ minHeight: "100vh", bgcolor: "white", alignItems: "center",justifyContent: "center", display: "flex"}}>
    <Grid container
      justifyContent="center"
      alignItems="center"
    >
      <Grid size={{ xs: 12, md: 4 }}></Grid>
        <Paper sx={{ p: 6 }}>
          <Stack spacing={3}>
            <Typography variant="h6">
              Register for an Account
            </Typography>
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
              onClick={handleRegistration}
            >
              Login
            </Button>
            <MuiLink
              component={Link}
              to={'/login'}
            >
             Already have an account?
            </MuiLink>
          </Stack>
        </Paper>
      </Grid>
      </Box>
  );
}