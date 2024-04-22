import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import ErrorSnackbar from '../ErrorSnackbar';
import { getStyles } from '../../utils/style';
import { getPreferenceInformation, updatePreferenceInformation } from '../../utils/api/profile';

const ClientInformation = () => {
    const styles = getStyles();
    const [errorMessage, setErrorMessage] = useState('');

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
    const preferredClimateTypes = watch('preferredClimateType') || [];
    const preferredLanguageTypes = watch('preferredLanguageTypes') || [];
    const preferredLivingCostRange = watch('preferredLivingCostRange') || '';
    const preferredIndustryTypes = watch('preferredIndustryType') || [];

    const onSubmit = async (data: any) => {
        try {
            const updatedPreferenceInformation = await updatePreferenceInformation(data);
            setValue('preferredClimateTypes', updatedPreferenceInformation.preferredClimateTypes);
            setValue('preferredLanguageTypes', updatedPreferenceInformation.preferredLanguageTypes);
            setValue('preferredLivingCostRange', updatedPreferenceInformation.preferredLivingCostRange);
            setValue('preferredIndustryTypes', updatedPreferenceInformation.preferredIndustryTypes);
        } catch (error) {
            setErrorMessage('Failed to update user');
        }
    };
    useEffect(() => {
        try {
            console.log('preferenceIformation', preferredClimateTypes);
            getPreferenceInformation("10").then((preferenceIformation) => {
                setValue('preferredClimateTypes', preferenceIformation.preferredClimateTypes);
                setValue('preferredLanguageTypes', preferenceIformation.preferredLanguageTypes);
                setValue('preferredLivingCostRange', preferenceIformation.preferredLivingCostRange);
                setValue('preferredIndustryTypes', preferenceIformation.preferredIndustryTypes);
                console.log('NEXT preferenceIformation', preferredClimateTypes);
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
                <FormControl fullWidth css={styles.dashboard.form.input}>
                    <InputLabel id="preferred-climate-multiple-label">Preferred Climate</InputLabel>
                    <Select
                        labelId="preferred-climate-multiple-label"
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
                    <InputLabel id="prefererd-language-multiple-label">Preferred Language</InputLabel>
                    <Select
                        labelId="preferred-language-multiple-label"
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