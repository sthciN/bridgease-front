import { Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { getUserPersonalInfo, updateUserPersonalInfo } from "../../utils/api/user";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ErrorSnackbar from "../ErrorSnackbar";
import { getStyles } from "../../utils/style";
import { useRouter } from "next/router";


const PersonalInformation: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const styles = getStyles();
    const router = useRouter();
    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm();

    const firstName = watch('firstName') || '';
    const lastName = watch('lastName') || '';
    const bornDate = watch('bornDate') || '';
    const phone = watch('phone') || '';
    const email = watch('email') || '';

    const onSubmitProfile = async (data: any) => {
        try {
            const accessToken = localStorage.getItem('accessToken') || '';
            await updateUserPersonalInfo(accessToken, data);
        } catch (error) {
            setErrorMessage('Failed to update user');
        }
    };
    useEffect(() => {
        try {
            const accessToken = localStorage.getItem('accessToken') || '';
            if (!accessToken) {
                router.push('/login');
            } else {
                const getUserInfo = async (accessToken: string) => {
                    const userData = await getUserPersonalInfo(accessToken);
                    for (const key in userData) {
                        setValue(key, userData[key]);
                    }
                }
                getUserInfo(accessToken);
            }
        } catch (error) {
            setErrorMessage(error.message);
        }

    }, []);

    const handleErrorClose = () => {
        setErrorMessage('');
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmitProfile)}>
                <Typography variant="h5" gutterBottom>
                    {t("personal_information")}
                </Typography>
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
                <TextField
                    label={t("born_date")}
                    type="date"
                    value={bornDate}
                    {...register('bornDate')}
                    error={Boolean(errors.bornDate)}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    label={t("phone")}
                    value={phone}
                    {...register('phone', {
                        pattern: {
                            value: /^[0-9]+$/,
                            message: t('invalid_phone'),
                        },
                        maxLength: {
                            value: 250,
                            message: t('input_is_too_long'),
                        },
                    })}
                    error={Boolean(errors.phone)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label={t("email_address")}
                    fullWidth
                    disabled
                    value={email}
                    margin="normal"
                />
                <Button
                    css={styles.dashboard.form.submitButton}
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    {t('save')}
                </Button>
            </form>
            {errorMessage && <ErrorSnackbar onClose={handleErrorClose} errorMessage={errorMessage} />}
        </>
    )
}

export default PersonalInformation;
