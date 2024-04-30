import { useEffect, useState } from 'react';
import DashboardLayout from '../../src/DashboardLayout';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { getStyles } from '../../src/utils/style';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import ErrorSnackbar from '../../src/components/ErrorSnackbar';
import { processTimeline, fetchTimeline, getTimeline, getVisaProgram } from '../../src/utils/api/visa';
import ResponsiveTimeline from '../../src/components/VisaTimeline';
import Link from '../../src/components/Link';
import { getCredit } from '../../src/utils/api/credit';
import EmptyTimeline from '../../src/components/EmptyTimeline';
import ResponsiveDialog from '../../src/components/Dialogue';
import { access } from 'fs';

const VisaProgram: React.FC = () => {
    const styles = getStyles();
    const { t } = useTranslation();
    const router = useRouter();
    const { id } = router.query;
    const [timelineData, setTimelineData] = useState([]);
    const [visa, setVisa] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [dialogueMessage, setDialogueMessage] = useState('');

    const handleErrorClose = () => {
        setErrorMessage('');
    };
    const handleGetTimeline = async () => {
        const creditStatus = await getCredit('10')
        const { credits } = creditStatus;
        if (!credits) {
            router.push('/credit');
        }
        else {
            setDialogueMessage(t('proceed_with_1_credit'));
        }
    };

    const handleProceedTimeline = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken') || '';
            console.log('ID', id);

            processTimeline(accessToken, id?.toString())
                .then((data) => {
                    console.log('??data??', data)
                    if (data.timeline) {
                        setTimelineData(data.timeline);
                    } else {
                        setErrorMessage('waiting');
                        console.log('?waiting')
                        // If no data is returned from the processVisaCard call, start the interval to poll the /user/visa-card route
                        const intervalId = setInterval(() => {
                            fetchTimeline(accessToken, id?.toString())
                                .then((data) => {
                                    setTimelineData(data);

                                    // Check if visaCards is not null
                                    if (data !== null) {
                                        // Clear the interval
                                        clearInterval(intervalId);
                                    }
                                })
                                .catch((error) => {
                                    console.error(error);
                                });
                        }, 2000);

                        // Clear the interval when the component unmounts
                        return () => {
                            clearInterval(intervalId);
                        };
                    }
                })
                .catch((error) => {
                    console.error(error);
                });



            // const timeline = await processTimeline(accessToken, id?.toString());

            // setTimelineData(timeline);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (!id) {
            return;
        }
        const fetchVisa = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken') || '';
                const visaData = await getVisaProgram(accessToken, id);
                console.log('VISA', visaData);
                setVisa(visaData);

            } catch (error) {
                setErrorMessage(error.message);
            }
        };

        const fetchUserTimeline = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken') || '';
                const timeline = await getTimeline(accessToken, id?.toString());
                setTimelineData(timeline);
                console.log('TIMELINE', timeline);

            } catch (error) {
                setErrorMessage(error.message);
            }
        };

        fetchVisa();
        fetchUserTimeline();
    }, [id]);

    return (
        <DashboardLayout>
            <Grid container>
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
                                {visa.short_summary}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <img src={visa.photo} alt={visa.title} style={{ width: '100%', height: 'auto' }} />
                        </Grid>
                    </Grid>
                )}
                <Grid
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
                    {!timelineData.length ? (
                        <>
                            <Box
                                sx={{
                                    filter: 'blur(8px)', // Apply blur effect conditionally
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                }}
                            >
                                <EmptyTimeline />
                            </Box>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                    position: 'absolute',
                                }}
                                onClick={handleGetTimeline}
                            >
                                {t('get_timeline')}
                            </Button>
                        </>
                    ) : <ResponsiveTimeline timelineData={timelineData} />}
                </Grid>
            </Grid>
            {errorMessage && <ErrorSnackbar onClose={handleErrorClose} errorMessage={errorMessage} />}
            {dialogueMessage && <ResponsiveDialog
                onProceed={handleProceedTimeline}
                dialogueMessage={dialogueMessage}
                onClose={() => setDialogueMessage('')}
            />}
        </DashboardLayout>
    );
};

export default VisaProgram;