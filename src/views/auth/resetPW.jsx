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
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { resetPW, verifyResetToken } from '../../app/api/auth.js';

export default function ResetPassword() {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [tokenValid, setTokenValid] = useState(null);
    useEffect(() => {
        if (!token) {
            return navigate("/login");
        }
        const verifyToken = async () => {
            try {
                console.log("verifying token:", token);
                await verifyResetToken(token);
                console.log("token valid");
                setTokenValid(true);
            } catch (err) {
                console.log("token invalid:", err.response?.data);
                setTokenValid(false);
            }
        };

        verifyToken();
    }, [token, navigate]);
    const handleResetPW = async () => {
        try {
            setError("");

            if (!token) {
                setError("Invalid reset link");
                return;
            }

            if (newPassword !== confirmPassword) {
                setError("Passwords do not match");
                return;
            }

            await resetPW(token, newPassword);
            setSuccess(true);
            setTimeout(() => navigate("/login"), 3000);

        } catch (err) {
            const message =
                err.response?.data?.message ||
                err.message ||
                "Something went wrong";
            setError(message);
        }
    };
    if (tokenValid === null) return <Typography>Loading...</Typography>;
    if (tokenValid === false) return (
        <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Paper sx={{ p: 6 }}>
                <Stack spacing={2}>
                    <Typography color="error">This reset link is invalid or has already been used.</Typography>
                    <MuiLink component={Link} to="/login">Back to Login</MuiLink>
                </Stack>
            </Paper>
        </Box>
    );
    return (
        <Box sx={{ minHeight: "100vh", alignItems: "center", justifyContent: "center", display: "flex" }}>
            <Grid container justifyContent="center" alignItems="center">
                <Grid size={{ xs: 12, md: 4 }}></Grid>
                <Paper sx={{ p: 6 }}>
                    <Stack spacing={3}>
                        <Typography variant="h6">
                            Reset Your Password
                        </Typography>

                        {success ? (
                            <Typography color="success.main">
                                Password reset successful! Redirecting to login...
                            </Typography>
                        ) : (
                            <>
                                <TextField
                                    label="New Password"
                                    type="password"
                                    fullWidth
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <TextField
                                    label="Confirm Password"
                                    type="password"
                                    fullWidth
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                {error && (
                                    <Typography color="error">{error}</Typography>
                                )}
                                <Button variant="contained" fullWidth onClick={handleResetPW}>
                                    Reset Password
                                </Button>
                            </>
                        )}

                        <MuiLink component={Link} to="/login">
                            Back to Login
                        </MuiLink>
                    </Stack>
                </Paper>
            </Grid>
        </Box>
    );
}