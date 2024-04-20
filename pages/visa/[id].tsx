import { useEffect, useState } from 'react';
import DashboardLayout from '../../src/DashboardLayout';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { getStyles } from '../../src/utils/style';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import ErrorSnackbar from '../../src/components/ErrorSnackbar';
import { generateTimeline, getTimeline, getVisaProgram } from '../../src/utils/api/visa';
import ResponsiveTimeline from '../../src/components/VisaTimeline';
import Link from '../../src/components/Link';
import { getCredit } from '../../src/utils/api/credit';
import EmptyTimeline from '../../src/components/EmptyTimeline';
import ResponsiveDialog from '../../src/components/Dialogue';

const VisaProgram: React.FC = () => {
    const styles = getStyles();
    const { t } = useTranslation();

    const router = useRouter();
    const { id } = router.query;
    const [timelineData, setTimelineData] = useState(null);
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
            setDialogueMessage('You will use 1 credit to get the timeline. Do you want to proceed?');
        }
    };

    const handleProceedTimeline = async () => {
        try {
            const timeline = await generateTimeline('10');
            setTimelineData(timeline);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchVisa = async () => {
            try {
                const visaData = await getVisaProgram(id);
                setVisa(visaData);

            } catch (error) {
                setErrorMessage(error.message);
            }
        };

        const fetchTimeline = async () => {
            try {
                const timeline = await getTimeline();
                setTimelineData(timeline);
                console.log('TIMELINE', timeline);

            } catch (error) {
                setErrorMessage(error.message);
            }
        };

        fetchVisa();
        fetchTimeline();
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
                    {!timelineData ? (
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
                                Get Timeline
                            </Button>
                        </>
                    ) : <ResponsiveTimeline timelineData={timelineData} />}
                </Box>
            </Container>
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