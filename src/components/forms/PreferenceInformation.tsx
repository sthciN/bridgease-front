import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import ErrorSnackbar from '../ErrorSnackbar';
import { getStyles } from '../../utils/style';
import { getPreferenceInformation, updatePreferenceInformation } from '../../utils/api/profile';
import { climateType, industries, languages } from '../../utils/consts';
import { useTranslation } from 'react-i18next';

const ClientInformation = () => {
    const styles = getStyles();
    const [errorMessage, setErrorMessage] = useState('');
    const { t } = useTranslation();
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
    const preferredClimate = watch('preferredClimate') || [];
    const preferredLanguage = watch('preferredLanguage') || [];
    const preferredLivingCostRange = watch('preferredLivingCostRange') || '';
    const preferredIndustry = watch('preferredIndustry') || '';

    const onSubmit = async (data: any) => {
        try {
            const accessToken = localStorage.getItem('accessToken') || '';
            await updatePreferenceInformation(accessToken, data);
        } catch (error) {
            setErrorMessage('Failed to update user');
        }
    };
    useEffect(() => {
        try {
            const accessToken = localStorage.getItem('accessToken') || '';
            getPreferenceInformation(accessToken).then((preferenceIformation) => {
                for (const key in preferenceIformation) {
                    setValue(key, preferenceIformation[key]);
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
                    {t("immigration_preferences")}
                </Typography>
                <FormControl fullWidth css={styles.dashboard.form.input}>
                    <InputLabel id="preferred-climate-multiple-label">Preferred Climate</InputLabel>
                    <Select
                        labelId="preferred-climate-multiple-label"
                        label="Preferred Climate"
                        value={preferredClimate}
                        {...register('preferredClimate')}
                        error={Boolean(errors.preferredClimate)}
                        multiple
                    >
                        {climateType.map((item: string) => (
                            <MenuItem key={item} value={item}>
                                {t(`climateType.${item}`)}
                            </MenuItem>
                        ))}

                    </Select>
                </FormControl>
                <FormControl fullWidth css={styles.dashboard.form.input} >
                    <InputLabel id="prefererd-language-multiple-label">Preferred Language</InputLabel>
                    <Select
                        labelId="preferred-language-multiple-label"
                        label="Preferred Language"
                        value={preferredLanguage}
                        {...register('preferredLanguage')}
                        error={Boolean(errors.preferredLanguage)}
                        multiple
                    >
                        {languages.map((item: string) => (
                            <MenuItem key={item} value={item}>
                                {t(`languageAbility.languages.${item}`)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth css={styles.dashboard.form.input} >
                    <TextField
                        value={preferredLivingCostRange}
                        label="Preferred Living Cost Range"
                        {...register('preferredLivingCostRange', {
                            maxLength: {
                                value: 100,
                                message: t('input_is_too_long'),
                            },
                        })}
                        error={Boolean(errors.preferredLivingCostRange)}
                    >
                    </TextField>
                </FormControl>
                <FormControl fullWidth css={styles.dashboard.form.input} >
                    <InputLabel id="prefered-industry-multiple-label">Preferred Industry</InputLabel>
                    <Select
                        labelId="prefered-industry-multiple-label"
                        label="Preferred Industry"
                        value={preferredIndustry}
                        {...register('preferredIndustry')}
                        error={Boolean(errors.preferredIndustry)}
                    >
                        {industries.map((item: string) => (
                            <MenuItem key={item} value={item}>
                                {t(`industries.${item}`)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button type="submit">Submit</Button>
            </form>
            {errorMessage && <ErrorSnackbar onClose={handleErrorClose} errorMessage={errorMessage} />}
        </>
    );
};

export default ClientInformation;