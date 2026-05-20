'use client';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import {createTicket} from '../app/api/auth.js';
let create = false
function disableFields() {
    create = !create;
}
export  function CreateTicket() {
    
const navigate = useNavigate();
const [ticketTitle, setTitle] = useState("");
const [ticketDescription, setDesc] = useState("");
const [error, setError] = useState("");
const [success, setSuccess] = useState("");

const handleCreateTicket = async () => {
  try {
    setError("");
    setSuccess("");
    await createTicket(ticketTitle, ticketDescription);
    setSuccess("Ticket created successfully!");
    disableFields();
    setTimeout(() => {
        disableFields();
        navigate("/dashboard");
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
    <div>    
      <Button
        disableRipple
        sx={{
          backgroundColor: "transparent",
          justifyContent: "flex-start",
          padding: 0,
          minWidth: 0,
          textTransform: "none",
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
        onClick={() => navigate("/dashboard")}
      >
      <img
        src="/uw.png"
        alt="logo"
        style={{
          width: 120,
          height: 80,
          objectFit: "contain"
        }}
      />
      </Button>
    <Box sx={{ minHeight: "100vh", alignItems: "center",justifyContent: "center", display: "flex"}}>
    <Grid container
      justifyContent="center"
      alignItems="center"
    >
      <Grid size={{ xs: 12, md: 4 }}></Grid>
        <Paper sx={{ p: 6 }}>
          <Stack spacing={3}>
            <Typography variant="h6">
              Create a Ticket
            </Typography>
            {success && (
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                {success}
            </Alert>
            )}
            {!create && (
            <TextField
              label="Subject"
              fullWidth
              value={ticketTitle}
              onChange={(e) => setTitle(e.target.value)}
            />
            )}
            {!create && (
            <TextField
              label="Description"
              fullWidth
              value={ticketDescription}
              onChange={(e) => setDesc(e.target.value)} 
            />
            )}
            {error && (
              <Typography color="error">
                {error}
              </Typography>
            )}
            {!create && (
            <Button
              variant="contained"
              fullWidth
              onClick={handleCreateTicket}
            >
              Create
            </Button>
            )}
          </Stack>
        </Paper>
      </Grid>
      </Box>
      </div>
  );
}