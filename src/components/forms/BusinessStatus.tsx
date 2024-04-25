import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import ErrorSnackbar from '../ErrorSnackbar';
import { getStyles } from '../../utils/style';
import { getBusinessInformation, updateBusinessInformation } from '../../utils/api/profile';
import { useTranslation } from 'react-i18next';

const ClientInformation = () => {
    const styles = getStyles();
    const [errorMessage, setErrorMessage] = useState('');
    const { t } = useTranslation();
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
    const investmentCapitalAvailableRange = watch('investmentCapitalAvailableRange') || '';
    const isEntrepreneuer = watch('isEntrepreneuer') || 'no';

    const onSubmit = async (data: any) => {
        try {
            const accessToken = localStorage.getItem('accessToken') || '';
            await updateBusinessInformation(accessToken, data);
        } catch (error) {
            setErrorMessage('Failed to update user');
        }
    };
    useEffect(() => {
        try {
            const accessToken = localStorage.getItem('accessToken') || '';
            getBusinessInformation(accessToken).then((businessIformation) => {
                for (const key in businessIformation) {
                    setValue(key, businessIformation[key]);
                }
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
            <form onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h5" gutterBottom>
                    {t("business_status")}
                </Typography>
                <FormControl fullWidth css={styles.dashboard.form.input} >
                    <TextField
                        value={investmentCapitalAvailableRange}
                        label="Investment Capital Available Range"
                        {...register('investmentCapitalAvailableRange', {
                            maxLength: {
                                value: 100,
                                message: t('input_is_too_long'),
                            },
                        })}
                        error={Boolean(errors.investmentCapitalAvailableRange)}
                    >
                    </TextField>
                </FormControl>
                <FormControl fullWidth css={styles.dashboard.form.input} >
                    <InputLabel id="is-entrepreneuer-label">Are you an Entrepreneuer?</InputLabel>
                    <Select
                        labelId="is-entrepreneuer-label"
                        label="Are you an Entrepreneuer?"
                        value={isEntrepreneuer}
                        {...register('isEntrepreneuer')}
                        error={Boolean(errors.isEntrepreneuer)}
                    >
                        <MenuItem value="yes">Yes</MenuItem>
                        <MenuItem value="no">No</MenuItem>
                    </Select>
                </FormControl>
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
    );
};

export default ClientInformation;