import { Container, Typography, TextField, Button, List, Grid, ListItemText, ListItemButton } from '@mui/material';
import { useState, useEffect } from 'react';
import DashboardLayout from '../src/DashboardLayout';
import ErrorSnackbar from '../src/components/ErrorSnackbar';
import { useForm } from 'react-hook-form';
import { getUser, updateUser, updatePassword } from '../src/utils/api/user';
import { getStyles } from '../src/utils/style';
import { useTranslation } from 'react-i18next';

const ProfilePage: React.FC = () => {
    const styles = getStyles();
    const { t } = useTranslation();
    const {
        register: registerProfile,
        handleSubmit: handleSubmitProfile,
        setValue: setValueProfile,
        formState: { errors: errorsProfile },
    } = useForm();

    const {
        register: registerPassword,
        handleSubmit: handleSubmitPassword,
        watch: watch,
        formState: { errors: errorsPassword },
    } = useForm();

    const [user, setUser] = useState({ firstName: '', lastName: '', email: '' });
    const [selectedSection, setSelectedSection] = useState('Personal Information');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        try {
            getUser().then((userData) => {
                setUser(userData);
                setValueProfile('firstName', userData.firstName);
                setValueProfile('lastName', userData.lastName);
            });
        } catch (error) {
            setErrorMessage(error.message);
        }

    }, [setValueProfile]);

    const handleErrorClose = () => {
        setErrorMessage('');
    };

    const onSubmitProfile = async (data: any) => {
        try {
            const updatedUser = await updateUser(data);
            setUser(updatedUser);
            setValueProfile('firstName', updatedUser.firstName);
            setValueProfile('lastName', updatedUser.lastName);
        } catch (error) {
            setErrorMessage('Failed to update user');
        }
    };

    const onSubmitPassword = async (data: any) => {
        try {
            const updatedUser = await updatePassword(data);
        } catch (error) {
            setErrorMessage('Failed to update password');
        }
    };

    return (
        <DashboardLayout>
            <Container maxWidth="lg">
                <Typography variant="h4" gutterBottom>
                    {t("profile")}
                </Typography>
                <Grid container spacing={8} css={styles.dashboard.gridContainer}>
                    <Grid item xs={12} md={6}>
                        <List component="nav" aria-label="profile sections">
                            <ListItemButton selected={selectedSection === 'Personal Information'} onClick={() => setSelectedSection('Personal Information')}>
                                <ListItemText primary={t('personal_information')} />
                            </ListItemButton>
                            <ListItemButton selected={selectedSection === 'Change Password'} onClick={() => setSelectedSection('Change Password')}>
                                <ListItemText primary={t('change_password')} />
                            </ListItemButton>
                        </List>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {selectedSection === 'Personal Information' && (
                            <form onSubmit={handleSubmitProfile(onSubmitProfile)}>
                                <Typography variant="h5" gutterBottom>
                                    {t("personal_information")}
                                </Typography>
                                <TextField
                                    label={t("first_name")}
                                    {...registerProfile('firstName', {
                                        required: t('first_name_required'),
                                        validate: (value) => {
                                            return !!value.trim();
                                        }
                                    })}
                                    error={Boolean(errorsProfile.firstName)}
                                    helperText={errorsProfile.firstName?.message}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label={t("last_name")}
                                    {...registerProfile('lastName', {
                                        required: t('last_name_required'),
                                        validate: (value) => {
                                            return !!value.trim();
                                        }
                                    })}
                                    error={Boolean(errorsProfile.lastName)}
                                    helperText={errorsProfile.lastName?.message}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label={t("email_address")}
                                    fullWidth
                                    disabled
                                    value={user.email}
                                    margin="normal"
                                />
                                <Button variant="contained" color="primary" type="submit">
                                    {t("save")}
                                </Button>
                            </form>
                        )}

                        {selectedSection === 'Change Password' && (
                            <form onSubmit={handleSubmitPassword(onSubmitPassword)}>
                                <Typography variant="h5" gutterBottom>
                                    {t("change_password")}
                                </Typography>
                                <TextField
                                    type="password"
                                    label={t("current_password")}
                                    {...registerPassword('currentPassword', { required: t('current_password_required') })}
                                    error={Boolean(errorsPassword.currentPassword)}
                                    helperText={errorsPassword.currentPassword?.message}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    type="password"
                                    label={t("new_password")}
                                    {...registerPassword('newPassword', {
                                        required: t('new_password_required'),
                                        minLength: { value: 8, message: t('new_password_min_char') },
                                    })}
                                    error={Boolean(errorsPassword.newPassword)}
                                    helperText={errorsPassword.newPassword?.message}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    type="password"
                                    label={t("confirm_new_password")}
                                    {...registerPassword('confirmNewPassword', {
                                        required: t('confirm_new_password_required'),
                                        validate: (value) => {
                                            return value === watch('newPassword') || t('confirm_password_match');
                                        }
                                    })}
                                    error={Boolean(errorsPassword.confirmNewPassword)}
                                    helperText={errorsPassword.confirmNewPassword?.message}
                                    fullWidth
                                    margin="normal"
                                />
                                <Button variant="contained" color="primary" type="submit">
                                    {t("save")}
                                </Button>
                            </form>
                        )}
                    </Grid>
                </Grid>
            </Container>
            {errorMessage && <ErrorSnackbar onClose={handleErrorClose} errorMessage={errorMessage} />}
        </DashboardLayout>
    );
};

export default ProfilePage;