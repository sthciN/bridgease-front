import { Button, Chip, Divider, FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import DashboardLayout from '../../DashboardLayout';
import React, { useState } from 'react';
import ErrorSnackbar from '../ErrorSnackbar';
import { getStyles } from '../../utils/style';

const BasicInformation = () => {
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
                    <InputLabel id="country-of-citizenship-label">Country of Citizenship</InputLabel>
                    <Select
                        labelId="country-of-citizenship-label"
                        label="Country of citizenship"
                        value={countryOfCitizenship}
                        {...register('countryOfCitizenship')}
                        error={Boolean(errors.countryOfCitizenship)}
                    >
                        <MenuItem value="iran">Iran</MenuItem>
                        <MenuItem value="iraq">Iraq</MenuItem>
                        <MenuItem value="brazil">Brazil</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth css={styles.dashboard.form.input} >
                    <InputLabel id="country-of-residence-label">Country of Residence</InputLabel>
                    <Select
                        labelId="country-of-residence-label"
                        label="Country of Residence"
                        value={countryOfResidence}
                        {...register('countryOfResidence')}
                        error={Boolean(errors.countryOfResidence)}
                    >
                        <MenuItem value="iran">Iran</MenuItem>
                        <MenuItem value="iraq">Iraq</MenuItem>
                        <MenuItem value="brazil">Brazil</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth css={styles.dashboard.form.input} >
                    <InputLabel id="field-of-study-label">Field of Study</InputLabel>
                    <Select
                        labelId="field-of-study-label"
                        label="Field of Study"
                        value={fieldOfStudy}
                        {...register('fieldOfStudy')}
                        error={Boolean(errors.fieldOfStudy)}
                    >
                        <MenuItem value="mathematics">Mathematics</MenuItem>
                        <MenuItem value="software">Software</MenuItem>
                        <MenuItem value="dentistry">Dentistry</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth css={styles.dashboard.form.input} >
                    <InputLabel id="education-degree-label">Education Degree</InputLabel>
                    <Select
                        labelId="education-degree-label"
                        label="Education Degree"
                        value={educationDegree}
                        {...register('educationDegree')}
                        error={Boolean(errors.educationDegree)}
                    >
                        <MenuItem value="diploma">Diploma</MenuItem>
                        <MenuItem value="bachelor">Bachelor</MenuItem>
                        <MenuItem value="master">Master</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth css={styles.dashboard.form.input} >
                    <InputLabel id="working-industry-label">Working Industry</InputLabel>
                    <Select
                        labelId="working-industry-label"
                        label="Working Industry"
                        value={workingIndustry}
                        {...register('workingIndustry')}
                        error={Boolean(errors.workingIndustry)}
                    >
                        <MenuItem value="health">Health</MenuItem>
                        <MenuItem value="education">Education</MenuItem>
                        <MenuItem value="software">Software</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth css={styles.dashboard.form.input} >
                    <TextField
                        label="Years of Experience"
                        value={yearsOfExperience}
                        {...register('yearsOfExperience')}
                        error={Boolean(errors.yearsOfExperience)}
                    >
                    </TextField>
                </FormControl>
                <FormControl fullWidth css={styles.dashboard.form.input} >
                    <InputLabel id="language-ability-label">Language Ability</InputLabel>
                    <Select
                        labelId="language-ability-label"
                        label="Language Ability"
                        value={languageAbility}
                        {...register('languageAbility')}
                        error={Boolean(errors.languageAbility)}
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

export default BasicInformation;