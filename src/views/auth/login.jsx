'use client';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiLink from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import signInFunction from '../../app/api/auth.js';
import { useNavigate } from 'react-router-dom';
export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
        const response = await signInFunction(email, password);
        const token = response.data.token;
        localStorage.setItem('token', token);
        console.log('Login successful:', token); 
        console.log("navigating to dashboard");
        navigate('/dashboard');
    } catch (error) {
    
      console.error('Login failed:', error);
    } };
    
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: '100vh' }}
    >
      <Grid item xs={11} sm={8} md={4}>
        <Paper sx={{ p: 4 }}>
          <Stack spacing={3}>
            <Typography variant="h3">
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
            <Button
              variant="contained"
              fullWidth
              onClick={handleLogin}
            >
              Login
            </Button>
            <MuiLink
              component={Link}
            >
              Don't have an account?
            </MuiLink>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
}