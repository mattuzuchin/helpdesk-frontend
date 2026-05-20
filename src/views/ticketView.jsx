'use client';

import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { useParams } from "react-router-dom";
import {getTicketInfo} from '../app/api/auth.js';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export function TicketView() {
    const navigate = useNavigate();

    const [ticketInfo, setTI] = useState(null);
    const [error, setError] = useState("");

    const { id } = useParams();

    useEffect(() => {
        const fetchTicket = async () => {
            try {            
                setError("");
                const res = await getTicketInfo(id);
                setTI(res.data.ticket[0]);
            } catch (err) {

                setError(
                    err.response?.data?.message || "Failed to load ticket"
                );
            }
        };

        if (id) {
            fetchTicket();
        }
    }, [id]);
    console.log(ticketInfo);
    console.log(ticketInfo)
    return (
        <Box sx={{ p: 3 }}>
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
                        objectFit: "contain",
                    }}
                />
            </Button>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
            {!ticketInfo ? (
                <Typography>Loading ticket...</Typography>
            ) : (
                <Card
                    sx={{
                        maxWidth: 700,
                        mt: 3,
                        borderRadius: 3,
                    }}
                >
                    <CardContent>
                        <Stack spacing={2}>
                            <Typography variant="h4">
                                {ticketInfo.title}
                            </Typography>

                            <Typography color="text.secondary">
                                Ticket ID: {ticketInfo.id}
                            </Typography>

                            <Typography>
                                Problem: {ticketInfo.description}
                            </Typography>

                            <Typography component={"div"}>
                               Current Status:{" "}
                            <Chip
                                label={ticketInfo.status.toUpperCase()}
                                color={
                                    ticketInfo.status === "open"
                                    ? "success"
                                    : ticketInfo.status === "closed"
                                    ? "error"
                                    : "warning"
                                }
                                size="large"
                                sx={{maxWidth: '100px'}}
                                spacing= {3}
                            />
                            </Typography>

                            <Typography>
                                Opened By: {ticketInfo.createdBy?.name}
                            </Typography>

                            <Typography>
                                Assigned To: {ticketInfo.assignedTo?.name || "Yet to be claimed by a staff member."}
                            </Typography>

                            <Typography>
                                Open Date:{" "}
                                {new Date(ticketInfo.openDate).toLocaleString()}
                            </Typography>

                            <Typography>
                                Close Date:{" "}
                                {(ticketInfo.closeDate)}
                            </Typography>

                            <Typography>
                                Closed By:{" "}
                                {(ticketInfo.closedBy?.name)}
                            </Typography>

                        </Stack>
                    </CardContent>
                    {/* <CardActions>
                        <Button variant="contained">
                            Update Ticket
                        </Button>

                        <Button color="error">
                            Delete
                        </Button>
                    </CardActions> */}
                </Card>
            )}
        </Box>
    );
}