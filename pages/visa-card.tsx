import { useEffect, useState } from 'react';
import { Card, CardContent, Container, Grid, Typography } from '@mui/material';
import DashboardLayout from '../src/DashboardLayout';
import { getStyles } from '../src/utils/style';
import { useTranslation } from 'react-i18next';
import Link from '../src/components/Link';
import { getVisas } from '../src/utils/api/visa';
import ErrorSnackbar from '../src/components/ErrorSnackbar';
import { useRouter } from 'next/router';


const ProfilePage: React.FC = () => {
    const styles = getStyles();
    const { t } = useTranslation();
    const [visas, setVisas] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchVisas = async () => {
            try {

                await getVisas().then((visaData) => {
                    setVisas(visaData);
                });
            } catch (error) {
                setErrorMessage(error.message);
            }
        };

        fetchVisas();
    }, []);

    const handleErrorClose = () => {
        setErrorMessage('');
    };

    return (
        <DashboardLayout>
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    {visas.map((visa, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Link href={`/visa/${visa.id}`} style={{ textDecoration: 'none' }}>
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
                                            {visa.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            {errorMessage && <ErrorSnackbar onClose={handleErrorClose} errorMessage={errorMessage} />}
        </DashboardLayout>
    );
};

export default ProfilePage;