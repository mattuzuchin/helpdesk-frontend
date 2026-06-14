'use client';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import * as Colors from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import ListItemIcon from '@mui/material/ListItemIcon';
import Key from '@mui/icons-material/Key';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import IconButton from '@mui/material/IconButton';
import { StyledBadge, PlusIcon } from '../../utils/styles.jsx';
import ReportIcon from '@mui/icons-material/Report';
import DeleteIcon from '@mui/icons-material/Delete';
import { jwtDecode } from "jwt-decode";
import BlockIcon from '@mui/icons-material/Block';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// dropdown menu
export function AvatarMenu({ menuOpen, setMenuOpen, onLogout, success, error, navigate }) {
  return (
    <div style={{ position: "relative" }}>
      <Button
        variant="contained"
        onClick={() => setMenuOpen(prev => !prev)}
        sx={{ backgroundColor: 'transparent' }}
      >
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar
            sx={{ bgcolor: Colors.deepOrange[500], width: 45, height: 45 }}
            src="/images2.jpg"
          />
        </StyledBadge>
      </Button>

      {menuOpen && (
        <Paper sx={{ width: 200, position: "absolute", top: "100%", right: 0, zIndex: 1000 }}>
          <MenuList>
            <Divider />
            <MenuItem onClick={() => navigate("/dashboard/profile")}>
              <ListItemIcon><AccountCircleIcon fontSize="small" /></ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </MenuItem>
            <MenuItem onClick={onLogout}>
              <ListItemIcon><Key fontSize="small" /></ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </MenuList>
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
        </Paper>
      )}
    </div>
  );
}

// ticket card for display
export function TicketCard({ ticket, navigate, currentUserRole, onDelete, onClose, onClaim, onReopen }) {
  return (
    <Card variant="outlined">
      <Box sx={{ p: 2, position: "relative" }}>

        {(currentUserRole === "admin" || currentUserRole === "staff") && (
          <IconButton
            size="small"
            sx={{ position: "absolute", top: 8, right: 8 }}
            onClick={() => onDelete(ticket.id)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        )}
        {ticket.status === "closed" && (currentUserRole === "admin" || currentUserRole === "staff") && (
          <IconButton
            size="small"
            sx={{ position: "absolute", top: 8, right: 40 }}
            onClick={() => onReopen && onReopen(ticket.id)}
          >
            <Key fontSize="small" />
          </IconButton>
        )}
        {ticket.status !== "closed" && (currentUserRole === "admin" || currentUserRole === "staff") && (
          <IconButton
            size="small"
            sx={{ position: "absolute", top: 8, right: 40 }}
            onClick={() => onClose && onClose(ticket.id)}
          >
            <BlockIcon fontSize="small" />
          </IconButton>
        )}
        {(currentUserRole === "admin" || currentUserRole === "staff") &&
        !ticket.assignedTo &&
        ticket.status !== "claimed" && (
          <IconButton
            size="small"
            sx={{ position: "absolute", top: 8, right: 72 }}
            onClick={() => onClaim && onClaim(ticket.id)}
          >
            <AssignmentIndIcon fontSize="small" />
          </IconButton>
        )}
        <Button
          disableRipple
          sx={{
            backgroundColor: "transparent",
            justifyContent: "flex-start",
            padding: 0,
            minWidth: 0,
            textTransform: "none",
            "&:hover": { backgroundColor: "transparent" },
          }}
          onClick={() => navigate(`/dashboard/ticketView/${ticket.id}`)}
        >
          <Typography variant="h6" sx={{ color: 'purple' }}>
            {ticket.title}
          </Typography>
        </Button>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {ticket.description}
        </Typography>
      </Box>

      <Divider />

      <Box sx={{ p: 2 }}>
        <Typography sx={{ color: "teal" }}>Ticket Status</Typography>
        <Chip
          label={ticket.status.toUpperCase()}
          color={
            ticket.status === "open" ? "success"
            : ticket.status === "closed" ? "error"
            : "warning"
          }
          size="small"
        />
        <IconButton onClick={() => navigate(`/dashboard/ticketView/${ticket.id}`)}>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <ChatBubbleIcon
              sx={{ mr: 0.5 }}
              color={
                ticket.status === "open" ? "success"
                : ticket.status === "closed" ? "error"
                : "warning"
              }
            />
          </StyledBadge>
        </IconButton>
      </Box>
    </Card>
  );
}

export function BaseDashboard({ name, tickets, menuOpen, setMenuOpen, success, error, onLogout, navigate, title, extraHeaderActions, onDeleteTicket, onCloseTicket, onClaimTicket, onReopenTicket }) {
  const decoded = jwtDecode(localStorage.getItem("token"));
  const currentUserRole = decoded.role;
  return (
    <Box
      sx={{
        position: "relative",
        p: { xs: "12px", sm: "20px" },
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        minHeight: "100vh",
        backgroundColor: "#16171d",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        {/* Logo */}
        <Button
          variant="contained"
          onClick={() => navigate("/dashboard")}
          sx={{ backgroundColor: 'transparent', flexShrink: 0 }}
        >
          <img
            src="/hds.png"
            alt="logo"
            style={{ maxHeight: 60, width: "auto", display: "block" }}
          />
        </Button>

        {/* Title — centered on md+, inline on mobile */}
        <Typography
          variant="h6"
          sx={{
            display: { xs: "none", md: "block" },
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: { md: "20px" },
            textAlign: "center",
            pointerEvents: "none",
          }}
        >
          {title || `${name}'s Dashboard`}
        </Typography>

        {/* Right side actions */}
        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
          <Button
            variant="contained"
            onClick={() => navigate("/dashboard/createTicket")}
            sx={{ backgroundColor: 'transparent' }}
          >
            <PlusIcon sx={{ fontSize: 30 }} />
          </Button>

          {extraHeaderActions}

          <AvatarMenu
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            onLogout={onLogout}
            success={success}
            error={error}
            navigate={navigate}
          />
        </Stack>

        {/* Title visible only on mobile, below the row */}
        <Typography
          variant="subtitle1"
          sx={{
            display: { xs: "block", md: "none" },
            width: "100%",
            textAlign: "center",
            fontWeight: 500,
            mt: 0.5,
          }}
        >
          {title || `${name}'s Dashboard`}
        </Typography>
      </Box>

      {/* Ticket grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(auto-fit, minmax(260px, 1fr))",
          },
          gap: 2,
          width: "100%",
        }}
      >
        {tickets?.map((ticket) => (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
            navigate={navigate}
            currentUserRole={currentUserRole}
            onDelete={onDeleteTicket}
            onClose={onCloseTicket}
            onClaim={onClaimTicket}
            onReopen={onReopenTicket}
          />
        ))}
      </Box>
    </Box>
  );
}