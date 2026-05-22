'use client';
import { jwtDecode } from "jwt-decode";
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { useParams } from "react-router-dom";
import {getTicketInfo, addCommentAPI, deleteCommentFromTicket} from '../app/api/auth.js';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import {logOut} from '../app/api/auth.js';
import ListItemIcon from '@mui/material/ListItemIcon';
import Key from '@mui/icons-material/Key';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import ReportIcon from '@mui/icons-material/Report';
import * as Colors from '@mui/material/colors'
import {StyledBadge} from '../utils/styles.jsx';

export function TicketView() {
    const navigate = useNavigate();
    const [ticketInfo, setTI] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState('');
    const [comment, setComment] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const { id } = useParams();
    const [loggingOut, setLO] = useState('');
    const [loggingOutError, setLOR] = useState('');
    const decoded = jwtDecode(localStorage.getItem("token"));
    const currentUserId = decoded.id;
    const currentUserRole = decoded.role;
    useEffect(() => {
        const fetchTicket = async () => {
            try {
                setError("");
                const res = await getTicketInfo(id);
                setTI(res.data.ticket[0]);
                setSuccess("Ticket successfully loaded!")
            } catch (err) {
                setError(err.response?.data?.message || "Failed to load ticket");
            }
        };
        if (id) fetchTicket();
    }, [id]);
    const addComment = async () => {
        try {
            setError("");
            await addCommentAPI(id, comment, imageUrl);
            const res = await getTicketInfo(id);
            setTI(res.data.ticket[0]);
            setSuccess("Added comment!")
            setComment("");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add comment");
         }
    };
    const logOutUser = async () => {
        try {
            setError(''); 
            const res = await logOut();
            setLO("Logging out!")
            setTimeout(() => {
                navigate("/login");
                localStorage.removeItem("token");
            }, 2500)
        } catch (err) {
            setLOR(
                err.response?.data?.message || "Failed to load error"
                );
            }
        };
    const deleteComment = async (commentId) => {
        try {
            setError("");
            await deleteCommentFromTicket(commentId);
            const res = await getTicketInfo(id);
            setSuccess("Comment successfully deleted!")
            setTI(res.data.ticket[0]);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to delete comment");
        }
    };
    const handleCloseSuccess = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccess(null);
    };
    const handleCloseError = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setError(null);
    };
    return (
        <Box sx={{ display: "flex", flexDirection: "column", p: 3, gap: 2 }}>
            <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            
            }}>
                {/* logo on left */}
                <Button
                variant="contained"
                onClick={() => navigate("/dashboard")}
                sx={{ backgroundColor: 'transparent' }}
                >
                <img src="/uw.png" alt="logo" style={{ width: 120, height: 80, objectFit: "contain" }} />
                </Button>
                <Typography
                    variant="h5"
                    sx={{
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)"
                    }}
                >
                    Ticket View
                </Typography>
                {/* avatar + dropdown on right */}
                <div style={{ position: "relative" }}>
                    <Button variant="contained" onClick={() => setMenuOpen(prev => !prev)} sx={{ backgroundColor: 'transparent' }} >
                    <StyledBadge overlap="circular" anchorOrigin={{ vertical: "bottom", horizontal: "right" }} variant="dot">
                        <Avatar sx={{ bgcolor: Colors.deepOrange[500], width: 45, height: 45 }} src="/images2.jpg" />
                    </StyledBadge>
                    </Button>

                    {menuOpen && (
                    <Paper sx={{ width: 200, position: "absolute", top: "100%", right: 0, zIndex: 1000 }}>
                        <MenuList>
                        <Divider />
                        <MenuItem onClick={logOutUser}>
                            <ListItemIcon><Key fontSize="small" /></ListItemIcon>
                            <ListItemText>Logout</ListItemText>
                        </MenuItem>
                        </MenuList>
                            {loggingOut && (
                                <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                                    {loggingOut}
                                </Alert>
                            )}
                            {loggingOutError && (
                            <Alert icon={<ReportIcon fontSize="inherit" />} severity="error">
                                {loggingOutError}
                            </Alert>
                            )}  
                    </Paper>
                    
                    )}
                </div>

            </div>
            
            <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start" }}>
                
                {/* ticket info should be on left */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                    {!ticketInfo ? (
                        <Typography>Loading ticket...</Typography>
                        
                    ) : (
                        <Card sx={{ borderRadius: 3 }}>
                            <CardContent>
                                <Stack spacing={2}>
                                    <Typography variant="h4">{ticketInfo.title}</Typography>
                                    <Typography color="text.secondary">Ticket ID: {ticketInfo.id}</Typography>
                                    <Typography>Problem: {ticketInfo.description}</Typography>
                                    <Typography component="div">
                                        Current Status:{" "}
                                        <Chip
                                            label={ticketInfo.status.toUpperCase()}
                                            color={
                                                ticketInfo.status === "open" ? "success"
                                                : ticketInfo.status === "closed" ? "error"
                                                : "warning"
                                            }
                                            size="small"
                                        />
                                    </Typography>
                                    <Typography>Opened By: {ticketInfo.createdBy?.name}</Typography>
                                    <Typography>Assigned To: {ticketInfo.assignedTo?.name || "Yet to be claimed by a staff member."}</Typography>
                                    <Typography>Open Date: {new Date(ticketInfo.openDate).toLocaleString()}</Typography>
                                    <Typography>Close Date: {ticketInfo.closeDate || "—"}</Typography>
                                    <Typography>Closed By: {ticketInfo.closedBy?.name || "—"}</Typography>
                                </Stack>
                            </CardContent>
                        </Card>
                    )}
                </Box>
                {/* comments should be in the middle */}
                <Box sx={{
                    flex: 1,
                    minWidth: 0,
                    position: "sticky",
                    top: 20,
                    maxHeight: "80vh",
                    overflowY: "auto"
                }}>
                    {!ticketInfo ? (
                        <Typography>Loading comments...</Typography>
                    ) : (
                        <Card sx={{ borderRadius: 3 }}>
                            <CardContent>
                                <Stack spacing={2}>
                                    <Typography variant="h5">Comments</Typography>
                                    {(!ticketInfo.comments || ticketInfo.comments.length === 0) ? (
                                        <Typography color="text.secondary">No comments yet.</Typography>
                                    ) : (
                                        ticketInfo.comments.map((comment) => (
                                            <Box key={comment.id} sx={{ borderBottom: "1px solid #eee", pb: 2, position: "relative" }}>

                                                {/* delete icon should appear on EVERY comment */}
                                                    {(currentUserRole === "admin" || comment.user.id === currentUserId) && (
                                                    <IconButton
                                                        size="small"
                                                        sx={{ position: "absolute", top: 8, right: 8 }}
                                                        onClick={() => deleteComment(comment.id)}
                                                    >
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                    )}
                                                <Typography variant="subtitle2">
                                                    {comment.user.name} commented on{" "}
                                                    {new Date(comment.createdAt).toLocaleString()}
                                                </Typography>
                                                <Typography variant="body1" sx={{ mt: 1 }}>
                                                    {comment.content}
                                                </Typography>
                                                {comment.imageUrl && (
                                                    <img
                                                        src={comment.imageUrl}
                                                        alt="Comment"
                                                        style={{ marginTop: 8, maxWidth: '100%', height: 'auto' }}
                                                    />
                                                )}
                                            </Box>
                                        ))
                                    )}
                                </Stack>
                            </CardContent>
                        </Card>
                    )}
                </Box>

                {/* add a comment is on right */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Card sx={{ borderRadius: 3 }}>
                        <CardContent>
                            <Stack spacing={2}>
                                <Typography variant="h5">Add Comment</Typography>
                                <TextField
                                    label="Write a comment..."
                                    multiline
                                    rows={4}
                                    fullWidth
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                                <TextField
                                    label="Insert an image URL (optional)"
                                    multiline
                                    rows={2}
                                    fullWidth
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                />
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={
                                        addComment
                                    }
                                >
                                    Submit
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                </Box>

            </Box>
            {success && (
                <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" onClose={handleCloseSuccess}>
                    {success}
                </Alert>
            )}
            {error && (
                <Alert icon={<ReportIcon fontSize="inherit" />} severity="error" onClose={handleCloseError}>
                    {error}
                </Alert>
            )}
        </Box>
    );
}
