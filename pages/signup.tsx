import { ChangeEvent, FormEvent, useState } from 'react';
import { Button, TextField, Container, Typography, Grid, Select, MenuItem, InputLabel, FormControl, FormHelperText } from '@mui/material';
import Layout from '../src/Layout';
import { useTranslation } from 'react-i18next';
import Link from '../src/components/Link';
import { getStyles } from '../src/utils/style';
import { useDispatch } from 'react-redux';
import { setUser, setLoggedIn } from '../src/store/authSlice';
import { useRouter } from 'next/router';
import { getUser, signup } from '../src/utils/api/user';
import ErrorSnackbar from '../src/components/ErrorSnackbar';
import { website_languages } from '../src/utils/consts';
import { Form, useForm } from 'react-hook-form';

interface FormData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    language: string;
}

const Signup: React.FC = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { t, i18n } = useTranslation();
    const [errorMessage, setErrorMessage] = useState('');
    const styles = getStyles();
    const dispatch = useDispatch();
    const router = useRouter();

    const email = watch('email') || '';
    const password = watch('password') || '';
    const firstName = watch('firstName') || '';
    const lastName = watch('lastName') || '';
    const language = watch('language') || '';


    const onSubmit = async (data: any) => {

        try {

            const accessToken = await signup(data);

            if (accessToken) {
                const user = await getUser(accessToken);

                dispatch(setUser(user));
                dispatch(setLoggedIn(true));
                localStorage.setItem('auth', JSON.stringify({ user, loggedIn: true }));

                router.push('/profile');
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const handleErrorClose = () => {
        setErrorMessage('');
    };

    return (
        <Layout>
            <Grid container spacing={8} justifyContent="space-between" alignItems="center">
                <Grid item xs={12} md={6}>
                    <img src="/login.jpg" alt="Description" style={{ width: '100%' }} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Typography variant="h4" align="center" gutterBottom>
                            {t('signup')}
                        </Typography>
                        <FormControl fullWidth css={styles.dashboard.form.signupInput}>
                            <TextField
                                variant='outlined'
                                margin='normal'
                                required
                                type='email'
                                value={email}
                                label={t('email_address')}
                                {...register('email', {
                                    maxLength: {
                                        value: 100,
                                        message: t('input_is_too_long'),
                                    },
                                })}
                                error={Boolean(errors.email)}
                            />
                        </FormControl>
                        <FormControl fullWidth css={styles.dashboard.form.signupInput} >
                            <TextField
                                variant='outlined'
                                margin='normal'
                                required
                                type='password'
                                value={password}
                                label={t('password')}
                                {...register('password', {
                                    maxLength: {
                                        value: 100,
                                        message: t('input_is_too_long'),
                                    },
                                })}
                                error={Boolean(errors.password)}
                            />
                        </FormControl>
                        <FormControl fullWidth css={styles.dashboard.form.signupInput} >
                            <TextField
                                label={t("first_name")}
                                value={firstName}
                                {...register('firstName', {
                                    validate: (value) => {
                                        return !!value.trim();
                                    },
                                    maxLength: {
                                        value: 100,
                                        message: t('input_is_too_long'),
                                    },
                                })}
                                error={Boolean(errors.firstName)}
                                fullWidth
                                margin="normal"
                            />
                        </FormControl>
                        <FormControl fullWidth css={styles.dashboard.form.signupInput} >
                            <TextField
                                label={t("last_name")}
                                value={lastName}
                                {...register('lastName', {
                                    validate: (value) => {
                                        return !!value.trim();
                                    },
                                    maxLength: {
                                        value: 250,
                                        message: t('input_is_too_long'),
                                    },
                                })}
                                error={Boolean(errors.lastName)}
                                fullWidth
                                margin="normal"
                            />
                        </FormControl>
                        <FormControl fullWidth css={styles.dashboard.form.signupInput} >
                            <InputLabel id="language-select-label">{t('language')}</InputLabel>
                            <Select
                                labelId="language-select-label"
                                label={t('language')}
                                value={language}
                                required
                                {...register('language')}
                                error={Boolean(errors.language)}
                                aria-describedby="language-helper-text"
                            >
                                {website_languages.map((item: string) => (
                                    <MenuItem key={item} value={item}>
                                        {t(`website_languages.${item}`)}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText id="language-helper-text">{t('your_dashboard_will_be_in_this_language_and_english')}</FormHelperText>
                        </FormControl>
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
            {errorMessage && <ErrorSnackbar onClose={handleErrorClose} errorMessage={errorMessage} />}
        </Layout>
    );
}

export default Signup;