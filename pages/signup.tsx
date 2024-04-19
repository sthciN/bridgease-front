import { ChangeEvent, FormEvent, useState } from 'react';
import { Button, TextField, Container, Typography, Grid } from '@mui/material';
import Layout from '../src/Layout';
import { useTranslation } from 'react-i18next';
import Link from '../src/Link';
import { getStyles } from '../src/style';

interface FormData {
    email: string;
    password: string;
}

const Signup: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
    const { t, i18n } = useTranslation();
    const styles = getStyles();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Handle form submission here
        console.log(formData);
    };

    return (
        <Layout>
            <Container maxWidth="lg">
                <Grid container spacing={8} justifyContent="space-between" alignItems="center">
                    <Grid item xs={12} md={6}>
                        <img src="/login.jpg" alt="Description" style={{ width: '100%' }} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" align="center" gutterBottom>
                            {t('signup')}
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label={t('email_address')}
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label={t('password')}
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                css={styles.button}
                            >
                                {t('signup')}
                            </Button>
                        </form>
                        <Typography variant="body2" align="center">
                            {t('have_account')}{' '}
                            <Link href="/login" locale={i18n.language} color="primary">
                                {t('login')}
                            </Link>
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    );
}

export default Signup;