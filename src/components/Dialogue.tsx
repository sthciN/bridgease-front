import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

interface ResponsiveDialogueProps {
    dialogueMessage: string;
    onClose: () => void;
    onProceed: () => void;
}

const ResponsiveDialogue: React.FC<ResponsiveDialogueProps> = ({ dialogueMessage, onClose, onProceed }) => {
    const [open, setOpen] = React.useState(true);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClose = () => {
        setOpen(false);
        onClose();
    };

    const handleProceed = () => {
        setOpen(false);
        onProceed();
    };

    return (
        <>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {dialogueMessage}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleProceed} autoFocus>
                        Proceed
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ResponsiveDialogue;
