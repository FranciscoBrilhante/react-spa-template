import { createTheme } from '@mui/material/styles';

export const createAppTheme = (mode: 'light' | 'dark') =>
    createTheme({
        palette: {
            mode,
            primary: { main: mode === 'dark' ? '#90caf9' : '#1565c0' },
        },
        shape: { borderRadius: 5 },
        typography: {
            fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        },
    });
