import { Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { updatePassword } from "../../utils/api/user";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ErrorSnackbar from "../ErrorSnackbar";
import { useRouter } from "next/router";

const UpdatePassword: React.FC = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('');
    const {
        register: register,
        handleSubmit: handleSubmit,
        watch: watch,
        formState: { errors: errors },
    } = useForm();

    const handleErrorClose = () => {
        setErrorMessage('');
    };

    const onSubmit = async (data: any) => {
        try {
            await updatePassword(data);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('auth');
            router.push('/login');
        } catch (error) {
            setErrorMessage('Failed to update password');
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h5" gutterBottom>
                    {t("change_password")}
                </Typography>
                <TextField
                    type="password"
                    label={t("current_password")}
                    {...register('currentPassword', { required: t('current_password_required') })}
                    error={Boolean(errors.currentPassword)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    type="password"
                    label={t("new_password")}
                    {...register('newPassword', {
                        required: t('new_password_required'),
                        minLength: { value: 8, message: t('new_password_min_char') },
                    })}
                    error={Boolean(errors.newPassword)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    type="password"
                    label={t("confirm_new_password")}
                    {...register('confirmNewPassword', {
                        required: t('confirm_new_password_required'),
                        validate: (value) => {
                            return value === watch('newPassword') || t('confirm_password_match');
                        }
                    })}
                    error={Boolean(errors.confirmNewPassword)}
                    fullWidth
                    margin="normal"
                />
                <Button variant="contained" color="primary" type="submit">
                    {t("save")}
                </Button>
            </form>
            {errorMessage && <ErrorSnackbar onClose={handleErrorClose} errorMessage={errorMessage} />}
        </>
    );
};

export default UpdatePassword;