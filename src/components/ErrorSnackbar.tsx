import { Snackbar, Alert } from '@mui/material';
import { useState } from 'react';

interface ErrorSnackbarProps {
  errorMessage: string;
  onClose: () => void;
}

const ErrorSnackbar: React.FC<ErrorSnackbarProps> = ({ errorMessage , onClose}) => {
  const [open, setOpen] = useState(true);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    onClose();
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClick={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {errorMessage}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;