'use client';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiLink from '@mui/material/Link';
import Paper from '@mui/material/Paper';
export default function SignIn() {
    console.log('Login component rendered');
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
              Test
            </Typography>
            <Button
              variant="contained"
              fullWidth
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