import { Button, Chip, Divider, FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import DashboardLayout from '../../DashboardLayout';
import React, { useState } from 'react';
import ErrorSnackbar from '../ErrorSnackbar';
import { getStyles } from '../../utils/style';

const ClientInformation = () => {
    const styles = getStyles();
    const [errorMessage, setErrorMessage] = useState('');

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const preferredClimateTypes = watch('preferredClimateType') || [];
    const preferredLanguageTypes = watch('preferredLanguageTypes') || [];
    const preferredLivingCostRange = watch('preferredLivingCostRange') || [];
    const preferredIndustryTypes = watch('preferredIndustryType') || [];
    const countryOfResidence = watch('countryOfResidence') || '';
    const countryOfCitizenship = watch('countryOfCitizenship') || '';
    const fieldOfStudy = watch('fieldOfStudy') || '';
    const educationDegree = watch('educationDegree') || '';
    const workingIndustry = watch('workingIndustry') || '';
    const yearsOfExperience = watch('yearsOfExperience') || '';
    const languageAbility = watch('languageAbility') || '';
    const investmentCapitalAvailableRange = watch('investmentCapitalAvailableRange') || '';
    const maritalStatus = watch('maritalStatus') || '';
    const noOfDependentAccompanyingYou = watch('noOfDependentAccompanyingYou') || '';
    const isEntrepreneuer = watch('isEntrepreneuer') || 'no';
    const healthStatus = watch('healthStatus') || '';
    const militaryServiceStatus = watch('militaryServiceStatus') || '';
    const haveCriminalRecord = watch('haveCriminalRecord') || '';

    const onSubmit = (data) => {
        console.log(data);
    };

    const handleErrorClose = () => {
        setErrorMessage('');
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl fullWidth css={styles.dashboard.form.input} >
                    <TextField
                        value={investmentCapitalAvailableRange}
                        label="Investment Capital Available Range"
                        {...register('investmentCapitalAvailableRange')}
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
                <Button type="submit">Submit</Button>
            </form>
            {errorMessage && <ErrorSnackbar onClose={handleErrorClose} errorMessage={errorMessage} />}
        </>
    );
};

export default ClientInformation;