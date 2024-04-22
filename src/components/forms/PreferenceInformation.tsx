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
                <FormControl fullWidth css={styles.dashboard.form.input}>
                    <InputLabel id="prefered-climate-multiple-label">Preferred Climate</InputLabel>
                    <Select
                        labelId="prefered-climate-multiple-label"
                        label="Preferred Climate"
                        value={preferredClimateTypes}
                        {...register('preferredClimateType')}
                        error={Boolean(errors.preferredClimateType)}
                        multiple
                    >
                        <MenuItem value="hot">Hot</MenuItem>
                        <MenuItem value="cold">Cold</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth css={styles.dashboard.form.input} >
                    <InputLabel id="prefered-language-multiple-label">Preferred Language</InputLabel>
                    <Select
                        labelId="prefered-language-multiple-label"
                        label="Preferred Language"
                        value={preferredLanguageTypes}
                        {...register('preferredLanguageTypes')}
                        error={Boolean(errors.preferredLanguageTypes)}
                        multiple
                    >
                        <MenuItem value="english">English</MenuItem>
                        <MenuItem value="spanish">Spanish</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth css={styles.dashboard.form.input} >
                    <TextField
                        value={preferredLivingCostRange}
                        label="Preferred Living Cost Range"
                        {...register('preferred_living_cost_range')}
                        error={Boolean(errors.preferred_living_cost_range)}
                    >
                    </TextField>
                </FormControl>
                <FormControl fullWidth css={styles.dashboard.form.input} >
                    <InputLabel id="prefered-industry-multiple-label">Preferred Industry</InputLabel>
                    <Select
                        labelId="prefered-industry-multiple-label"
                        label="Preferred Industry"
                        value={preferredIndustryTypes}
                        {...register('preferredIndustryType')}
                        error={Boolean(errors.preferredIndustryType)}
                        multiple
                    >
                        <MenuItem value="english">English</MenuItem>
                        <MenuItem value="spanish">Spanish</MenuItem>
                    </Select>
                </FormControl>
                <Button type="submit">Submit</Button>
            </form>
            {errorMessage && <ErrorSnackbar onClose={handleErrorClose} errorMessage={errorMessage} />}
        </>
    );
};

export default ClientInformation;