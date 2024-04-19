import PaymentIcon from '@mui/icons-material/Payment';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ScheduleIcon from '@mui/icons-material/Schedule';
import DescriptionIcon from '@mui/icons-material/Description';
import { ActionType } from '../utils/types';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const StepperIcon: React.FC<{ iconType: ActionType }> = ({ iconType }) => {
    switch (iconType) {
        case ActionType.Payment:
            return <PaymentIcon />;
        case ActionType.AttendInterview:
            return <EventNoteIcon />;
        case ActionType.Scheduling:
            return <ScheduleIcon />;
        case ActionType.SubmitDocument:
            return <DescriptionIcon />;
        default:
            return <CheckBoxIcon />;
    }
};

export default StepperIcon;