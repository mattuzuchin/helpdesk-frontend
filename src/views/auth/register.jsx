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
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from 'react';
import {register} from '../../app/api/auth.js';
import { useNavigate } from 'react-router-dom';
import ReportIcon from '@mui/icons-material/Report';
let disableRegister = false
function disableRegisterField() {
    disableRegister = !disableRegister;
}
export default function Register() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const handleRegistration = async () => {
    try {
        setError("");
        const response = await register(name, email, password);
        const token = response.data.token;
        localStorage.setItem('token', token);
        setSuccess("User registration successful! Taking you back to login...");
        disableRegisterField();
        setTimeout(() => {
            navigate('/login');
        }, 4000)
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
    <Box sx={{ minHeight: "100vh", alignItems: "center",justifyContent: "center", display: "flex", position: "center"}}>
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
            {!disableRegister && (         
             <TextField
              label="Full Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            )}
            {!disableRegister && (
            <TextField
              label="Email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            )}
            {!disableRegister && (
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