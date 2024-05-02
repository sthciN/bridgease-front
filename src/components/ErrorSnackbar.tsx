import { Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react';

interface ErrorSnackbarProps {
  errorMessage: string;
  onClose: () => void;
  severity: 'error' | 'success' | 'info' | 'warning';
}

const ErrorSnackbar: React.FC<ErrorSnackbarProps> = ({ errorMessage, onClose, severity='info' }) => { // Default severity to Info
  const [open, setOpen] = useState(true);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    onClose();
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={1000} onClick={handleClose}>
      <Alert
        onClose={handleClose}
        severity={severity?severity:'info'}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {errorMessage}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;