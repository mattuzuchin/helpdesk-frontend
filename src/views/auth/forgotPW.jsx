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
import {forgotPW} from '../../app/api/auth.js';
import { useNavigate } from 'react-router-dom';
export default function Register() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleForgotPW = async () => {
    try {
        setError("");
        const response = await forgotPW(email);
        setSuccess(true);
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
              Forgot Password? Enter Email Below:
            </Typography>
            <TextField
              label="Email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {success ? (
                <Typography color="success.main">
                    If that email exists, a reset link has been sent to your inbox.
                </Typography>
            ) : (
                <>
                    {error && <Typography color="error">{error}</Typography>}
                    <Button variant="contained" fullWidth onClick={handleForgotPW}>
                        Reset
                    </Button>
                </>
            )}
            <MuiLink
              component={Link}
              to={'/login'}
            >
             Back to Login
            </MuiLink>
          </Stack>
        </Paper>
      </Grid>
      </Box>
  );
}