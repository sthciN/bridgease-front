import { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, Container, Grid, LinearProgress, Skeleton, Typography } from '@mui/material';
import DashboardLayout from '../src/DashboardLayout';
import { getStyles } from '../src/utils/style';
import { useTranslation } from 'react-i18next';
import Link from '../src/components/Link';
import { getVisaCards, processVisaCard, reprocessVisaCard } from '../src/utils/api/visa';
import ErrorSnackbar from '../src/components/ErrorSnackbar';
import { useRouter } from 'next/router';


const ProfilePage: React.FC = () => {
    const styles = getStyles();
    const { t } = useTranslation();
    const [visas, setVisas] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();
    const [progress, setProgress] = useState(0);

    const handleRegenerateVisa = async () => {
        setVisas([]);
        setProgress(0);
        const accessToken = localStorage.getItem('accessToken') || '';
        reprocessVisaCard(accessToken)
        .then((data) => {
            console.log('??data??', data)
            if (data.visaPrograms) {
                setVisas(data.visaPrograms);
            } else {
                setErrorMessage('waiting');
                console.log('?waiting')
                // If no data is returned from the processVisaCard call, start the interval to poll the /user/visa-card route
                const intervalId = setInterval(() => {
                    setProgress((oldProgress) => {
                        if (oldProgress === 100) {
                            return 100;
                        }
                        const newProgress = oldProgress + 10;
                        return newProgress > 100 ? 100 : newProgress;
                    });
                    getVisaCards(accessToken)
                        .then((data) => {
                            setVisas(data);

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
    }

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken') || '';
        // Call the /user/process-visa-card route once when the component mounts
        processVisaCard(accessToken)
            .then((data) => {
                console.log('??data??', data)
                if (data.visaPrograms) {
                    setVisas(data.visaPrograms);
                } else {
                    setErrorMessage('waiting');
                    console.log('?waiting')
                    // If no data is returned from the processVisaCard call, start the interval to poll the /user/visa-card route
                    const intervalId = setInterval(() => {
                        setProgress((oldProgress) => {
                            if (oldProgress === 100) {
                                return 100;
                            }
                            const newProgress = oldProgress + 10;
                            return newProgress > 100 ? 100 : newProgress;
                        });
                        getVisaCards(accessToken)
                            .then((data) => {
                                setVisas(data);

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
    }, []);

    const handleErrorClose = () => {
        setErrorMessage('');
    };

    return (
        <DashboardLayout>
            <Grid container>
                <Grid item container xs={12} alignItems="center" justifyContent="end">
                    <Button
                        variant="contained"
                        color="primary"
                        css={styles.dashboard.reprocessVisaButton}
                        onClick={() => handleRegenerateVisa()}
                    >
                        Regenerate
                    </Button>
                </Grid>
                <Grid item container spacing={3}>
                    {!visas.length ?
                        (<Grid item sx={{ width: '100%' }}>
                            <LinearProgress variant="determinate" value={progress} />
                        </Grid>) : (<>
                            {visas.map((visa, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Link href={`/visa/${visa.doc_id}`} style={{ textDecoration: 'none' }}>
                                        <Card style={{ marginBottom: '20px' }}>
                                            <img
                                                src={visa.photo}
                                                alt={visa.title}
                                                style={{ width: '100%', height: 'auto' }}
                                            />
                                            <CardContent>
                                                <Typography variant="h5" component="div">
                                                    {visa.country}
                                                </Typography>
                                                <Typography variant="h6" color="text.secondary">
                                                    {visa.title}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {visa.short_summary}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </Grid>
                            ))}
                        </>
                        )
                    }
                </Grid>
            </Grid>
            {errorMessage && <ErrorSnackbar onClose={handleErrorClose} errorMessage={errorMessage} />}
        </DashboardLayout>
    );
};

export default ProfilePage;