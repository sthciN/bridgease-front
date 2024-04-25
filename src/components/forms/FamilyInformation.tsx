import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ErrorSnackbar from '../ErrorSnackbar';
import { getStyles } from '../../utils/style';
import { maritalStatusType, militaryServiceStatusType } from '../../utils/consts';
import { getFamilyInformation, updateFamilyInformation } from '../../utils/api/profile';

const FamilyInformation = () => {
    const styles = getStyles();
    const [errorMessage, setErrorMessage] = useState('');
    const { t } = useTranslation();
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
    const maritalStatus = watch('maritalStatus') || '';
    const noOfDependentAccompanyingYou = watch('noOfDependentAccompanyingYou') || '';
    const militaryServiceStatus = watch('militaryServiceStatus') || '';
    const haveCriminalRecord = watch('haveCriminalRecord') || '';

    const onSubmit = async (data: any) => {
        try {
            const accessToken = localStorage.getItem('accessToken') || '';
            await updateFamilyInformation(accessToken, data);
        } catch (error) {
            setErrorMessage('Failed to update user');
        }
    };
    useEffect(() => {
        try {
            const accessToken = localStorage.getItem('accessToken') || '';
            getFamilyInformation(accessToken).then((familyInformation) => {
                for (const key in familyInformation) {
                    setValue(key, familyInformation[key]);
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
                    {t("family_information")}
                </Typography>
                <FormControl fullWidth css={styles.dashboard.form.input} >
                    <InputLabel id="marital-status-label">Marital Status</InputLabel>
                    <Select
                        labelId="marital-status-label"
                        label="Marital Status"
                        value={maritalStatus}
                        {...register('maritalStatus')}
                        error={Boolean(errors.maritalStatus)}
                    >
                        {maritalStatusType.map((item: string) => (
                            <MenuItem key={item} value={item}>
                                {t(`maritalStatus.${item}`)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth css={styles.dashboard.form.input} >
                    <TextField
                        type="number"
                        label="Number of Dependant Accompanying You"
                        value={noOfDependentAccompanyingYou}
                        {...register('noOfDependentAccompanyingYou')}
                        error={Boolean(errors.noOfDependentAccompanyingYou)}
                    >
                    </TextField>
                </FormControl>
                <FormControl fullWidth css={styles.dashboard.form.input} >
                    <InputLabel id="military-service-status-label">Military Service Status</InputLabel>
                    <Select
                        labelId="military-service-status-label"
                        label="Military Service Status"
                        value={militaryServiceStatus}
                        {...register('militaryServiceStatus')}
                        error={Boolean(errors.militaryServiceStatus)}
                    >
                        {militaryServiceStatusType.map((item: string) => (
                            <MenuItem key={item} value={item}>
                                {t(`militaryStatus.${item}`)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth css={styles.dashboard.form.input} >
                    <InputLabel id="has-criminal-record-label">Do you Have Criminal Record</InputLabel>
                    <Select
                        labelId="has-criminal-record-label"
                        label="Do you Have Criminal Record"
                        value={haveCriminalRecord}
                        {...register('haveCriminalRecord')}
                        error={Boolean(errors.haveCriminalRecord)}
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

export default FamilyInformation;