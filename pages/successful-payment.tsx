import { Box, Typography, Button } from '@mui/material';
import DashboardLayout from '../src/DashboardLayout';

const SuccessPage: React.FC = () => {

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
                    Thank you for your purchase!
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Your order has been placed successfully and will be delivered soon.
                </Typography>
            </Box>
        </DashboardLayout>
    );
};

export default SuccessPage;