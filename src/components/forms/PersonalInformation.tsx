import { Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { getUser, updateUser } from "../../utils/api/user";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ErrorSnackbar from "../ErrorSnackbar";


const PersonalInformation: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [user, setUser] = useState({ firstName: '', lastName: '', email: '' });
    const { t } = useTranslation();
    console.log('UUUSSSEEERRR', user);
    const {
        register: register,
        handleSubmit: handleSubmit,
        setValue: setValue,
        formState: { errors: errors },
    } = useForm();

    const onSubmitProfile = async (data: any) => {
        try {
            const updatedUser = await updateUser(data);
            setUser(updatedUser);
            setValue('firstName', updatedUser.firstName);
            setValue('lastName', updatedUser.lastName);
        } catch (error) {
            setErrorMessage('Failed to update user');
        }
    };
    useEffect(() => {
        try {
            getUser("10").then((userData) => {
                setUser(userData);
                setValue('firstName', userData.firstName);
                setValue('lastName', userData.lastName);
            });
        } catch (error) {
            setErrorMessage(error.message);
        }

    }, [setValue]);
    
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
                    {...register('firstName', {
                        required: t('first_name_required'),
                        validate: (value) => {
                            return !!value.trim();
                        }
                    })}
                    error={Boolean(errors.firstName)}
                    // helperText={errors.firstName?.message}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label={t("last_name")}
                    {...register('lastName', {
                        required: t('last_name_required'),
                        validate: (value) => {
                            return !!value.trim();
                        }
                    })}
                    error={Boolean(errors.lastName)}
                    // helperText={errors.lastName?.message}
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
            {errorMessage && <ErrorSnackbar onClose={handleErrorClose} errorMessage={errorMessage} />}
        </>
    )
}

export default PersonalInformation;
