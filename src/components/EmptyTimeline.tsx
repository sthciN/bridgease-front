import { Stack, Step, StepConnector, StepLabel, Stepper, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import { getStyles } from '../utils/style';

const EmptyTimeline = () => {
    const theme = useTheme();
    const styles = getStyles();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    console.log('???', theme);
    return (
        <Stack sx={{ width: '100%' }} spacing={4}>
            {isSmallScreen ? (
                <Timeline position="alternate">
                    {[...Array(5)].map((_, index) => (
                        <TimelineItem key={index}>
                            <TimelineSeparator>
                                <TimelineDot />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                                <Typography variant="h6" component="span">timeline</Typography>
                            </TimelineContent>
                        </TimelineItem>
                    ))}
                </Timeline>
            ) : (
                <Stepper
                    activeStep={4}
                    alternativeLabel
                    connector={<StepConnector css={styles.dashboard.ColorlibConnector} />}
                >
                    {[...Array(5)].map((_, index) => (
                        <Step key={index}>
                            <StepLabel>timeline</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            )}
        </Stack>
    );
};

export default EmptyTimeline;