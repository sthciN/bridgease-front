import { useEffect, useState } from 'react';
import DashboardLayout from '../../src/DashboardLayout';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { getStyles } from '../../src/style';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import ErrorSnackbar from '../../src/components/ErrorSnackbar';
import { getVisaProgram } from '../../src/utils/api/visa';
import VisaTimeline from '../../src/components/VisaTimeline';
import CustomizedSteppers from '../../src/components/Test';

const VisaProgram: React.FC = () => {
    const styles = getStyles();
    const { t } = useTranslation();
    const router = useRouter();
    const { id } = router.query;

    const [visa, setVisa] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleErrorClose = () => {
        setErrorMessage('');
    };

    useEffect(() => {
        const fetchVisa = async () => {
            try {
                // const response = await fetch(`/api/visa/${id}`);
                // if (!response.ok) {
                //   throw new Error('Failed to fetch visa');
                // }
                // const visaData = await response.json();
                await getVisaProgram(id).then((visaData) => {
                    setVisa(visaData);
                })
            } catch (error) {
                setErrorMessage(error.message);
            }
        };

        fetchVisa();
    }, [id]);

    return (
        <DashboardLayout>
            <Container maxWidth="lg">
                {visa && (
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8}>
                            <Typography variant="h4" gutterBottom>
                                {visa.title}
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                                {visa.country}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {visa.description}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <img src={visa.photo} alt={visa.title} style={{ width: '100%', height: 'auto' }} />
                        </Grid>
                    </Grid>
                )}
                <Box
                    css={styles.dashboard.BoxTimelineWrapper}
                    sx={{
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <Box
                        sx={{
                            filter: 'blur(8px)', // Apply blur effect
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        <VisaTimeline />
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            position: 'absolute',
                        }}
                    >
                        Button Text
                    </Button>
                </Box>
                {/* <VisaTimeline /> */}
            </Container>
            {errorMessage && <ErrorSnackbar onClose={handleErrorClose} errorMessage={errorMessage} />}
        </DashboardLayout>
    );
};

export default VisaProgram;