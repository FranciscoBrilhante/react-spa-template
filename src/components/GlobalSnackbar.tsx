import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import type { SyntheticEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useSnackbarStore } from '@/store/snackbarStore';

/** Mount once near the root. Drive it with `snackbar.*` from '@/store/snackbarStore'. */
export const GlobalSnackbar = () => {
    const { t } = useTranslation();
    const {
        open,
        key,
        message,
        severity,
        variant,
        anchorOrigin,
        autoHideDuration,
        action,
        hideCloseButton,
        close,
        reset,
    } = useSnackbarStore();

    const handleClose = (_event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        close();
    };

    return (
        <Snackbar
            key={key}
            open={open}
            anchorOrigin={anchorOrigin}
            autoHideDuration={autoHideDuration}
            onClose={handleClose}
            slotProps={{ transition: { onExited: reset } }}
        >
            <Alert
                severity={severity}
                variant={variant}
                onClose={hideCloseButton ? undefined : handleClose}
                sx={{ width: '100%' }}
                action={
                    action || !hideCloseButton ? (
                        <>
                            {action && (
                                <Button
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        action.onClick();
                                        close();
                                    }}
                                >
                                    {action.label}
                                </Button>
                            )}
                            {!hideCloseButton && (
                                <IconButton
                                    aria-label={t('snackbar.close')}
                                    color="inherit"
                                    size="small"
                                    onClick={() => handleClose()}
                                >
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            )}
                        </>
                    ) : undefined
                }
            >
                {message}
            </Alert>
        </Snackbar>
    );
};
