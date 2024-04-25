import { Box, Typography, Button } from '@mui/material';
import DashboardLayout from '../src/DashboardLayout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const CancelledPage: React.FC = () => {
  const router = useRouter();
    
  useEffect(() => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
          router.push('/login');
      }
  }, []);
  
  return (
    <DashboardLayout>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          textAlign: 'center',
          p: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Your purchase was unsuccessful
        </Typography>
        <Typography variant="body1" gutterBottom>
          We're sorry, but we were unable to process your payment. Please try again.
        </Typography>
        <Button variant="contained" color="primary" onClick={() => {/* Redirect to payment page */}}>
          Try Again
        </Button>
      </Box>
    </DashboardLayout>
  );
};

export default CancelledPage;