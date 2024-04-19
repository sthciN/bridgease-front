import { Box, Typography, Button } from '@mui/material';
import DashboardLayout from '../src/DashboardLayout';

const CancelledPage: React.FC = () => {

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