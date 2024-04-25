import { useState, useEffect } from 'react';
import DashboardLayout from '../src/DashboardLayout';
import { getStyles } from '../src/utils/style';
import { Box, Button, Grid, MenuItem, Select, Typography } from '@mui/material';
import { useRouter } from 'next/router';

const CreditPage = () => {
  const styles = getStyles();
  const [credits, setCredits] = useState(1); // Initialize to 1
  const router = useRouter();
  
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      router.push('/login');
    }
  }, []);

  useEffect(() => {
    // Save the credits to local storage whenever they change
    localStorage.setItem('credits', JSON.stringify(credits));
  }, [credits]);

  const handleSelectChange = (event: any) => {
    setCredits(Number(event.target.value));
  };

  const handleGetCredits = async () => {
    const response = await fetch('/api/credits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        credits,
      }),
    });

    if (!response.ok) {
      // Handle error
      console.error('Failed to get credits');
    }
  };

  const CreditSelect = () => (
    <Select value={credits} onChange={handleSelectChange} css={styles.dashboard.Credit.select}>
      {[...Array(10)].map((_, i) => (
        <MenuItem key={i} value={i + 1}>
          {i + 1}
        </MenuItem>
      ))}
    </Select>
  );

  return (
    <DashboardLayout>
      <Grid container spacing={8} justifyContent="space-between" alignItems="center">
        <Grid item xs={12} md={6}>
          <img src="/passport.png" alt="passport" style={{ width: '100%' }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4">Services</Typography>
          <Typography variant="body1">Get Timeline: 1 Credit</Typography>
          <Typography variant="body1">Get Visa Cards: 1 Credit</Typography>
          <Box display="flex" alignItems="center">
            <Typography variant="body1">
              Buy
            </Typography>
            <CreditSelect />
            <Typography variant="body1">
              Credits
            </Typography>
          </Box>

          <Button variant="contained" color="primary" onClick={handleGetCredits} css={styles.dashboard.Credit.button}>
            Get credits
          </Button>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default CreditPage;