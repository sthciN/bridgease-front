import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import ErrorSnackbar from '../ErrorSnackbar';
import { getStyles } from '../../utils/style';
import { getBusinessInformation, updateBusinessInformation } from '../../utils/api/profile';

const ClientInformation = () => {
    const styles = getStyles();
    const [errorMessage, setErrorMessage] = useState('');

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
    const investmentCapitalAvailableRange = watch('investmentCapitalAvailableRange') || '';
    const isEntrepreneuer = watch('isEntrepreneuer') || 'no';

    const onSubmit = async (data: any) => {
        try {
            const updatedUserBasicInformation = await updateBusinessInformation(data);
            // setValue('firstName', updatedUserBasicInformation.firstName);
            setValue('investmentCapitalAvailableRange', updatedUserBasicInformation.investmentCapitalAvailableRange);
            setValue('isEntrepreneuer', updatedUserBasicInformation.isEntrepreneuer);
        } catch (error) {
            setErrorMessage('Failed to update user');
        }
    };
    useEffect(() => {
        try {
            getBusinessInformation("10").then((businessIformation) => {
                setValue('investmentCapitalAvailableRange', businessIformation.investmentCapitalAvailableRange);
                setValue('isEntrepreneuer', businessIformation.isEntrepreneuer);
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