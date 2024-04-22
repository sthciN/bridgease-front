import { Button, Chip, Divider, FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import DashboardLayout from '../../DashboardLayout';
import React, { useEffect, useState } from 'react';
import ErrorSnackbar from '../ErrorSnackbar';
import { getStyles } from '../../utils/style';
import { getFamilyInformation, updateFamilyInformation } from '../../utils/api/profile';

const FamilyInformation = () => {
    const styles = getStyles();
    const [errorMessage, setErrorMessage] = useState('');

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
    const maritalStatus = watch('maritalStatus') || '';
    const noOfDependentAccompanyingYou = watch('noOfDependentAccompanyingYou') || '';
    const healthStatus = watch('healthStatus') || '';
    const militaryServiceStatus = watch('militaryServiceStatus') || '';
    const haveCriminalRecord = watch('haveCriminalRecord') || '';

    const onSubmit = async (data: any) => {
        try {
            const updatedUserBasicInformation = await updateFamilyInformation(data);
            setValue('maritalStatus', updatedUserBasicInformation.maritalStatus);
            setValue('noOfDependentAccompanyingYou', updatedUserBasicInformation.noOfDependentAccompanyingYou);
            setValue('healthStatus', updatedUserBasicInformation.healthStatus);
            setValue('militaryServiceStatus', updatedUserBasicInformation.militaryServiceStatus);
            setValue('haveCriminalRecord', updatedUserBasicInformation.haveCriminalRecord);
        } catch (error) {
            setErrorMessage('Failed to update user');
        }
    };
    useEffect(() => {
        try {
            getFamilyInformation("10").then((familyInformation) => {
                setValue('maritalStatus', familyInformation.maritalStatus);
                setValue('noOfDependentAccompanyingYou', familyInformation.noOfDependentAccompanyingYou);
                setValue('healthStatus', familyInformation.healthStatus);
                setValue('militaryServiceStatus', familyInformation.militaryServiceStatus);
                setValue('haveCriminalRecord', familyInformation.haveCriminalRecord);
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
                <FormControl fullWidth css={styles.dashboard.form.input} >
                    <InputLabel id="marital-status-label">Marital Status</InputLabel>
                    <Select
                        labelId="marital-status-label"
                        label="Marital Status"
                        value={maritalStatus}
                        {...register('maritalStatus')}
                        error={Boolean(errors.maritalStatus)}
                    >
                        <MenuItem value="health">Health</MenuItem>
                        <MenuItem value="education">Education</MenuItem>
                        <MenuItem value="software">Software</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth css={styles.dashboard.form.input} >
                    <TextField
                        label="Number of Dependant Accompanying You"
                        value={noOfDependentAccompanyingYou}
                        {...register('noOfDependentAccompanyingYou')}
                        error={Boolean(errors.noOfDependentAccompanyingYou)}
                    >
                    </TextField>
                </FormControl>
                <FormControl fullWidth css={styles.dashboard.form.input} >
                    <InputLabel id="health-status-label">Health Status</InputLabel>
                    <Select
                        labelId="health-status-label"
                        label="Health Status"
                        value={healthStatus}
                        {...register('healthStatus')}
                        error={Boolean(errors.healthStatus)}
                    >
                        <MenuItem value="health">Health</MenuItem>
                        <MenuItem value="education">Education</MenuItem>
                        <MenuItem value="software">Software</MenuItem>
                    </Select>
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
                        <MenuItem value="health">Health</MenuItem>
                        <MenuItem value="education">Education</MenuItem>
                        <MenuItem value="software">Software</MenuItem>
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
                        <MenuItem value="health">Health</MenuItem>
                        <MenuItem value="education">Education</MenuItem>
                        <MenuItem value="software">Software</MenuItem>
                    </Select>
                </FormControl>
                <Button type="submit">Submit</Button>
            </form>
            {errorMessage && <ErrorSnackbar onClose={handleErrorClose} errorMessage={errorMessage} />}
        </>
    );
};

export default FamilyInformation;