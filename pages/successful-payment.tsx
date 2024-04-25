import { Box, Typography, Button } from '@mui/material';
import DashboardLayout from '../src/DashboardLayout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const SuccessPage: React.FC = () => {
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