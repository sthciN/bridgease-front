import { Container, Typography, List, Grid, ListItemText, ListItemButton } from '@mui/material';
import { useState } from 'react';
import DashboardLayout from '../src/DashboardLayout';
import { getStyles } from '../src/utils/style';
import { useTranslation } from 'react-i18next';
import PersonalInformation from '../src/components/forms/PersonalInformation';
import UpdatePassword from '../src/components/forms/UpdatePassword';
import ClientInformation from '../src/components/forms/PreferenceInformation';
import BasicInformation from '../src/components/forms/BasicInformation';
import FamilyInformation from '../src/components/forms/FamilyInformation';
import BusinessStatus from '../src/components/forms/BusinessStatus';

const ProfilePage: React.FC = () => {
    const styles = getStyles();
    const { t } = useTranslation();



    const [selectedSection, setSelectedSection] = useState('Personal Information');



    return (
        <DashboardLayout>
            <Container maxWidth="lg">
                <Typography variant="h4" gutterBottom>
                    {t("profile")}
                </Typography>
                <Grid container spacing={8} css={styles.dashboard.gridContainer}>
                    <Grid item xs={12} md={6}>
                        <List component="nav" aria-label="profile sections">
                            <ListItemButton selected={selectedSection === 'Personal Information'} onClick={() => setSelectedSection('Personal Information')}>
                                <ListItemText primary={t('personal_information')} />
                            </ListItemButton>
                            <ListItemButton selected={selectedSection === 'Basic Information'} onClick={() => setSelectedSection('Basic Information')}>
                                <ListItemText primary={t('basic_information')} />
                            </ListItemButton>
                            <ListItemButton selected={selectedSection === 'Family Information'} onClick={() => setSelectedSection('Family Information')}>
                                <ListItemText primary={t('family_information')} />
                            </ListItemButton>
                            <ListItemButton selected={selectedSection === 'Business Status'} onClick={() => setSelectedSection('Business Status')}>
                                <ListItemText primary={t('business_status')} />
                            </ListItemButton>
                            <ListItemButton selected={selectedSection === 'Immigration Preference'} onClick={() => setSelectedSection('Immigration Preference')}>
                                <ListItemText primary={t('immigration_preferences')} />
                            </ListItemButton>
                            <ListItemButton selected={selectedSection === 'Change Password'} onClick={() => setSelectedSection('Change Password')}>
                                <ListItemText primary={t('change_password')} />
                            </ListItemButton>
                        </List>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {selectedSection === 'Personal Information' && (
                            <PersonalInformation />
                        )}

                        {selectedSection === 'Basic Information' && (
                            <BasicInformation />
                        )}

                        {selectedSection === 'Family Information' && (
                            <FamilyInformation />
                        )}

                        {selectedSection === 'Business Status' && (
                            <BusinessStatus />
                        )}

                        {selectedSection === 'Immigration Preference' && (
                            <ClientInformation />
                        )}

                        {selectedSection === 'Change Password' && (
                            <UpdatePassword />
                        )}
                    </Grid>
                </Grid>
            </Container>
        </DashboardLayout>
    );
};

export default ProfilePage;