'use client';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import * as Colors from '@mui/material/colors'
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Icon from '@mui/material/Icon';
import {jwtDecode} from "jwt-decode"
import {getName, getUserTickets} from '../app/api/auth.js';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { createSvgIcon } from '@mui/material/utils';
import { useNavigate } from "react-router-dom";
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': { transform: 'scale(.8)', opacity: 1 },
    '100%': { transform: 'scale(2.4)', opacity: 0 },
  },
}));

const PlusIcon = createSvgIcon(
  // credit: plus icon from https://heroicons.com
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" color='lightblue'>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>,
  'Plus',
);
//dashboard will look dif per user role
export function UserDashboard( ) {
  const [name, setName] = useState("");
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {

        const token = localStorage.getItem("token");

        if (!token) return;

        const decoded = jwtDecode(token);
        const getUsername= await getName(decoded.id);

        setName(getUsername.data.name);

        const getTickets = await getUserTickets(decoded.id);
        setTickets(getTickets.data.tickets);
  

      } catch (err) {

        console.log(err);
      }
    };
    fetchData();
  }, []);
return (
  <div
    style={{
      position: "relative",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "20px"
    }}
  >
      {/* header for dash */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative"
      }}
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
      <Typography
        variant="h5"
        sx={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)"
        }}
      >
        {name}'s Dashboard
      </Typography>
      <Stack direction="row" spacing={2}>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Button
            variant="contained"
            onClick={() => navigate("/dashboard/createTicket")}
            >
              <PlusIcon></PlusIcon>
          </Button>
          <Button>
          <Avatar
            sx={{
              bgcolor: Colors.deepOrange[500],
              width: 45,
              height: 45
            }}
            src="/images2.jpg"
          />
          </Button>
        </StyledBadge>
      </Stack>
    </div>
    {/* where we displasy tickets */}
<Box
  sx={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 2,
    width: "100%"
  }}
>
  {tickets?.map((ticket) => (
    <Card key={ticket.id} variant="outlined">
      <Box sx={{ p: 2 }}>
        <Typography variant="h6">
          {ticket.title}
        </Typography>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {ticket.description}
        </Typography>
      </Box>

      <Divider />

      <Box sx={{ p: 2 }}>
        <Typography sx={{ color: "purple" }}>
          Ticket Status
        </Typography>

        <Chip
          label={ticket.status.toUpperCase()}
          color={
            ticket.status === "open"
              ? "success"
              : ticket.status === "closed"
              ? "error"
              : "warning"
          }
          size="small"
        />
      </Box>
    </Card>
  ))}
</Box>
  </div>
);
}
export function StaffDashboard() {
  return (
    <div>
      <Icon src="../../public/panda.jpg">

      </Icon>
      <Button disableC>
        <Stack direction="row" spacing={3}>
      </Stack>
        Dashboard
      </Button>
      <Snackbar/>
      <Stack direction="row" spacing={2} sx={{position: 'absolute', top: 10, right: 10}}>
        
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
          >
          <Avatar sx = {{bgcolor: Colors.deepOrange[500], width: 45, height: 45}} alt="User" src="../../public/images2.jpg" />
        </StyledBadge>
    </Stack>
    </div>
    
  );
}

export function AdminDashboard() {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const name = decoded.id.name;
  return (
    <div
      style={{
        position: "relative",
        padding: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}
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
      <Typography
        variant="h5"
        sx={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)"
        }}
      >
        {name}'s Administrator Dashboard
      </Typography>
      <Stack direction="row" spacing={2}>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
        >
          <Avatar
            sx={{
              bgcolor: Colors.deepOrange[500],
              width: 45,
              height: 45
            }}
            src="/images2.jpg"
          />
        </StyledBadge>
      </Stack>

    </div>
  );
}