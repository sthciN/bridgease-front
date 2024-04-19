import { Stack, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import { useEffect, useState } from 'react';
import { getTimeline } from '../utils/api/visa';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DescriptionIcon from '@mui/icons-material/Description';
import { ActionType } from '../utils/types';
import getTheme from '../theme';
import { getStyles } from '../style';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import StepperIcon from './StepperIcon';
import { useMediaQuery, useTheme } from '@mui/material';


const HorizontalTimeline: React.FC = () => {
    const [timelineData, setTimelineData] = useState([]);
    const styles = getStyles();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        const fetchTimelineData = async () => {
            try {
                await getTimeline().then((data) => {
                    setTimelineData(data);
                });
            } catch (error) {
                console.error(error);
            }
        };

        fetchTimelineData();
    }, []);

    return (
        <Stack sx={{ width: '100%' }} spacing={4}>
            {isSmallScreen ? (
                <Timeline position="alternate">
                    {timelineData.map((item, index) => (
                        <TimelineItem key={index}>
                            <TimelineSeparator>
                                <TimelineDot>
                                    <StepperIcon iconType={item.iconType} />
                                </TimelineDot>
                                {index < timelineData.length - 1 && <TimelineConnector />}
                            </TimelineSeparator>
                            <TimelineContent>
                                <Typography variant="h6" component="span">
                                    {item.date}
                                </Typography>
                                <Typography>{item.action}</Typography>
                            </TimelineContent>
                        </TimelineItem>
                    ))}
                </Timeline>
            ) : (
                <Stepper
                    activeStep={timelineData.length - 1}
                    alternativeLabel
                    connector={<StepConnector css={styles.dashboard.ColorlibConnector} />}
                >
                    {timelineData.map((item, index) => (
                        <Step key={index} >
                            <StepLabel StepIconComponent={() => <StepperIcon iconType={item.iconType} />}>
                                {item.date} - {item.action}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
            )}
        </Stack>
    );
};

export default HorizontalTimeline;