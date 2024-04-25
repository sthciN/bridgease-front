import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Button, TextField, Container, Typography, Link as MuiLink, Grid } from '@mui/material';
import Link from 'next/link';
import Layout from '../src/Layout';
import { useDispatch } from 'react-redux';
import { setUser, setLoggedIn } from '../src/store/authSlice';
import { useTranslation } from 'react-i18next';
import { loginUser } from '../src/utils/api/auth';
import { getStyles } from '../src/utils/style';
import { useRouter } from 'next/router';

interface FormData {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
    const dispatch = useDispatch();
    const styles = getStyles();
    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('auth');
            router.reload();
        }
    }, [router.isReady])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        // Handle form submission here
        console.log(formData);

        // Replace this with your actual login logic
        const user = await loginUser(formData.email, formData.password);

        if (user) {
            dispatch(setUser(user));
            dispatch(setLoggedIn(true));
            localStorage.setItem('auth', JSON.stringify({ user, loggedIn: true }));
            router.push('/visa-card');
        }
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
                            {t('login')}
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
                                {t('login')}
                            </Button>
                        </form>
                        <Typography variant="body2" align="center">
                            {t('no_account')}{' '}
                            <Link href="/signup" locale={i18n.language} color="primary">
                                {t('signup')}
                            </Link>
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    );
}

export default Login;