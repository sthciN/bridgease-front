import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useFieldArray, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import ErrorSnackbar from '../ErrorSnackbar';
import { getStyles } from '../../utils/style';
import { getBasicInformation, updateBasicInformation } from '../../utils/api/profile';
import { useTranslation } from 'react-i18next';
import { industries, educationLevels, languageSkils, languages, countries } from '../../utils/consts';

const BasicInformation = () => {
    const styles = getStyles();
    const [errorMessage, setErrorMessage] = useState('');
    // const [countries, setCountries] = useState<Country[]>([]);

    const { t } = useTranslation();
    const { register, control, handleSubmit, watch, getValues, reset, setValue, formState: { errors } } = useForm(
        {
            defaultValues: {
                languages: [{ language: '', languageLevel: '' }],
                countryOfResidence: '',
                countryOfCitizenship: '',
                fieldOfStudy: '',
                educationDegree: '',
                workingIndustry: '',
                yearsOfExperience: null,
            }
        }
    );
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'languages'
    });
    const countryOfResidence = watch('countryOfResidence') || '';
    const countryOfCitizenship = watch('countryOfCitizenship') || '';
    const fieldOfStudy = watch('fieldOfStudy') || '';
    const educationDegree = watch('educationDegree') || '';
    const workingIndustry = watch('workingIndustry') || '';
    const yearsOfExperience = watch('yearsOfExperience') || null;
    console.log('outfields', fields);

    const removeLanguage = (index: number) => {
        console.log('fields.length', fields.length);
        if (fields.length === 1) {
            reset({
                ...getValues(),
                languages: [{ language: '', languageLevel: '' }],
            });
        } else {
            remove(index);
        }
    };
    const onSubmit = async (data: any) => {
        data.languages = data.languages.filter((language) => language.language !== '' || language.languageLevel !== '');
        const accessToken = localStorage.getItem('accessToken') || '';
        try {
            await updateBasicInformation(accessToken, data);
        } catch (error) {
            setErrorMessage('Failed to update user');
        }
    };

    useEffect(() => {
        try {
            const accessToken = localStorage.getItem('accessToken') || '';
            getBasicInformation(accessToken).then((userBasicInformation) => {
                for (const key in userBasicInformation) {
                    setValue(key, userBasicInformation[key]);
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
                    {t("basic_information")}
                </Typography>
                <FormControl fullWidth css={styles.dashboard.form.input} >
                    <InputLabel id="country-of-citizenship-label">Country of Citizenship</InputLabel>
                    <Select
                        labelId="country-of-citizenship-label"
                        label="Country of citizenship"
                        value={countryOfCitizenship}
                        {...register('countryOfCitizenship')}
                        error={Boolean(errors.countryOfCitizenship)}
                    >
                        {countries.map((item) => (
                            <MenuItem key={item} value={item}>
                                {t(`countries.${item}`)}
                            </MenuItem>
                        ))}
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
                        {countries.map((item) => (
                            <MenuItem key={item} value={item}>
                                {t(`countries.${item}`)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth css={styles.dashboard.form.input}>
                    <TextField
                        label="Field of Study"
                        value={fieldOfStudy}
                        {...register('fieldOfStudy', {
                            maxLength: {
                                value: 100,
                                message: t('input_is_too_long'),
                            },
                        })}
                        error={Boolean(errors.fieldOfStudy)}
                        fullWidth
                    />
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
                        {educationLevels.map((item) => (
                            <MenuItem key={item} value={item}>
                                {t(`educationLevels.${item}`)}
                            </MenuItem>
                        ))}
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
                        {industries.map((item) => (
                            <MenuItem key={item} value={item}>
                                {t(`industries.${item}`)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth css={styles.dashboard.form.input} >
                    <TextField
                        type="number"
                        label="Years of Experience"
                        value={yearsOfExperience}
                        {...register('yearsOfExperience')}
                        error={Boolean(errors.yearsOfExperience)}
                    >
                    </TextField>
                </FormControl>
                {fields.map((field, index) => (
                    <Grid container key={field.id} spacing={2}>
                        <Grid item xs={4}>
                            <FormControl fullWidth css={styles.dashboard.form.input} >
                                <InputLabel id="lang-label">Language</InputLabel>
                                <Select
                                    css={styles.dashboard.form.selectLanguageInput}
                                    labelId="lang-label"
                                    label="Language"
                                    defaultValue={field.language}
                                    {...register(`languages.${index}.language`)}
                                >
                                    {languages.map((item) => (
                                        <MenuItem key={item} value={item}>
                                            {t(`languageAbility.languages.${item}`)}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth css={styles.dashboard.form.input} >
                                <InputLabel id="level-label">Language Level</InputLabel>
                                <Select
                                    css={styles.dashboard.form.selectLanguageInput}
                                    labelId="level-label"
                                    label="Language Level"
                                    defaultValue={field.languageLevel}
                                    {...register(`languages.${index}.languageLevel`)}
                                >
                                    {languageSkils.map((item) => (
                                        <MenuItem key={item} value={item}>
                                            {t(`languageAbility.languageSkils.${item}`)}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth css={styles.dashboard.form.input} >
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    type="button"
                                    onClick={() => removeLanguage(index)}
                                >
                                    {t("remove_language")}
                                </Button>
                            </FormControl>
                        </Grid>
                    </Grid>
                )
                )}
                <Button

                    fullWidth
                    variant="outlined"
                    color="primary"
                    type="button"
                    onClick={() => append({ language: '', languageLevel: '' })}
                >
                    {t("add_language")}
                </Button>
                <Button
                    css={styles.dashboard.form.submitButton}
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    {t('save')}
                </Button>
            </form >
            {errorMessage && <ErrorSnackbar onClose={handleErrorClose} errorMessage={errorMessage} />
            }
        </>
    );
};

export default BasicInformation;