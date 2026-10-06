import { GlobalSnackbar } from '@/components/GlobalSnackbar';
import { createAppTheme } from '@/functions/theme';
import { Home } from '@/pages/home';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Suspense } from 'react';

export const Router = () => {
    const theme = createAppTheme('dark');
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* Suspends while the locale file is fetched from /public/locales */}
            <Suspense fallback={null}>
                <Home />
                <GlobalSnackbar />
            </Suspense>
        </ThemeProvider>
    );
};
